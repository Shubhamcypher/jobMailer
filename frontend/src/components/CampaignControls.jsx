import { Play, Pause, RotateCcw, Square, Rocket } from 'lucide-react';

import {
  startCampaign,
  pauseCampaign,
  resumeCampaign,
  stopCampaign,
  getCampaignStatus,
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

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6'>
      {/* Header */}

      <div className='flex items-center gap-3 mb-6'>
        <div className='p-3 rounded-xl bg-indigo-100'>
          <Rocket className='text-indigo-600' size={24} />
        </div>

        <div>
          <h2 className='text-xl font-bold text-slate-800'>Campaign Control Center</h2>

          <p className='text-sm text-slate-500'>Manage your email campaign.</p>
        </div>
      </div>

      {/* Progress */}

      <div className='mb-6'>
        <div className='flex justify-between mb-2'>
          <span className='font-medium'>Progress</span>

          <span>{progress}%</span>
        </div>

        <div className='w-full h-3 bg-slate-200 rounded-full overflow-hidden'>
          <div
            style={{
              width: `${progress}%`,
            }}
            className='
                            h-full
                            bg-blue-600
                            transition-all
                            duration-500
                        '
          />
        </div>
      </div>

      {/* Current Contact */}

      <div className='bg-slate-50 rounded-xl p-4 mb-6'>
        <p className='font-semibold mb-2'>Current Contact</p>

        {campaign.currentContact ? (
          <>
            <p>{campaign.currentContact.name}</p>

            <p className='text-slate-500'>{campaign.currentContact.company}</p>
          </>
        ) : (
          <p className='text-slate-400'>No campaign running.</p>
        )}
      </div>

      {/* Buttons */}

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <button
          onClick={handleStart}
          className='
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        py-3
                        rounded-xl
                        flex
                        justify-center
                        items-center
                        gap-2
                        transition
                    '
        >
          <Play size={18} />
          Start
        </button>

        <button
          onClick={handlePause}
          className='
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-white
                        py-3
                        rounded-xl
                        flex
                        justify-center
                        items-center
                        gap-2
                        transition
                    '
        >
          <Pause size={18} />
          Pause
        </button>

        <button
          onClick={handleResume}
          className='
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-3
                        rounded-xl
                        flex
                        justify-center
                        items-center
                        gap-2
                        transition
                    '
        >
          <RotateCcw size={18} />
          Resume
        </button>

        <button
          onClick={handleStop}
          className='
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        py-3
                        rounded-xl
                        flex
                        justify-center
                        items-center
                        gap-2
                        transition
                    '
        >
          <Square size={18} />
          Stop
        </button>
      </div>
    </div>
  );
};

export default CampaignControls;
