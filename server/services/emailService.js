import transporter from "../config/mail.js";

export const sendEmail = async ({
    to,
    subject,
    html,
    attachments = []
}) => {

    const info = await transporter.sendMail({

        from: `"Shubham" <${process.env.EMAIL_USER}>`,

        to,

        subject,

        html,

        attachments

    });

    return {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected
    };

};