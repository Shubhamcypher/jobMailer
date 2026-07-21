import api from "../api/axios";

export const uploadExcel = (formData) =>
    api.post("/upload/excel", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const uploadResume = (formData) =>
    api.post("/upload/resume", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const updateSubject = (subject) =>
    api.post("/campaign/details", { subject });

export const sendTestEmail = (email) =>
    api.post("/campaign/test", { email });

export const getCampaignStatus = () =>
    api.get("/campaign/status");

export const startCampaign = () =>
    api.post("/campaign/start");

export const pauseCampaign = () =>
    api.post("/campaign/pause");

export const resumeCampaign = () =>
    api.post("/campaign/resume");

export const stopCampaign = () =>
    api.post("/campaign/stop");

