import prisma from "../lib/prisma.js";


export const syncContacts = async (campaignId, contacts) => {

    // const campaign = await ensureCampaignExists();

    await prisma.contact.deleteMany({

        where: {

            campaignId,

        }

    });

    await prisma.contact.createMany({

        data: contacts.map(contact => ({

            campaignId,

            name: contact.name,

            company: contact.company,

            title: contact.title,

            email: contact.email

        }))

    });

    await prisma.campaign.update({

        where: {

            id: campaignId

        },

        data: {

            total: contacts.length,

            sent: 0,

            failed: 0,

            sentToday: 0,

            status: "idle"

        }

    });

};

export const getNextPendingContact = async (campaignId) => {

    return await prisma.contact.findFirst({

        where: {

            campaignId,

            status: "pending"

        },

        orderBy: {

            createdAt: "asc"

        }

    });

};

export const markContactSent = async (contactId) => {

    return await prisma.contact.update({

        where: {

            id: contactId

        },

        data: {

            status: "sent",

            sentAt: new Date(),

            attempts: {

                increment: 1

            }

        }

    });

};

export const markContactFailed = async (

    contactId,

    error

) => {

    return await prisma.contact.update({

        where: {

            id: contactId

        },

        data: {

            status: "failed",

            error,

            attempts: {

                increment: 1

            }

        }

    });

};

export const resetContacts = async (campaignId) => {

    return await prisma.contact.updateMany({

        where: {

            campaignId

        },

        data: {

            status: "pending",

            attempts: 0,

            sentAt: null,

            error: null

        }

    });

};