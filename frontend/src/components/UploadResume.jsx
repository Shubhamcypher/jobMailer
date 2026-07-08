import { useState } from "react";
import { FileText, Upload, CheckCircle2 } from "lucide-react";
import { uploadResume } from "../services/campaignApi";

const UploadResume = ({ campaign, setCampaign }) => {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file) return;

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("resume", file);

            const res = await uploadResume(formData);

            setCampaign(prev => ({
                ...prev,
                resume: res.data.file
            }));

        } catch (err) {

            alert(err.response?.data?.message || "Upload failed.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

            <div className="flex items-center gap-3 mb-6">

                <div className="p-3 rounded-xl bg-blue-100">

                    <FileText
                        className="text-blue-600"
                        size={26}
                    />

                </div>

                <div>

                    <h2 className="text-xl font-bold text-slate-800">
                        Upload Resume
                    </h2>

                    <p className="text-sm text-slate-500">
                        Upload your latest resume in PDF format
                    </p>

                </div>

            </div>

            <input

                type="file"

                accept=".pdf"

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

            {

                file && (

                    <div className="mt-4 text-sm text-slate-600">

                        Selected File:

                        <span className="font-semibold ml-2">

                            {file.name}

                        </span>

                    </div>

                )

            }

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

                {

                    loading

                        ?

                        "Uploading..."

                        :

                        "Upload Resume"

                }

            </button>

            {

                campaign.resume && (

                    <div
                        className="
                            mt-5
                            flex
                            items-center
                            gap-2
                            bg-green-50
                            border
                            border-green-200
                            rounded-xl
                            px-4
                            py-3
                            text-green-700
                        "
                    >

                        <CheckCircle2 size={20} />

                        <span className="font-medium">

                            Resume Uploaded Successfully

                        </span>

                    </div>

                )

            }

        </div>

    );

};

export default UploadResume;