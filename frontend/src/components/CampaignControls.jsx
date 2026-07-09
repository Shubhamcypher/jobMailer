import {
  Play,
  Pause,
  RotateCcw,
  Square,
  Rocket,
  User,
  Mail,
  Building2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

import {
  startCampaign,
  pauseCampaign,
  resumeCampaign,
  stopCampaign,
} from '../services/campaignApi';

const CampaignControls = ({ campaign }) => {
  const handleStart = async () => {
    try {
      await startCampaign();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePause = async () => {
    try {
      await pauseCampaign();
    } catch (err) {
      console.log(err);
    }
  };

  const handleResume = async () => {
    try {
      await resumeCampaign();
    } catch (err) {
      console.log(err);
    }
  };

  const handleStop = async () => {
    try {
      await stopCampaign();
    } catch (err) {
      console.log(err);
    }
  };

  const progress =
    campaign.total === 0
      ? 0
      : Math.round(((campaign.sent + campaign.failed) / campaign.total) * 100);

  const getStatusColor = () => {
    switch (campaign.status) {
      case 'running':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';

      case 'paused':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';

      case 'completed':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';

      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
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

      <div className='flex justify-between items-start mb-6'>
        <div className='flex gap-4'>
          <div
            className='
            w-14
            h-14
            rounded-2xl
            bg-linear-to-br
            from-indigo-500
            to-blue-600
            flex
            items-center
            justify-center
            shadow-md
          '
          >
            <Rocket className='text-white' size={28} />
          </div>

          <div>
            <h2 className='text-xl font-bold text-slate-800 dark:text-white'>Campaign Control</h2>

            <p className='text-sm text-slate-500 dark:text-slate-400'>
              Launch and monitor your email campaign.
            </p>
          </div>
        </div>

        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          capitalize
          ${getStatusColor()}
        `}
        >
          {campaign.status}
        </span>
      </div>

      {/* Statistics */}

      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-center'>
          <p className='text-2xl font-bold text-slate-800 dark:text-white'>{campaign.sent}</p>

          <p className='text-sm text-slate-500'>Sent</p>
        </div>

        <div className='rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-center'>
          <p className='text-2xl font-bold text-red-500'>{campaign.failed}</p>

          <p className='text-sm text-slate-500'>Failed</p>
        </div>

        <div className='rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-center'>
          <p className='text-2xl font-bold text-blue-600'>{campaign.total}</p>

          <p className='text-sm text-slate-500'>Total</p>
        </div>
      </div>

      {/* Progress */}

      <div className='mb-6'>
        <div className='flex justify-between mb-2'>
          <span className='font-semibold text-slate-700 dark:text-slate-300'>Progress</span>

          <span className='font-bold text-blue-600'>{progress}%</span>
        </div>

        <div className='h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden'>
          <div
            style={{
              width: `${progress}%`,
            }}
            className='
            h-full
            rounded-full
            bg-linear-to-r
            from-blue-500
            to-indigo-600
            transition-all
            duration-700
          '
          />
        </div>
      </div>

      {/* Current Contact */}

      <div
        className='
        rounded-2xl
        border
        border-slate-200
        dark:border-slate-700
        bg-slate-50
        dark:bg-slate-800
        p-5
        mb-6
      '
      >
        <h3 className='font-semibold text-slate-800 dark:text-white mb-4'>Current Contact</h3>

        {campaign.currentContact ? (
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <User size={18} className='text-blue-600' />

              <span className='dark:text-white'>{campaign.currentContact.name}</span>
            </div>

            <div className='flex items-center gap-3'>
              <Building2 size={18} className='text-purple-600' />

              <span className='dark:text-slate-300'>{campaign.currentContact.company}</span>
            </div>

            <div className='flex items-center gap-3'>
              <Mail size={18} className='text-green-600' />

              <span className='text-sm dark:text-slate-300'>{campaign.currentContact.email}</span>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-3 text-slate-500 dark:text-slate-400'>
            <XCircle size={18} />
            No campaign running.
          </div>
        )}
      </div>

      {/* Controls */}

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <ActionButton
          icon={<Play size={18} />}
          label='Start'
          color='bg-green-600 hover:bg-green-700'
          onClick={handleStart}
        />

        <ActionButton
          icon={<Pause size={18} />}
          label='Pause'
          color='bg-yellow-500 hover:bg-yellow-600'
          onClick={handlePause}
        />

        <ActionButton
          icon={<RotateCcw size={18} />}
          label='Resume'
          color='bg-blue-600 hover:bg-blue-700'
          onClick={handleResume}
        />

        <ActionButton
          icon={<Square size={18} />}
          label='Stop'
          color='bg-red-600 hover:bg-red-700'
          onClick={handleStop}
        />
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className={`
      ${color}
      text-white
      rounded-xl
      py-3.5
      font-semibold
      flex
      items-center
      justify-center
      gap-2
      transition-all
      duration-300
      hover:scale-[1.03]
      active:scale-95
    `}
  >
    {icon}
    {label}
  </button>
);

export default CampaignControls;
