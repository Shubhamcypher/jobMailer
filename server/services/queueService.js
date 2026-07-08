import { getCampaign, updateCampaign } from "./campaignStore.js";
import { renderTemplate } from "./templateService.js";
import { sendEmail } from "./emailService.js";

export const processQueue = async () => {

    const campaign = getCampaign();

    if (!campaign.contacts.length) {
        console.log("No contacts found.");
        return;
    }

    const contact = campaign.contacts[0];

    try {

        const html = renderTemplate({

            name: contact.name,
            company: contact.company,
            title: contact.title

        });

        await sendEmail({

            to: contact.email,

            subject: campaign.subject,

            html,

            attachments: [
                {
                    filename: "Resume.pdf",
                    path: campaign.resume.path
                }
            ]

        });

        updateCampaign({

            sent: campaign.sent + 1,

            failed: 0,

            currentIndex: campaign.currentIndex + 1,

            currentContact: contact

        });

        console.log(`Email sent to ${contact.email}`);

        updateCampaign({

            status: "completed",

            finishedAt: new Date()

        });

    }

    catch (err) {

        updateCampaign({

            failed: campaign.failed + 1,

            currentContact: contact,

            status: "completed",

            finishedAt: new Date()

        });

        console.log(err.message);

    }

};