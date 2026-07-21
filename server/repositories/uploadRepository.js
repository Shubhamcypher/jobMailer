import prisma from "../lib/prisma.js";
// import { ensureCampaignExists } from "./campaignRepository.js";

export const uploadResume = async (campaignId, filename, path) => {

    // const campaign = await ensureCampaignExists();

    // Delete old resume if it exists
    await prisma.upload.deleteMany({

        where: {

            campaignId,

            type: "resume"

        }

    });

    return await prisma.upload.create({

        data: {

            campaignId,

            type: "resume",

            filename,

            path

        }

    });

};

export const getResume = async (campaignId) => {

    // const campaign = await ensureCampaignExists();

    return await prisma.upload.findFirst({

        where: {

            campaignId,

            type: "resume"

        }

    });

};

export const uploadExcel = async (campaignId, filename, path) => {

    // const campaign = await ensureCampaignExists();

    await prisma.upload.deleteMany({

        where: {

            campaignId,

            type: "excel"

        }

    });

    return await prisma.upload.create({

        data: {

            campaignId,

            type: "excel",

            filename,

            path

        }

    });

};