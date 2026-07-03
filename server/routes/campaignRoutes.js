import express from "express";
import {
    getCampaignStatus,
    updateEmailDetails,
    sendTestEmail
} from "../controllers/campaignController.js";

const router = express.Router();

router.get("/status", getCampaignStatus);

router.post("/details", updateEmailDetails);

router.post("/test", sendTestEmail);

export default router;