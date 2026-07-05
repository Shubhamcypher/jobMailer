import {
    getCampaign,
    updateCampaign
} from "../services/campaignStore.js";
import { sendEmail } from "../services/emailService.js";
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