import { getRuntimeState, updateRuntimeState } from "./runtimeState.js";
import { processQueue } from "./queueService.js";

export const startCampaignService = async () => {

    const campaign = getRuntimeState();

    if (!campaign.contacts.length)
        throw new Error("Upload contacts first.");

    if (!campaign.resume)
        throw new Error("Upload resume first.");

    if (!campaign.subject)
        throw new Error("Email subject is required.");

    if (campaign.status === "running")
        throw new Error("Campaign already running.");

    updateRuntimeState({

        status: "running",

        sent: 0,

        failed: 0,

        currentContact: null,

        currentIndex: 0,

        startedAt: new Date()

    });

   await processQueue();

};