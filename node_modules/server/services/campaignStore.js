let campaign = {

    contacts: [],
    total: 0,

    excel: null,
    resume: null,

    subject: "",

    status: "idle",

    sent: 0,
    sentToday: 0,

    failed: 0,

    dailyLimit: Number(process.env.DAILY_LIMIT),

    lastSentDate: null,

    currentIndex: 0,
    currentContact: null,

    logs: [],

    waitTime: 0,
    nextSendAt: null,

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

        sentToday: 0,
        dailyLimit: Number(process.env.DAILY_LIMIT) || 40,

        lastSentDate: null,

        currentIndex: 0,
        currentContact: null,

        logs: [],

        waitTime: 0,
        nextSendAt: null,

        startedAt: null,
        finishedAt: null
    };
};

export const addLog = (type, message) => {

    campaign.logs.unshift({

        id: Date.now(),

        type,

        message,

        time: new Date().toLocaleTimeString()

    });

};