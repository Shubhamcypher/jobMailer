import { useState } from "react";
import { FileSpreadsheet, Upload, CheckCircle2 } from "lucide-react";
import { uploadExcel } from "../services/campaignApi";

const UploadExcel = ({ campaign, setCampaign }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("excel", file);

            const res = await uploadExcel(formData);

            setCampaign((prev) => ({
                ...prev,
                contacts: res.data.contacts,
                total: res.data.total,
            }));
        } catch (err) {
            alert(err.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-100">
                    <FileSpreadsheet className="text-green-600" size={26} />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Upload HR Contacts
                    </h2>

                    <p className="text-sm text-slate-500">
                        Upload Excel or CSV containing HR information
                    </p>
                </div>
            </div>

            <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => setFile(e.target.files[0])}
                className="
                    w-full
                    text-sm
                    border
                    border-slate-300
                    rounded-xl
                    p-3
                    cursor-pointer
                    file:mr-4
                    file:px-4
                    file:py-2
                    file:border-0
                    file:bg-blue-100
                    file:text-blue-700
                    file:rounded-lg
                    hover:file:bg-blue-200
                "
            />

            {file && (
                <div className="mt-4 text-sm text-slate-600">
                    Selected File:
                    <span className="font-semibold ml-2">
                        {file.name}
                    </span>
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={!file || loading}
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
                    text-white
                    font-semibold
                    py-3
                    rounded-xl
                    transition
                "
            >
                <Upload size={18} />

                {loading ? "Uploading..." : "Upload Contacts"}
            </button>

            {campaign.total > 0 && (
                <div className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-green-700
                    bg-green-50
                    border
                    border-green-200
                    rounded-xl
                    px-4
                    py-3
                ">
                    <CheckCircle2 size={20} />

                    <span className="font-medium">
                        {campaign.total} Contacts Loaded Successfully
                    </span>
                </div>
            )}
        </div>
    );
};

export default UploadExcel;