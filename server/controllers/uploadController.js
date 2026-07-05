import { parseExcel } from "../services/excelServices.js";
import { updateCampaign } from "../services/campaignStore.js";

export const uploadExcelFile = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No Excel file uploaded."
            });
        }

        //this comes from services/excelService
        const contacts = parseExcel(req.file.path);

        updateCampaign({
            contacts,
            total: contacts.length
        });

        return res.status(200).json({
            success: true,
            total: contacts.length,
            contacts
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const uploadResumeFile = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No Resume uploaded"
            });
        }

        updateCampaign({
            resume: {
                filename: req.file.filename,
                path: req.file.path
            }
        });

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            file: req.file
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};