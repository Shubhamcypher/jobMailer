import { Users, Send, XCircle, Activity, UserCircle2 } from 'lucide-react';

const stats = [
  {
    title: 'Contacts',
    value: (campaign) => campaign.total,
    icon: Users,
    bg: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    title: 'Sent',
    value: (campaign) => campaign.sent,
    icon: Send,
    bg: 'bg-green-100',
    color: 'text-green-600',
  },
  {
    title: 'Failed',
    value: (campaign) => campaign.failed,
    icon: XCircle,
    bg: 'bg-red-100',
    color: 'text-red-600',
  },
  {
    title: 'Status',
    value: (campaign) => campaign.status,
    icon: Activity,
    bg: 'bg-purple-100',
    color: 'text-purple-600',
  },
];

const CampaignStatus = ({ campaign }) => {
  return (
    <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6'>
      <h2 className='text-2xl font-bold text-slate-800 mb-6'>Campaign Overview</h2>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className='
                                rounded-xl
                                border
                                border-slate-200
                                p-5
                                hover:shadow-md
                                transition
                            '
            >
              <div
                className={`
                                    w-12
                                    h-12
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    ${item.bg}
                                `}
              >
                <Icon size={24} className={item.color} />
              </div>

              <p className='text-slate-500 mt-4 text-sm'>{item.title}</p>

              <h2 className='text-3xl font-bold mt-1 text-slate-800'>{item.value(campaign)}</h2>
            </div>
          );
        })}
      </div>

      <div className='mt-8 border rounded-xl p-5 bg-slate-50'>
        <div className='flex items-center gap-3 mb-4'>
          <UserCircle2 className='text-slate-600' size={26} />

          <h3 className='font-semibold text-lg'>Current Contact</h3>
        </div>

        {campaign.currentContact ? (
          <>
            <p className='font-semibold text-slate-800'>{campaign.currentContact.name}</p>

            <p className='text-slate-600'>{campaign.currentContact.company}</p>

            <p className='text-blue-600'>{campaign.currentContact.email}</p>
          </>
        ) : (
          <p className='text-slate-500'>No campaign is running yet.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignStatus;
