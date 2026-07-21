import express from "express";

import {
    getCampaignStatus,
    updateEmailDetails,
    sendTestEmail,
    startCampaign,
    pauseCampaign,
    resumeCampaign,
    stopCampaign
} from "../controllers/campaignController.js";

const router = express.Router();

router.get("/status", getCampaignStatus);

router.post("/details", updateEmailDetails);

router.post("/test", sendTestEmail);

router.post("/start", startCampaign);

router.post("/pause", pauseCampaign);

router.post("/resume", resumeCampaign);

router.post("/stop", stopCampaign);

export default router;