import { useState } from 'react';
import { Mail, Save, CheckCircle2, Type } from 'lucide-react';
import { updateSubject } from '../services/campaignApi';

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
      alert(err.response?.data?.message || 'Failed to save subject.');
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
                    from-purple-500
                    to-fuchsia-600
                    flex
                    items-center
                    justify-center
                    shadow-md
                '
        >
          <Mail className='text-white' size={28} />
        </div>

        <div>
          <h2 className='text-xl font-bold text-slate-800 dark:text-white'>Email Subject</h2>

          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Configure the subject line used for every email.
          </p>
        </div>
      </div>

      {/* Subject Input */}

      <div
        className='
                rounded-2xl
                border
                border-slate-200
                dark:border-slate-700
                bg-slate-50
                dark:bg-slate-800/40
                p-5
            '
      >
        <div className='flex items-center gap-2 mb-3'>
          <Type size={18} className='text-purple-600' />

          <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>Subject</span>
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
                    dark:border-slate-700
                    bg-white
                    dark:bg-slate-900
                    dark:text-white
                    placeholder:text-slate-600
                    dark:placeholder:text-slate-400
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                '
        />
      </div>

      {/* Footer */}

      <div className='flex justify-between items-center mt-4'>
        <span
          className={`
                    text-sm
                    ${subject.length > 100 ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}
                `}
        >
          {subject.length}/120 characters
        </span>

        {saved && (
          <div className='flex items-center gap-2 text-green-600 dark:text-green-400'>
            <CheckCircle2 size={18} />

            <span className='font-medium'>Saved</span>
          </div>
        )}
      </div>

      {/* Preview */}

      {subject && (
        <div
          className='
                        mt-6
                        rounded-xl
                        border
                        border-blue-200
                        dark:border-blue-800
                        bg-blue-50
                        dark:bg-blue-900/20
                        p-4
                    '
        >
          <p className='text-xs uppercase tracking-wide text-blue-600 font-semibold'>Preview</p>

          <p className='mt-2 font-medium text-slate-800 dark:text-white'>{subject}</p>
        </div>
      )}

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
        <Save size={18} />

        {loading ? 'Saving...' : 'Save Subject'}
      </button>
    </div>
  );
};

export default SubjectInput;
