import api from "../api/axios";

export const uploadExcel = (formData) =>
    api.post("/upload-excel", formData);

export const uploadResume = (formData) =>
    api.post("/upload-resume", formData);

export const startCampaign = (data) =>
    api.post("/start", data);

export const pauseCampaign = () =>
    api.post("/pause");

export const resumeCampaign = () =>
    api.post("/resume");

export const getStatus = () =>
    api.get("/status");