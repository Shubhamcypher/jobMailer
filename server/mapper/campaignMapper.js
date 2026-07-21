import { getRuntimeState } from "../services/runtimeState.js";

export const mapCampaign = (campaign) => {
    const runtime = getRuntimeState();

    if (!campaign) {

        return null;

    }

    const resume = campaign.uploads.find(

        upload => upload.type === "resume"

    ) || null;

    const excel = campaign.uploads.find(

        upload => upload.type === "excel"

    ) || null;

    return {

        id: campaign.id,

        name: campaign.name,

        subject: campaign.subject,

        status: campaign.status,

        total: campaign.total,

        sent: campaign.sent,

        failed: campaign.failed,

        sentToday: campaign.sentToday,

        dailyLimit: campaign.dailyLimit,

        waitTime: runtime.waitTime,

        startedAt: campaign.startedAt,

        finishedAt: campaign.finishedAt,

        nextSendAt: runtime.nextSendAt,

        lastSentDate: campaign.lastSentDate,

        contacts: campaign.contacts,

        resume,

        excel,

        currentContact: runtime.currentContact,
        
        logs: runtime.logs,

    };

};