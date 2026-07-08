import { useState } from 'react';

import UploadExcel from '../components/UploadExcel';
import UploadResume from '../components/UploadResume';
import SubjectInput from '../components/SubjectInput';
import TestEmail from '../components/TestEmail';
import ContactPreview from '../components/ContactPreview';
import CampaignControls from '../components/CampaignControls';
import { useEffect } from 'react';
import { getCampaignStatus } from '../services/campaignApi';

const Dashboard = () => {
  const [campaign, setCampaign] = useState({
    contacts: [],
    total: 0,
    resume: null,
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

    const interval = setInterval(loadStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen bg-slate-100'>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        {/* Header */}

        <div className='mb-10'>
          <h1 className='text-5xl font-bold text-slate-800'>📧 Job Mailer</h1>

          <p className='text-slate-500 mt-2 text-lg'>AI Powered Bulk Job Application Platform</p>
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
