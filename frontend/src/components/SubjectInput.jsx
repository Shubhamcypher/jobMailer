import { useState } from "react";
import { Mail, Save, CheckCircle2 } from "lucide-react";
import { updateSubject } from "../services/campaignApi";

const SubjectInput = ({ campaign, setCampaign }) => {
    const [subject, setSubject] = useState(campaign.subject || "");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const saveSubject = async () => {
        if (!subject.trim()) return;

        try {
            setLoading(true);

            await updateSubject(subject);

            setCampaign((prev) => ({
                ...prev,
                subject,
            }));

            setSaved(true);

            setTimeout(() => {
                setSaved(false);
            }, 3000);

        } catch (err) {
            alert(err.response?.data?.message || "Failed to save subject.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <div className="p-3 rounded-xl bg-purple-100">
                    <Mail className="text-purple-600" size={24} />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Email Subject
                    </h2>

                    <p className="text-sm text-slate-500">
                        This subject will be used for every email in the campaign.
                    </p>
                </div>

            </div>

            {/* Input */}

            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Application for Software Developer"

                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    text-slate-700
                    outline-none
                    transition
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                "
            />

            {/* Footer */}

            <div className="flex justify-between items-center mt-3">

                <span className="text-sm text-slate-500">
                    {subject.length} characters
                </span>

                {saved && (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle2 size={16} />
                        Saved
                    </span>
                )}

            </div>

            {/* Button */}

            <button

                onClick={saveSubject}

                disabled={loading || !subject.trim()}

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
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                "

            >

                <Save size={18} />

                {loading ? "Saving..." : "Save Subject"}

            </button>

        </div>
    );
};

export default SubjectInput;