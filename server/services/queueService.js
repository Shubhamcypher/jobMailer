import { getCampaign, updateCampaign } from "./campaignStore.js";
import { renderTemplate } from "./templateService.js";
import { sendEmail } from "./emailService.js";
import { wait } from "./delayService.js";

export const processQueue = async () => {

    while (true) {

        const campaign = getCampaign();

        // Stop if paused
        if (campaign.status === "paused") {
            console.log("Campaign paused.");
            return;
        }

        // Stop if manually stopped
        if (campaign.status === "idle") {
            console.log("Campaign stopped.");
            return;
        }

        // Finished?
        if (campaign.currentIndex >= campaign.contacts.length) {

            updateCampaign({

                status: "completed",

                finishedAt: new Date(),

                currentContact: null

            });

            console.log("Campaign completed.");

            return;
        }

        const contact = campaign.contacts[campaign.currentIndex];

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

                        filename: campaign.resume.filename,

                        path: campaign.resume.path

                    }

                ]

            });

            updateCampaign({

                sent: campaign.sent + 1,

                currentIndex: campaign.currentIndex + 1,

                currentContact: contact

            });

            console.log(`✓ Sent to ${contact.email}`);

        }

        catch (err) {

            console.log(err.message);

            updateCampaign({

                failed: campaign.failed + 1,

                currentIndex: campaign.currentIndex + 1,

                currentContact: contact

            });

        }

        await wait();

    }

};