import { updateRuntimeState, addLog } from "./runtimeState.js";
import { renderTemplate } from "./templateService.js";
import { sendEmail } from "./emailService.js";
import { wait } from "./delayService.js";

import { getNextPendingContact, markContactFailed, markContactSent } from "../repositories/contactRepository.js";


import {
    setCurrentStatus,
    getCampaignFromDb,
    incrementSentCount,
    incrementFailedCount,
    resetDailyCounter,
} from "../repositories/campaignRepository.js";
import { updateCampaignService } from "./campaignDbService.js";

export const processQueue = async () => {

    console.log("processQueue started", new Date().toISOString());

    while (true) {

        const dbCampaign = await getCampaignFromDb();

        const resume = dbCampaign.uploads.find(
            upload => upload.type === "resume"
        );

        if (!resume) {
            throw new Error("Resume not uploaded.");
        }

        const today = new Date().toDateString();

        const dbLastSentDate = dbCampaign.lastSentDate
            ? new Date(dbCampaign.lastSentDate).toDateString()
            : null;

        if (dbLastSentDate && dbLastSentDate !== today) {

            await resetDailyCounter(dbCampaign.id);

        }

        //logging for debugging
        console.log({
            sentToday: dbCampaign.sentToday,
            dailyLimit: dbCampaign.dailyLimit,
            status: dbCampaign.status,
        });

        // Stop if daily limit reached
        if (dbCampaign.sentToday >= dbCampaign.dailyLimit) {

            await setCurrentStatus(

                dbCampaign.id,

                "daily_limit_reached"

            );

            updateRuntimeState({
                waitTime: 0,
                nextSendAt: null

            });

            console.log("Daily sending limit reached.");

            return;

        }

        // Stop if paused
        if (dbCampaign.status === "paused") {
            console.log("Campaign paused.");
            return;
        }

        // Stop if manually stopped
        if (dbCampaign.status === "idle") {
            console.log("Campaign stopped.");
            return;
        }


        const contact = await getNextPendingContact(dbCampaign.id);

        if (!contact) {

            await updateCampaignService({

                status: "completed",

                finishedAt: new Date()

            });

            updateRuntimeState({
                currentContact: null
            });

            console.log("Campaign completed.");

            return;

        }

        try {

            const html = renderTemplate({

                name: contact.name,

                company: contact.company,

                title: contact.title

            });

            await sendEmail({

                to: contact.email,

                subject: dbCampaign.subject,

                html,

                attachments: [

                    {

                        filename: resume.filename,

                        path: resume.path

                    }

                ]

            });

            await markContactSent(contact.id);

            await incrementSentCount(dbCampaign.id);

            //for log later remove
            const updated = await getCampaignFromDb();

            console.log("After increment:", {
                sentToday: updated.sentToday,
                sent: updated.sent,
            });

            updateRuntimeState({
                currentContact: contact
            });

            console.log(`✓ Sent to ${contact.email}`);

            addLog(
                "success",
                `Email sent to ${contact.email}`
            );

        }

        catch (err) {

            console.log(err.message);

            addLog(
                "error",
                `Failed to send email to ${contact.email}: ${err.message}`
            );

            await markContactFailed(contact.id, err.message);

            await incrementFailedCount(dbCampaign.id);

            updateRuntimeState({
                currentContact: contact
            });

        }

        await wait();

    }

};