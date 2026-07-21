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
    bg-slate-100
    dark:bg-slate-950
    transition-colors
    duration-300
'
    >
      <div className='max-w-7xl mx-auto px-6 py-10'>
        {/* Header */}
        <div
          className='
                mb-8
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                shadow-sm
                px-8
                py-6
              '
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-5'>
              <div
                className='
                      w-12
                      h-12
                      rounded-xl
                      bg-blue-600
                      flex
                      items-center
                      justify-center
                    '
              >
                <MailCheck size={22} className='text-white' />
              </div>

              <div>
                <h1 className='text-3xl font-bold text-slate-800 dark:text-white'>Job Mailer</h1>

                <p className='mt-1 text-slate-500 dark:text-slate-400'>
                  Bulk Job Application Platform
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div
                className='
        hidden
        md:flex
        items-center
        gap-6
        rounded-xl
        bg-slate-100
        dark:bg-slate-800
        px-5
        py-3
      '
              >
                <div>
                  <p className='text-xs text-slate-500'>Contacts</p>

                  <p className='font-semibold dark:text-white'>{campaign.total}</p>
                </div>

                <div className='w-px h-8 bg-slate-300 dark:bg-slate-700' />

                <div>
                  <p className='text-xs text-slate-500'>Status</p>

                  <p className='font-semibold capitalize dark:text-white'>{campaign.status}</p>
                </div>
              </div>

              <ThemeToggle />
            </div>
          </div>
        </div>

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
