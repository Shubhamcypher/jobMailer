import { startCampaignService } from "../services/campaignService.js";
import {
    getCampaign,
    updateCampaign
} from "../services/campaignStore.js";
import { sendEmail } from "../services/emailService.js";
import { processQueue } from "../services/queueService.js";
import { renderTemplate } from "../services/templateService.js";

export const getCampaignStatus = (req, res) => {

    res.json(getCampaign());

};

export const updateEmailDetails = (req, res) => {

    const { subject } = req.body;

    updateCampaign({
        subject
    });

    res.json({
        success: true
    });

};


export const sendTestEmail = async (req, res) => {

    try {

        const { email } = req.body;

        const campaign = getCampaign();

        const html = renderTemplate({

            name: "Shubham",

            company: "OpenAI",

            title: "Software Engineer"

        });

        await sendEmail({

            to: email,

            subject: campaign.subject,

            html,

            attachments: [
                {
                    filename: campaign.resume.filename,
                    path: campaign.resume.path
                }
            ]

        });

        return res.status(200).json({

            success: true,
            message: "Test email sent successfully."

        });

    }

    catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};


export const startCampaign = async (req, res) => {

    try {

        await startCampaignService();

        return res.json({
            success: true,
            message: "Campaign started."
        });

    }

    catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

export const pauseCampaign = async (req, res) => {

    updateCampaign({
        status: "paused"
    });

    res.json({
        success: true
    });

};

export const resumeCampaign = async (req, res) => {

    try {

        const campaign = getCampaign();

        if (campaign.status !== "paused" &&
            campaign.status !== "daily_limit_reached") {

            return res.status(400).json({

                success: false,

                message: "Campaign cannot be resumed."

            });

        }

        updateCampaign({

            status: "running"

        });

        // Restart queue from currentIndex
        processQueue();

        return res.json({

            success: true,

            message: "Campaign resumed."

        });

    }

    catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

export const stopCampaign = async (req, res) => {

    updateCampaign({

        status: "idle",

        sent: 0,

        failed: 0,

        currentContact: null

    });

    res.json({
        success: true
    });

};