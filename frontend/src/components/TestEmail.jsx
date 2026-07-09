import { useState } from 'react';
import { FlaskConical, Send, CheckCircle2, XCircle, AlertTriangle, Mail } from 'lucide-react';

import { sendTestEmail } from '../services/campaignApi';

const TestEmail = ({ campaign }) => {
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const ready = campaign.resume && campaign.subject && campaign.total > 0;

  const handleSend = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);

      await sendTestEmail(email);

      alert('Test email sent successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send email.');
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
                    from-orange-500
                    to-red-500
                    flex
                    items-center
                    justify-center
                    shadow-md
                '
        >
          <FlaskConical className='text-white' size={28} />
        </div>

        <div>
          <h2 className='text-xl font-bold text-slate-800 dark:text-white'>Test Email</h2>

          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Verify everything before launching your campaign.
          </p>
        </div>
      </div>

      {/* Email */}

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
        <label className='flex items-center gap-2 mb-3 text-sm font-medium text-slate-700 dark:text-slate-300'>
          <Mail size={18} />
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
                    dark:border-slate-700
                    bg-white
                    dark:bg-slate-900
                    dark:text-white
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

      {/* Checklist */}

      <div className='mt-6'>
        <h3 className='font-semibold text-slate-800 dark:text-white mb-4'>Pre-flight Checklist</h3>

        <div className='space-y-3'>
          <Checklist ok={campaign.resume} text='Resume Uploaded' />

          <Checklist ok={campaign.subject} text='Subject Configured' />

          <Checklist ok={campaign.total > 0} text={`${campaign.total || 0} Contacts Loaded`} />
        </div>
      </div>

      {/* Warning */}

      <div
        className='
                mt-6
                flex
                gap-3
                rounded-xl
                border
                border-amber-200
                dark:border-amber-700
                bg-amber-50
                dark:bg-amber-900/20
                p-4
            '
      >
        <AlertTriangle className='text-amber-600 mt-0.5' size={20} />

        <div>
          <p className='font-medium text-amber-700 dark:text-amber-400'>Recommendation</p>

          <p className='text-sm text-amber-600 dark:text-amber-500'>
            Always send yourself a test email before starting the bulk campaign.
          </p>
        </div>
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
        <Send size={18} />

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
        rounded-xl
        border
        border-slate-200
        dark:border-slate-700
        p-3
        bg-white
        dark:bg-slate-800
    '
  >
    <div className='flex items-center gap-3'>
      {ok ? (
        <CheckCircle2 className='text-green-600' size={20} />
      ) : (
        <XCircle className='text-red-500' size={20} />
      )}

      <span className='text-slate-700 dark:text-slate-200'>{text}</span>
    </div>

    <span
      className={`
                text-xs
                font-semibold
                px-3
                py-1
                rounded-full
                ${
                  ok
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }
            `}
    >
      {ok ? 'Ready' : 'Missing'}
    </span>
  </div>
);

export default TestEmail;
