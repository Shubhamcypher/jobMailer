import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload folders if they don't exist
const createFolder = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
};

createFolder("uploads/excel");
createFolder("uploads/resume");

// Excel Storage
const excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/excel");
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `excel-${Date.now()}${ext}`);
    }
});

// Resume Storage
const resumeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/resume");
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `resume-${Date.now()}${ext}`);
    }
});

// Excel Validation
const excelFilter = (req, file, cb) => {

    const allowed = [
        ".xlsx",
        ".xls",
        ".csv"
    ];

    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.includes(ext))
        cb(null, true);
    else
        cb(new Error("Only Excel or CSV files are allowed"));
};

// Resume Validation
const resumeFilter = (req, file, cb) => {

    const allowed = [
        ".pdf"
    ];

    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.includes(ext))
        cb(null, true);
    else
        cb(new Error("Only PDF resumes are allowed"));
};

export const uploadExcel = multer({
    storage: excelStorage,
    fileFilter: excelFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

export const uploadResume = multer({
    storage: resumeStorage,
    fileFilter: resumeFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});