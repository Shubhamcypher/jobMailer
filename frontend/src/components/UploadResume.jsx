import { useState } from 'react';
import { FileText, Upload, CheckCircle2 } from 'lucide-react';
import { uploadResume } from '../services/campaignApi';
import toast from 'react-hot-toast';

const UploadResume = ({ campaign, setCampaign }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('resume', file);

      const res = await uploadResume(formData);

      setCampaign((prev) => ({
        ...prev,
        resume: {
          filename: file.name,
        },
      }));
      toast.success(res.data.message)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='
            bg-white
            dark:bg-[#11162236]
            backdrop-blur-sm
            border
            border-slate-200/80
            dark:border-white/10
            rounded-2xl
            shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)]
            dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_20px_40px_-20px_rgba(0,0,0,0.6)]
            hover:border-slate-300
            dark:hover:border-white/20
            transition-colors
            duration-300
            p-6
        '
    >
      {/* Header */}

      <div className='flex items-center gap-4 mb-6'>
        <div
          className='
                    w-12
                    h-12
                    rounded-xl
                    bg-slate-50
                    dark:bg-white/3
                    border
                    border-slate-200/80
                    dark:border-white/10
                    flex
                    items-center
                    justify-center
                '
        >
          <FileText className='text-sky-600 dark:text-sky-400' size={22} strokeWidth={1.75} />
        </div>

        <div>
          <h2 className='text-[17px] font-semibold tracking-tight text-slate-900 dark:text-white'>
            Upload Resume
          </h2>

          <p className='text-sm text-slate-400 dark:text-slate-500'>
            Upload your latest resume in PDF format
          </p>
        </div>
      </div>

      {/* Upload Area */}

      <div
        className='
                border
                border-dashed
                border-slate-300
                dark:border-white/15
                rounded-2xl
                p-6
                bg-slate-50/60
                dark:bg-white/2
                transition
            '
      >
        <input
          type='file'
          accept='.pdf'
          onChange={(e) => setFile(e.target.files[0])}
          className='
                    w-full
                    text-sm
                    text-slate-600
                    dark:text-slate-300
                    file:mr-4
                    file:px-4
                    file:py-2
                    file:rounded-lg
                    file:border-0
                    file:bg-[#111827]
                    dark:file:bg-[#C9A227]
                    file:text-white
                    dark:file:text-[#0B0F19]
                    file:font-medium
                    file:text-sm
                    file:cursor-pointer
                    hover:file:bg-[#1C2333]
                    dark:hover:file:bg-[#B8931F]
                    file:transition-colors
                '
        />

        {(file || campaign.resume) && (
          <div
            className='
      mt-5
      flex
      items-center
      gap-3
      bg-white
      dark:bg-white/3
      border
      border-slate-200/80
      dark:border-white/10
      rounded-xl
      p-3
    '
          >
            <FileText className='text-slate-400 dark:text-slate-500' size={20} strokeWidth={1.75} />

            <div className='flex-1'>
              <p className='font-medium text-sm text-slate-800 dark:text-white'>
                {file ? file.name : campaign.resume.filename}
              </p>

              <p className='text-xs text-emerald-600 dark:text-emerald-400'>
                {file ? 'Ready to upload' : 'Already uploaded'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Button */}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className='
                mt-6
                w-full
                flex
                justify-center
                items-center
                gap-2
                bg-[#111827]
                dark:bg-[#C9A227]
                hover:bg-[#1C2333]
                dark:hover:bg-[#B8931F]
                disabled:bg-slate-200
                dark:disabled:bg-white/10
                disabled:text-slate-400
                dark:disabled:text-slate-500
                disabled:cursor-not-allowed
                text-white
                dark:text-[#0B0F19]
                font-medium
                text-sm
                tracking-tight
                py-3
                rounded-xl
                transition-colors
                duration-200
                active:scale-[0.98]
                cursor-pointer
            '
      >
        <Upload size={16} strokeWidth={2} />

        {loading ? 'Uploading...' : campaign.resume ? 'Replace Resume' : 'Upload Resume'}
      </button>

      {/* Success */}

      {campaign.resume && (
        <div
          className='
                        mt-5
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-emerald-50
                        dark:bg-emerald-500/10
                        border
                        border-emerald-200/80
                        dark:border-emerald-500/20
                        p-4
                    '
        >
          <CheckCircle2 className='text-emerald-600 dark:text-emerald-400' size={20} strokeWidth={1.75} />

          <div>
            <p className='font-semibold text-sm text-emerald-700 dark:text-emerald-400'>
              Resume Uploaded
            </p>

            <p className='text-sm text-emerald-600/90 dark:text-emerald-500/80'>
              Your resume is ready to be attached to every email.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadResume;