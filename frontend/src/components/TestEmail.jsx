import { useState } from 'react';
import { FlaskConical, Send, CheckCircle2, XCircle, AlertTriangle, Mail, Paperclip } from 'lucide-react';

import { sendTestEmail } from '../services/campaignApi';
import toast from 'react-hot-toast';

const TestEmail = ({ campaign }) => {
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const ready = campaign.resume && campaign.subject && campaign.total > 0;

  const handleSend = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);

      await sendTestEmail(email);

      toast.success('Test email sent successfully.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send email.');
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
          <FlaskConical className='text-orange-600 dark:text-orange-400' size={22} strokeWidth={1.75} />
        </div>

        <div>
          <h2 className='text-[17px] font-semibold tracking-tight text-slate-900 dark:text-white'>
            Test Email
          </h2>

          <p className='text-sm text-slate-400 dark:text-slate-500'>
            Verify everything before launching your campaign.
          </p>
        </div>
      </div>

      {/* Email input */}

      <div>
        <label className='flex items-center gap-2 mb-2 text-sm font-medium text-slate-600 dark:text-slate-300'>
          <Mail size={16} strokeWidth={1.75} />
          Recipient Email
        </label>

        <input
          type='email'
          placeholder='your@email.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    dark:border-white/15
                    bg-white
                    dark:bg-[#0B0F19]
                    text-slate-800
                    dark:text-white
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

      {/* Checklist */}

      <div
        className='
                mt-5
                rounded-2xl
                border
                border-slate-200/80
                dark:border-white/10
                divide-y
                divide-slate-200/80
                dark:divide-white/10
                overflow-hidden
            '
      >
        <Checklist ok={campaign.resume} text='Resume Uploaded' />

        <Checklist ok={campaign.subject} text='Subject Configured' />

        <Checklist ok={campaign.total > 0} text={`${campaign.total || 0} Contacts Loaded`} />
      </div>

      {/* Warning */}

      <div className='mt-5 flex items-start gap-2.5 text-sm text-amber-700 dark:text-amber-500/90'>
        <AlertTriangle size={16} strokeWidth={1.75} className='mt-0.5 shrink-0' />

        <p>Always send yourself a test email before starting the bulk campaign.</p>
      </div>

      {/* Button */}

      <button
        onClick={handleSend}
        disabled={loading || !ready}
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
        <Send size={16} strokeWidth={2} />

        {loading ? 'Sending Test Email...' : 'Send Test Email'}
      </button>
    </div>
  );
};

const Checklist = ({ ok, text }) => (
  <div
    className='
        flex
        justify-between
        items-center
        px-4
        py-3
        bg-white
        dark:bg-transparent
    '
  >
    <div className='flex items-center gap-2.5'>
      {ok ? (
        <CheckCircle2 className='text-emerald-600 dark:text-emerald-400' size={17} strokeWidth={1.75} />
      ) : (
        <XCircle className='text-rose-400 dark:text-rose-500' size={17} strokeWidth={1.75} />
      )}

      <span className='text-sm text-slate-700 dark:text-slate-200'>{text}</span>
    </div>

    <span
      className={`
                text-xs
                font-medium
                px-2.5
                py-0.5
                rounded-full
                ${
                  ok
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                }
            `}
    >
      {ok ? 'Ready' : 'Missing'}
    </span>
  </div>
);

export default TestEmail;