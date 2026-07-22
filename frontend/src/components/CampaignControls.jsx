import {
  Play,
  Pause,
  RotateCcw,
  Square,
  Rocket,
  User,
  Mail,
  Building2,
  XCircle,
  Gauge,
} from 'lucide-react';

import {
  startCampaign,
  pauseCampaign,
  resumeCampaign,
  stopCampaign,
} from '../services/campaignApi';

const STATUS_STYLES = {
  running: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  paused: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  completed: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  idle: 'bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300',
};

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

  const getStatusColor = () => STATUS_STYLES[campaign.status] ?? STATUS_STYLES.idle;

  const minutes = Math.floor(campaign.waitTime / 60);
  const seconds = campaign.waitTime % 60;

  const timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isIdle = campaign.status === 'idle';
  const isRunning = campaign.status === 'running';
  const isPaused = campaign.status === 'paused';
  const isCompleted = campaign.status === 'completed';

  // Daily sending limit — reads from campaign.dailyLimit / campaign.sentToday if the
  // API provides them. Renders nothing extra if they're not present yet.
  const hasDailyLimit = typeof campaign.dailyLimit === 'number';
  const sentToday = campaign.sentToday ?? 0;
  const remainingToday = hasDailyLimit ? Math.max(campaign.dailyLimit - sentToday, 0) : null;
  const dailyLimitReached = hasDailyLimit && remainingToday === 0;
  const dailyProgress = hasDailyLimit
    ? Math.min(Math.round((sentToday / campaign.dailyLimit) * 100), 100)
    : 0;

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

      <div className='flex justify-between items-start mb-6'>
        <div className='flex gap-4'>
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
            <Rocket className='text-indigo-600 dark:text-indigo-400' size={22} strokeWidth={1.75} />
          </div>

          <div>
            <h2 className='text-[17px] font-semibold tracking-tight text-slate-900 dark:text-white'>
              Campaign Control
            </h2>

            <p className='text-sm text-slate-400 dark:text-slate-500'>
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
          font-medium
          capitalize
          ${getStatusColor()}
        `}
        >
          {campaign.status}
        </span>
      </div>

      {/* Statistics */}

      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-white/2 p-4 text-center'>
          <p className='text-2xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums'>
            {campaign.sent}
          </p>

          <p className='text-xs text-slate-400 dark:text-slate-500 mt-0.5'>Sent</p>
        </div>

        <div className='rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-white/2 p-4 text-center'>
          <p className='text-2xl font-semibold text-rose-500 dark:text-rose-400 tabular-nums'>
            {campaign.failed}
          </p>

          <p className='text-xs text-slate-400 dark:text-slate-500 mt-0.5'>Failed</p>
        </div>

        <div className='rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-white/2 p-4 text-center'>
          <p className='text-2xl font-semibold text-slate-800 dark:text-white tabular-nums'>
            {campaign.total}
          </p>

          <p className='text-xs text-slate-400 dark:text-slate-500 mt-0.5'>Total</p>
        </div>
      </div>

      {/* Progress */}

      <div className='mb-6'>
        <div className='flex justify-between mb-2'>
          <span className='text-sm font-medium text-slate-600 dark:text-slate-300'>Progress</span>

          <span className='text-sm font-semibold text-slate-800 dark:text-white tabular-nums'>
            {progress}%
          </span>
        </div>

        <div className='h-2.5 rounded-full bg-slate-100 dark:bg-white/6 overflow-hidden'>
          <div
            style={{
              width: `${progress}%`,
            }}
            className='
            h-full
            rounded-full
            bg-[#111827]
            dark:bg-[#C9A227]
            transition-all
            duration-700
          '
          />
        </div>

        {campaign.status === 'running' && campaign.waitTime > 0 && (
          <div
            className='
      mt-5
      rounded-xl
      bg-slate-50/60
      dark:bg-white/2
      border
      border-slate-200/80
      dark:border-white/10
      p-4
    '
          >
            <p className='text-sm text-slate-400 dark:text-slate-500'>Next email will be sent in</p>

            <p className='text-3xl font-semibold text-slate-800 dark:text-white tracking-wider tabular-nums mt-1'>
              {timer}
            </p>
          </div>
        )}
      </div>

      {/* Daily Sending Limit */}

      {hasDailyLimit && (
        <div
          className='
            rounded-2xl
            border
            border-slate-200/80
            dark:border-white/10
            bg-slate-50/60
            dark:bg-white/2
            p-5
            mb-6
          '
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Gauge size={16} className='text-slate-400 dark:text-slate-500' strokeWidth={1.75} />

              <h3 className='text-sm font-medium text-slate-600 dark:text-slate-300'>
                Daily Sending Limit
              </h3>
            </div>

            <span
              className={`
                text-xs
                font-medium
                px-2.5
                py-0.5
                rounded-full
                ${dailyLimitReached
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                }
              `}
            >
              {dailyLimitReached ? 'Limit Reached' : `${remainingToday} Remaining Today`}
            </span>
          </div>

          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <p className='text-xl font-semibold text-slate-800 dark:text-white tabular-nums'>
                {sentToday}
                <span className='text-sm font-normal text-slate-400 dark:text-slate-500'>
                  {' '}
                  / {campaign.dailyLimit}
                </span>
              </p>

              <p className='text-xs text-slate-400 dark:text-slate-500 mt-0.5'>Sent Today</p>
            </div>

            <div className='text-right'>
              <p
                className={`text-xl font-semibold tabular-nums ${dailyLimitReached
                    ? 'text-rose-500 dark:text-rose-400'
                    : 'text-slate-800 dark:text-white'
                  }`}
              >
                {remainingToday}
              </p>

              <p className='text-xs text-slate-400 dark:text-slate-500 mt-0.5'>Remaining Today</p>
            </div>
          </div>

          <div className='h-2 rounded-full bg-slate-200/80 dark:bg-white/6 overflow-hidden'>
            <div
              style={{ width: `${dailyProgress}%` }}
              className={`h-full rounded-full transition-all duration-700 ${dailyLimitReached ? 'bg-rose-500' : 'bg-[#111827] dark:bg-[#C9A227]'
                }`}
            />
          </div>
        </div>
      )}

      {/* Current Contact */}

      <div
        className='
        rounded-2xl
        border
        border-slate-200/80
        dark:border-white/10
        bg-slate-50/60
        dark:bg-white/2
        p-5
        mb-6
      '
      >
        <h3 className='text-sm font-medium text-slate-600 dark:text-slate-300 mb-4'>
          Current Contact
        </h3>

        {campaign.currentContact ? (
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <User size={16} className='text-slate-400 dark:text-slate-500' strokeWidth={1.75} />

              <span className='text-sm text-slate-800 dark:text-white'>
                {campaign.currentContact.name}
              </span>
            </div>

            <div className='flex items-center gap-3'>
              <Building2 size={16} className='text-slate-400 dark:text-slate-500' strokeWidth={1.75} />

              <span className='text-sm text-slate-600 dark:text-slate-300'>
                {campaign.currentContact.company}
              </span>
            </div>

            <div className='flex items-center gap-3'>
              <Mail size={16} className='text-slate-400 dark:text-slate-500' strokeWidth={1.75} />

              <span className='text-sm text-slate-600 dark:text-slate-300'>
                {campaign.currentContact.email}
              </span>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-3 text-sm text-slate-400 dark:text-slate-500'>
            <XCircle size={16} strokeWidth={1.75} />
            No campaign running.
          </div>
        )}
      </div>

      {/* Controls */}

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
        <ActionButton
          icon={<Play size={16} strokeWidth={2} />}
          label='Start'
          tone='emerald'
          onClick={handleStart}
          disabled={!(isIdle || isCompleted)}
        />

        <ActionButton
          icon={<Pause size={16} strokeWidth={2} />}
          label='Pause'
          tone='amber'
          onClick={handlePause}
          disabled={!isRunning}
        />

        <ActionButton
          icon={<RotateCcw size={16} strokeWidth={2} />}
          label='Resume'
          tone='sky'
          onClick={handleResume}
          disabled={!isPaused}
        />

        <ActionButton
          icon={<Square size={16} strokeWidth={2} />}
          label='Stop'
          tone='rose'
          onClick={handleStop}
          disabled={!isRunning}
        />
      </div>
    </div>
  );
};

const TONE_STYLES = {
  emerald: 'bg-emerald-600 hover:bg-emerald-700',
  amber: 'bg-amber-500 hover:bg-amber-600',
  sky: 'bg-sky-600 hover:bg-sky-700',
  rose: 'bg-rose-600 hover:bg-rose-700',
};

const ActionButton = ({ icon, label, tone, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      ${disabled
        ? `
            bg-slate-100
            dark:bg-white/4
            text-slate-400
            dark:text-slate-500
            cursor-not-allowed
          `
        : `${TONE_STYLES[tone]} text-white active:scale-[0.97] cursor-pointer`
      }

      rounded-xl
      py-3
      text-sm
      font-medium
      flex
      items-center
      justify-center
      gap-2
      transition-colors
      duration-200
    `}
  >
    {icon}
    {label}
  </button>
);

export default CampaignControls;