import {
    getCampaign,
    updateCampaign
} from "../services/campaignStore.js";

export const getCampaignStatus = (req, res) => {

    res.json(getCampaign());

};

export const updateEmailDetails = (req, res) => {

    const { subject, template } = req.body;

    updateCampaign({
        subject,
        template
    });

    res.json({
        success: true
    });

};