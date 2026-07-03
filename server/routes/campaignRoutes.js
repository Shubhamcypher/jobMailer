import express from "express";
import {
    getCampaignStatus,
    updateEmailDetails
} from "../controllers/campaignController.js";

const router = express.Router();

router.get("/status", getCampaignStatus);

router.post("/details", updateEmailDetails);

export default router;