let campaign = {
    contacts: [],
    total: 0,

    excel: null,

    resume: null,
    subject: "",

    status: "idle",

    sent: 0,
    failed: 0,

    currentIndex: 0,
    currentContact: null,

    startedAt: null,
    finishedAt: null
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
        total: 0,

        excel: null,

        resume: null,
        subject: "",

        status: "idle",

        sent: 0,
        failed: 0,

        currentIndex: 0,
        currentContact: null,

        startedAt: null,
        finishedAt: null
    };
};