import cron from "node-cron";
import { getRuntimeState, updateRuntimeState } from "./runtimeState.js";
import { processQueue } from "./queueService.js";

export const startScheduler = () => {

    cron.schedule("0 11 * * 1-5", () => {
        const campaign = getRuntimeState();

        if (campaign.status !== "daily_limit_reached") {

            console.log("No campaign waiting for resume.");

            return;

        }

        updateRuntimeState({

            sentToday: 0,

            status: "running"

        });

        console.log("▶ Resuming campaign automatically...");

        processQueue();
    });

};


export const recoverCampaign = () => {

    const campaign = getRuntimeState();

    if (campaign.status === "running") {

        console.log("♻ Recovering running campaign...");

        processQueue();

    }

};