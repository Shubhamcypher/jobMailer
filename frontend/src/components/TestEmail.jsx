import { useState } from "react";
import {
    FlaskConical,
    Send,
    CheckCircle2,
    XCircle
} from "lucide-react";

import { sendTestEmail } from "../services/campaignApi";

const TestEmail = ({ campaign }) => {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSend = async () => {

        if (!email.trim()) return;

        try {

            setLoading(true);

            await sendTestEmail(email);

            alert("Test email sent successfully.");

        } catch (err) {

            alert(err.response?.data?.message || "Failed to send email.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <div className="p-3 rounded-xl bg-orange-100">

                    <FlaskConical
                        className="text-orange-600"
                        size={24}
                    />

                </div>

                <div>

                    <h2 className="text-xl font-bold text-slate-800">
                        Test Email
                    </h2>

                    <p className="text-sm text-slate-500">
                        Send yourself a test email before starting the campaign.
                    </p>

                </div>

            </div>

            {/* Input */}

            <input

                type="email"

                placeholder="Enter recipient email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                "

            />

            {/* Checklist */}

            <div className="mt-6 space-y-3">

                <div className="flex items-center gap-2">

                    {

                        campaign?.resume ?

                        <CheckCircle2
                            className="text-green-600"
                            size={18}
                        />

                        :

                        <XCircle
                            className="text-red-500"
                            size={18}
                        />

                    }

                    <span className="text-sm">

                        Resume Uploaded

                    </span>

                </div>

                <div className="flex items-center gap-2">

                    {

                        campaign.subject ?

                        <CheckCircle2
                            className="text-green-600"
                            size={18}
                        />

                        :

                        <XCircle
                            className="text-red-500"
                            size={18}
                        />

                    }

                    <span className="text-sm">

                        Subject Configured

                    </span>

                </div>

                <div className="flex items-center gap-2">

                    {

                        campaign.total > 0 ?

                        <CheckCircle2
                            className="text-green-600"
                            size={18}
                        />

                        :

                        <XCircle
                            className="text-red-500"
                            size={18}
                        />

                    }

                    <span className="text-sm">

                        Contacts Loaded

                    </span>

                </div>

            </div>

            {/* Button */}

            <button

                onClick={handleSend}

                disabled={
                    loading ||
                    !campaign.resume ||
                    !campaign.subject ||
                    !campaign.total
                }

                className="
                    mt-6
                    w-full
                    flex
                    justify-center
                    items-center
                    gap-2
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:bg-slate-400
                    disabled:cursor-not-allowed
                    text-white
                    font-semibold
                    py-3
                    rounded-xl
                    transition
                "

            >

                <Send size={18} />

                {

                    loading ?

                    "Sending..."

                    :

                    "Send Test Email"

                }

            </button>

        </div>

    );

};

export default TestEmail;