import { useState } from 'react';
import { MailCheck } from 'lucide-react';
import UploadExcel from '../components/UploadExcel';
import UploadResume from '../components/UploadResume';
import SubjectInput from '../components/SubjectInput';
import TestEmail from '../components/TestEmail';
import ContactPreview from '../components/ContactPreview';
import CampaignControls from '../components/CampaignControls';
import { useEffect } from 'react';
import { getCampaignStatus } from '../services/campaignApi';
import ThemeToggle from '../components/ThemeToggle';

const STATUS_STYLES = {
  idle: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  running: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  sending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  done: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  failed: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  error: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
};

const getStatusStyle = (status) =>
  STATUS_STYLES[status?.toLowerCase()] ??
  'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';

const Dashboard = () => {
  const [campaign, setCampaign] = useState({
    contacts: [],
    total: 0,
    resume: null,
    excel: null,
    subject: '',
    status: 'idle',
    sent: 0,
    failed: 0,
    currentContact: null,
  });

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const res = await getCampaignStatus();

        setCampaign(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadStatus();

    const interval = setInterval(loadStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='
    min-h-screen
    bg-[#F7F5F1]
    dark:bg-[#0B0F19]
    transition-colors
    duration-300
'
    >
      {/* Navbar */}
      <header
        className='
              sticky
              top-0
              z-20
              bg-white/80
              dark:bg-[#0B0F19]/80
              backdrop-blur-md
              border-b
              border-slate-200/80
              dark:border-white/10
            '
      >
        <div className='max-w-7xl mx-auto px-6'>
          <div className='flex items-center justify-between gap-6 h-19'>
            <div className='flex items-center gap-4'>
              <div
                className='
                      relative
                      w-10
                      h-10
                      rounded-xl
                      bg-linear-to-br
                      from-[#1C2333]
                      to-[#0B0F19]
                      dark:from-[#C9A227]
                      dark:to-[#8A6D1B]
                      flex
                      items-center
                      justify-center
                      shadow-inner
                      ring-1
                      ring-black/10
                      dark:ring-white/10
                    '
              >
                <MailCheck size={18} className='text-[#C9A227] dark:text-[#0B0F19]' strokeWidth={2} />
              </div>

              <div>
                <h1 className='text-[17px] leading-none font-semibold tracking-tight text-slate-900 dark:text-white'>
                  Job Mailer
                </h1>

                <p className='mt-1 text-[11px] tracking-wide uppercase text-slate-400 dark:text-slate-500'>
                  Bulk Job Application Platform
                </p>
              </div>
            </div>

            <div className='flex items-center gap-6'>
              <div className='hidden md:flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                  <p className='text-[11px] font-medium tracking-wide uppercase text-slate-400 dark:text-slate-500'>
                    Contacts
                  </p>

                  <p className='font-semibold text-slate-800 dark:text-white tabular-nums'>
                    {campaign.total}
                  </p>
                </div>

                <div className='w-px h-5 bg-slate-200 dark:bg-white/10' />

                <div className='flex items-center gap-2'>
                  <p className='text-[11px] font-medium tracking-wide uppercase text-slate-400 dark:text-slate-500'>
                    Status
                  </p>

                  <span
                    className={`
                      inline-flex
                      w-fit
                      items-center
                      rounded-full
                      px-2.5
                      py-0.5
                      text-xs
                      font-medium
                      capitalize
                      ${getStatusStyle(campaign.status)}
                    `}
                  >
                    {campaign.status}
                  </span>
                </div>
              </div>

              <div className='w-px h-5 bg-slate-200 dark:bg-white/10 hidden md:block' />

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-6 py-10'>
        {/* Upload Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <UploadExcel campaign={campaign} setCampaign={setCampaign} />

          <UploadResume campaign={campaign} setCampaign={setCampaign} />
        </div>
        {/* Subject */}
        <div className='mt-6'>
          <SubjectInput campaign={campaign} setCampaign={setCampaign} />
        </div>
        {/* Test Email */}
        <div className='mt-6'>
          <TestEmail campaign={campaign} />
        </div>
        {/* Status */}
        <div className='mt-6'>
          <CampaignControls campaign={campaign} />
        </div>
        {/* Contact Preview */}
        <div className='mt-6'>
          <ContactPreview campaign={campaign} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;