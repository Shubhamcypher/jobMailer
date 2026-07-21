import { useState } from 'react';
import { FileText, Upload, CheckCircle2, File } from 'lucide-react';
import { uploadResume } from '../services/campaignApi';

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
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-700
            rounded-2xl
            shadow-lg
            hover:shadow-xl
            transition-all
            duration-300
            p-6
        '
    >
      {/* Header */}

      <div className='flex items-center gap-4 mb-6'>
        <div
          className='
                    w-14
                    h-14
                    rounded-2xl
                    bg-linear-to-br
                    from-blue-500
                    to-cyan-600
                    flex
                    items-center
                    justify-center
                    shadow-md
                '
        >
          <FileText className='text-white' size={28} />
        </div>

        <div>
          <h2 className='text-xl font-bold text-slate-800 dark:text-white'>Upload Resume</h2>

          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Upload your latest resume in PDF format
          </p>
        </div>
      </div>

      {/* Upload Area */}

      <div
        className='
                border-2
                border-dashed
                border-slate-300
                dark:border-slate-700
                rounded-2xl
                p-6
                bg-slate-50
                dark:bg-slate-800/40
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
                    dark:text-white
                    file:mr-4
                    file:px-4
                    file:py-2
                    file:rounded-xl
                    file:border-0
                    file:bg-blue-600
                    file:text-white
                    file:font-medium
                    file:cursor-pointer
                    hover:file:bg-blue-700
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
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-700
      rounded-xl
      p-3
    '
          >
            <FileText className='text-blue-600' size={20} />

            <div className='flex-1'>
              <p className='font-medium text-slate-800 dark:text-white'>
                {file ? file.name : campaign.resume.filename}
              </p>

              <p className='text-xs text-green-600'>
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
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-slate-400
                disabled:cursor-not-allowed
                text-white
                font-semibold
                py-3.5
                rounded-xl
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-95
                cursor-pointer
            '
      >
        <Upload size={18} />

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
                        bg-green-50
                        dark:bg-green-900/20
                        border
                        border-green-200
                        dark:border-green-800
                        p-4
                    '
        >
          <CheckCircle2 className='text-green-600' size={22} />

          <div>
            <p className='font-semibold text-green-700 dark:text-green-400'>Resume Uploaded</p>

            <p className='text-sm text-green-600 dark:text-green-500'>
              Your resume is ready to be attached to every email.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadResume;
