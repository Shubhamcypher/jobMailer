import { useState } from 'react';
import { Mail, Save, CheckCircle2, Type } from 'lucide-react';
import { updateSubject } from '../services/campaignApi';
import toast from 'react-hot-toast';

const SubjectInput = ({ campaign, setCampaign }) => {
  const [subject, setSubject] = useState(campaign.subject || '');

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
      }, 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save subject.');
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
          <Mail className='text-fuchsia-600 dark:text-fuchsia-400' size={22} strokeWidth={1.75} />
        </div>

        <div>
          <h2 className='text-[17px] font-semibold tracking-tight text-slate-900 dark:text-white'>
            Email Subject
          </h2>

          <p className='text-sm text-slate-400 dark:text-slate-500'>
            Configure the subject line used for every email.
          </p>
        </div>
      </div>

      {/* Subject Input */}

      <div
        className='
                rounded-2xl
                border
                border-slate-200/80
                dark:border-white/10
                bg-slate-50/60
                dark:bg-white/2
                p-5
            '
      >
        <div className='flex items-center gap-2 mb-3'>
          <Type size={16} className='text-slate-400 dark:text-slate-500' strokeWidth={1.75} />

          <span className='text-sm font-medium text-slate-600 dark:text-slate-300'>Subject</span>
        </div>

        <textarea
          rows={3}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder='Application for Software Developer'
          className='
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-300
                    dark:border-white/15
                    bg-white
                    dark:bg-[#0B0F19]
                    text-slate-800
                    dark:text-white
                    placeholder:text-slate-400
                    dark:placeholder:text-slate-500
                    text-sm
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:ring-2
                    focus:ring-[#C9A227]/50
                    focus:border-transparent
                '
        />
      </div>

      {/* Footer */}

      <div className='flex justify-between items-center mt-4'>
        <span
          className={`
                    text-xs
                    ${subject.length > 100 ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500'}
                `}
        >
          {subject.length}/120 characters
        </span>

        {saved && (
          <div className='flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400'>
            <CheckCircle2 size={16} strokeWidth={1.75} />

            <span className='text-sm font-medium'>Saved</span>
          </div>
        )}
      </div>

      {/* Button */}

      <button
        onClick={saveSubject}
        disabled={loading || !subject.trim()}
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
        <Save size={16} strokeWidth={2} />

        {loading ? 'Saving...' : 'Save Subject'}
      </button>
    </div>
  );
};

export default SubjectInput;