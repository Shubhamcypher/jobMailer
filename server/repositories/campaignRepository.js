import prisma from "../lib/prisma.js";

export const ensureCampaignExists = async () => {

    let campaign = await prisma.campaign.findFirst({
        include: {

            uploads: true,

            contacts: true

        }
    });

    if (!campaign) {

        campaign = await prisma.campaign.create({

            data: {
                name: "Default Campaign",
                subject: ""
            },

            include: {

                uploads: true,

                contacts: true

            }

        });

    }

    return campaign;

};

export const getCampaignFromDb = async () => {

    return await ensureCampaignExists();

};

export const updateCampaign = async (data) => {

    const campaign = await ensureCampaignExists();

    return await prisma.campaign.update({

        where: {
            id: campaign.id
        },

        data,

        include: {

            uploads: true,

            contacts: true

        }

    });

};


export const incrementSentCount = async (campaignId) => {

    return await prisma.campaign.update({

        where: {
            id: campaignId
        },

        data: {

            sent: {
                increment: 1
            },

            sentToday: {
                increment: 1
            },

            lastSentDate: new Date()

        }

    });

};

export const incrementFailedCount = async (campaignId) => {

    return await prisma.campaign.update({

        where: {
            id: campaignId
        },

        data: {

            failed: {
                increment: 1
            },

            sentToday: {
                increment: 1
            },

            lastSentDate: new Date()

        }

    });

};


export const setCurrentStatus = async (

    campaignId,

    status

) => {

    return await prisma.campaign.update({

        where: {

            id: campaignId

        },

        data: {

            status

        }

    });

};


export const resetDailyCounter = async (campaignId) => {

    return await prisma.campaign.update({

        where: {

            id: campaignId

        },

        data: {

            sentToday: 0,

            lastSentDate: new Date()

        }

    });

};

export const resetCampaign = async (campaignId) => {

    return await prisma.campaign.update({

        where: {

            id: campaignId

        },

        data: {

            status: "idle",

            sent: 0,

            failed: 0,

            sentToday: 0,

            startedAt: null,

            finishedAt: null,

            lastSentDate: null

        }

    });

};
