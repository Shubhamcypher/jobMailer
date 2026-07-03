let campaign = {
    contacts: [],
    resume: null,
    subject: "",
    template: "",
    status: "idle", // idle | running | paused | completed
    sent: 0,
    failed: 0,
    current: 0
};

export const getCampaign = () => campaign;

export const updateCampaign = (data) => {
    campaign = {
        ...campaign,
        ...data
    };
};

export const resetCampaign = () => {
    campaign = {
        contacts: [],
        resume: null,
        subject: "",
        template: "",
        status: "idle",
        sent: 0,
        failed: 0,
        current: 0
    };
};