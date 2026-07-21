import express from "express";
import { uploadExcelFile, uploadResumeFile } from "../controllers/uploadController.js";

import { uploadExcel, uploadResume } from "../config/multer.js";

const router = express.Router();

router.post(
    "/excel",
    uploadExcel.single("excel"),
    uploadExcelFile
);

router.post(
    "/resume",
    uploadResume.single("resume"),
    uploadResumeFile
);

export default router;