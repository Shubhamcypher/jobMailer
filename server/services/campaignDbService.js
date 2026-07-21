
import { ensureCampaignExists } from "../repositories/campaignRepository.js";
import { uploadResume } from "../repositories/uploadRepository.js";
import { parseExcel } from "./excelServices.js";
import { uploadExcel } from "../repositories/uploadRepository.js";
import { syncContacts } from "../repositories/contactRepository.js";
import { getCampaignFromDb, updateCampaign } from "../repositories/campaignRepository.js";
import { mapCampaign } from "../mapper/campaignMapper.js";


export const uploadResumeService = async (file) => {

    const campaign = await ensureCampaignExists();

    await uploadResume(

        campaign.id,

        file.originalname,

        file.path

    );

    return campaign;

};


export const uploadExcelService = async (file) => {

    const contacts = parseExcel(file.path);

    const campaign = await ensureCampaignExists();

    await uploadExcel(

        campaign.id,

        file.originalname,

        file.path

    );

    await syncContacts(

        campaign.id,

        contacts

    );

    return {

        contacts,

        total: contacts.length

    };

};

export const getCampaignService = async () => {

    const campaign = await getCampaignFromDb();

    return mapCampaign(campaign);

};

export const updateCampaignService = async (data) => {

    return await updateCampaign(data);

};

export const getRawCampaignService = async () => {

    return await getCampaignFromDb();

};