   import { startCampaignService } from "../services/campaignService.js";

    import {
        getRawCampaignService,
        updateCampaignService
    } from "../services/campaignDbService.js";

    import { sendEmail } from "../services/emailService.js";
    import { processQueue } from "../services/queueService.js";
    import { renderTemplate } from "../services/templateService.js";

    import { getCampaignService } from "../services/campaignDbService.js";

    export const getCampaignStatus = async (req, res) => {

        try {

            const campaign = await getCampaignService();

            return res.json(campaign);

        }

        catch (err) {

            return res.status(500).json({

                success: false,

                message: err.message

            });

        }

    };

    export const updateEmailDetails = async (req, res) => {

        const { subject } = req.body;

        await updateCampaignService({
            subject
        });

        res.json({
            success: true
        });

    };


    export const sendTestEmail = async (req, res) => {

        try {

            const { email } = req.body;

            const campaign = await getRawCampaignService();

            const resume = campaign.uploads.find(
                upload => upload.type === "resume"
            );

            if (!resume) {
                throw new Error("Resume not uploaded.");
            }

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
                        filename: resume.filename,
                        path: resume.path
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

        await updateCampaignService({
            status: "paused"
        });

        res.json({
            success: true
        });

    };

    export const resumeCampaign = async (req, res) => {

        try {

            const campaign = await getRawCampaignService();

            if (campaign.status !== "paused" &&
                campaign.status !== "daily_limit_reached") {

                return res.status(400).json({

                    success: false,

                    message: "Campaign cannot be resumed."

                });

            }

            await updateCampaignService({

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

        await updateCampaignService({

            status: "idle"

        });

        res.json({
            success: true
        });

    };