export const mapCampaign = (campaign) => {

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

        waitTime: campaign.waitTime,

        startedAt: campaign.startedAt,

        finishedAt: campaign.finishedAt,

        lastSentDate: campaign.lastSentDate,

        contacts: campaign.contacts ?? [],

        resume,

        excel,

        // Temporary until queue is migrated
        currentContact: null,

        currentIndex: 0,

        logs: []

    };

};