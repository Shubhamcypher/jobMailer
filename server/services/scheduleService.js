import cron from "node-cron";
import {
    getRawCampaignService,
    updateCampaignService
} from "./campaignDbService.js";
import { processQueue } from "./queueService.js";

export const startScheduler = () => {

    cron.schedule("0 11 * * 1-5", async () => {
        const campaign = await getRawCampaignService();

        if (campaign.status !== "daily_limit_reached") {

            console.log("No campaign waiting for resume.");

            return;

        }

        await updateCampaignService({

            sentToday: 0,

            status: "running"

        });

        console.log("▶ Resuming campaign automatically...");

        processQueue();
    });

};


export const recoverCampaign = async() => {

    const campaign = await getRawCampaignService();

    if (campaign.status === "running") {

        console.log("♻ Recovering running campaign...");

        processQueue();

    }

};