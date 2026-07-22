import { getRawCampaignService, updateCampaignService } from "./campaignDbService.js";
import { processQueue } from "./queueService.js";

export const startCampaignService = async () => {

    const campaign = await getRawCampaignService();


    if (!campaign.contacts.length)
        throw new Error("Upload contacts first.");

    const resume = campaign.uploads.find(
        upload => upload.type === "resume"
    );

    if (!resume)
        throw new Error("Upload resume first.");

    if (!campaign.subject)
        throw new Error("Email subject is required.");

    if (campaign.status === "running")
        throw new Error("Campaign already running.");

    await updateCampaignService({

        status: "running",

        dailyLimit: Number(process.env.DAILY_LIMIT),
        
        startedAt: new Date(),

        finishedAt: null

    });

    await processQueue();

};