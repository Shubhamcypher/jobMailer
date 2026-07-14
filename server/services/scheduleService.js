import cron from "node-cron";
import { getCampaign, updateCampaign } from "./campaignStore";
import { processQueue } from "./queueService";

export const startScheduler = () => {

    cron.schedule("0 11 * * 1-5", () => {
        const campaign = getCampaign();

        if (campaign.status !== "daily_limit_reached") {

            console.log("No campaign waiting for resume.");

            return;

        }

        updateCampaign({

            sentToday: 0,

            status: "running"

        });

        console.log("▶ Resuming campaign automatically...");

        processQueue();
    });

};


export const recoverCampaign = () => {

    const campaign = getCampaign();

    if (campaign.status === "running") {

        console.log("♻ Recovering running campaign...");

        processQueue();

    }

};