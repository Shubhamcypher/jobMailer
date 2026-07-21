import {
    uploadExcelService, uploadResumeService
} from "../services/campaignDbService.js";



export const uploadExcelFile = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No Excel file uploaded."

            });

        }

        const result = await uploadExcelService(req.file);


        return res.status(200).json({

            success: true,

            total: result.total,

            contacts: result.contacts

        });

    }

    catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

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

        // PostgreSQL
        await uploadResumeService(req.file);

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