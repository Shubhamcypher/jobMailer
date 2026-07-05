let campaign = {
    contacts: [],
    total: 0,

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
    let campaign = {
    contacts: [],
    total: 0,

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