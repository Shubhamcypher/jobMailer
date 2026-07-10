import { getCampaign, updateCampaign } from "./campaignStore.js";
import { renderTemplate } from "./templateService.js";
import { sendEmail } from "./emailService.js";
import { wait } from "./delayService.js";

export const processQueue = async () => {

    while (true) {

        let campaign = getCampaign();

        const today = new Date().toDateString();

        if (campaign.lastSentDate && campaign.lastSentDate !== today) {

            updateCampaign({

                sentToday: 0,

                lastSentDate: today

            });

            campaign = getCampaign();

        }

        // Stop if daily limit reached
        if (campaign.sentToday >= campaign.dailyLimit) {

            updateCampaign({

                status: "daily_limit_reached",

                waitTime: 0,

                nextSendAt: null

            });

            console.log("Daily sending limit reached.");

            return;

        }

        // Stop if paused
        if (campaign.status === "paused") {
            console.log("Campaign paused.");
            return;
        }

        // Stop if manually stopped
        if (campaign.status === "idle") {
            console.log("Campaign stopped.");
            return;
        }

        // Finished?
        if (campaign.currentIndex >= campaign.contacts.length) {

            updateCampaign({

                status: "completed",

                finishedAt: new Date(),

                currentContact: null

            });

            console.log("Campaign completed.");

            return;
        }

        const contact = campaign.contacts[campaign.currentIndex];

        try {

            const html = renderTemplate({

                name: contact.name,

                company: contact.company,

                title: contact.title

            });

            await sendEmail({

                to: contact.email,

                subject: campaign.subject,

                html,

                attachments: [

                    {

                        filename: campaign.resume.filename,

                        path: campaign.resume.path

                    }

                ]

            });

            updateCampaign({

                sent: campaign.sent + 1,

                sentToday: campaign.sentToday + 1,

                lastSentDate: new Date().toDateString(),

                currentIndex: campaign.currentIndex + 1,

                currentContact: contact

            });

            console.log(`✓ Sent to ${contact.email}`);

        }

        catch (err) {

            console.log(err.message);

            updateCampaign({

                failed: campaign.failed + 1,

                sentToday: campaign.sentToday + 1,

                lastSentDate: new Date().toDateString(),

                currentIndex: campaign.currentIndex + 1,

                currentContact: contact

            });

        }

        await wait();

    }

};