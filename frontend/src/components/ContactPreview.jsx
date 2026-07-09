import { useMemo, useState } from 'react';
import { Search, Users, Mail, Building2, User } from 'lucide-react';
import ContactModal from './ContactModal';
import ContactExplorer from './ContactExplorer';

const ContactPreview = ({ campaign }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredContacts = useMemo(() => {
    if (!search.trim()) {
      return campaign.contacts.slice(0, 5);
    }

    return campaign.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.company.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [campaign.contacts, search]);

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

      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 mb-6'>
        <div className='flex items-center gap-4'>
          <div
            className='
                        w-14
                        h-14
                        rounded-2xl
                        bg-linear-to-br
                        from-indigo-500
                        to-purple-600
                        flex
                        items-center
                        justify-center
                        shadow-md
                    '
          >
            <Users className='text-white' size={28} />
          </div>

          <div>
            <h2 className='text-xl font-bold text-slate-800 dark:text-white'>Contact Preview</h2>

            <p className='text-sm text-slate-500 dark:text-slate-400'>
              Preview your imported HR contacts
            </p>
          </div>
        </div>

        <div className='flex gap-3 flex-wrap'>
          <div
            className='
                        px-4
                        py-2
                        rounded-xl
                        bg-blue-50
                        dark:bg-blue-900/20
                        text-blue-700
                        dark:text-blue-400
                        font-semibold
                    '
          >
            {campaign.total} Contacts
          </div>

          <div className='relative'>
            <Search size={18} className='absolute left-3 top-3 text-slate-400' />

            <input
              type='text'
              placeholder='Search contacts...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='
                            w-72
                            pl-10
                            pr-4
                            py-2.5
                            rounded-xl
                            border
                            border-slate-300
                            dark:border-slate-700
                            bg-white
                            dark:bg-slate-800
                            dark:text-white
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        '
            />
          </div>
        </div>
      </div>

      {campaign.contacts.length === 0 ? (
        <div className='py-16 text-center'>
          <Users size={70} className='mx-auto text-slate-300 dark:text-slate-700' />

          <h3 className='mt-5 text-xl font-semibold text-slate-700 dark:text-white'>
            No Contacts Imported
          </h3>

          <p className='mt-2 text-slate-500 dark:text-slate-400'>
            Upload an Excel file to preview your HR contacts.
          </p>
        </div>
      ) : (
        <>
          <div className='overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700'>
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <thead className='bg-slate-100 dark:bg-slate-800'>
                  <tr>
                    <th className='px-6 py-4 text-left font-semibold'>Contact</th>
                    <th className='px-6 py-4 text-left font-semibold'>Company</th>
                    <th className='px-6 py-4 text-left font-semibold'>Email</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className='
                  border-t
                  border-slate-200
                  dark:border-slate-700
                  hover:bg-slate-50
                  dark:hover:bg-slate-800/60
                  transition-all
                '
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div
                            className='
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-linear-to-br
                                    from-blue-500
                                    to-indigo-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    font-semibold
                                    '
                          >
                            {contact.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>

                          <div>
                            <p className='font-semibold text-slate-800 dark:text-white'>
                              {contact.name}
                            </p>

                            <p className='text-xs text-slate-500'>{contact.title}</p>
                          </div>
                        </div>
                      </td>

                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-2'>
                          <Building2 size={18} className='text-purple-600' />

                          <span className='text-slate-700 dark:text-slate-300'>
                            {contact.company}
                          </span>
                        </div>
                      </td>

                      <td className='px-6 py-4'>
                        <a
                          href={`mailto:${contact.email}`}
                          className='
                                flex
                                items-center
                                gap-2
                                text-blue-600
                                dark:text-blue-400
                                hover:underline
                            '
                        >
                          <Mail size={16} />
                          {contact.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* View All Button */}

          {campaign.contacts.length > 5 && (
            <div className='mt-6 flex justify-center'>
              <button
                onClick={() => setOpen(true)}
                className='
            px-6
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            transition-all
            duration-300
            hover:scale-105
            active:scale-95
          '
              >
                View All Contacts →
              </button>
            </div>
          )}
        </>
      )}

      <ContactModal open={open} onClose={() => setOpen(false)} total={campaign.total}>
        <ContactExplorer contacts={campaign.contacts} />
      </ContactModal>
    </div>
  );
};

export default ContactPreview;
