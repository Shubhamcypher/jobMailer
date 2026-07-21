import { useMemo, useState } from 'react';
import { Search, Mail, Building2 } from 'lucide-react';

const ContactExplorer = ({ contacts }) => {
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);

  const filteredContacts = useMemo(() => {
    if (!search.trim()) {
      return contacts;
    }

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.company.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [contacts, search]);

  const displayedContacts = search ? filteredContacts : filteredContacts.slice(0, visibleCount);

  const handleScroll = (e) => {
    if (search) return;

    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollHeight - scrollTop - clientHeight < 100) {
      setVisibleCount((prev) => Math.min(prev + 20, filteredContacts.length));
    }
  };

  return (
    <div className='h-full flex flex-col'>
      {/* Search */}

      <div className='p-6 border-b border-slate-200 dark:border-slate-700'>
        <div className='relative'>
          <Search size={18} className='absolute left-4 top-3.5 text-slate-400' />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search contacts...'
            className='
              w-full
              pl-11
              pr-4
              py-3
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

      {/* Table */}

      <div onScroll={handleScroll} className='flex-1 overflow-y-auto'>
        <table className='min-w-full'>
          <thead className='sticky top-0 bg-slate-100 dark:bg-slate-800 z-10'>
            <tr>
              <th className='px-6 py-4 text-left'>Contact</th>

              <th className='px-6 py-4 text-left'>Company</th>

              <th className='px-6 py-4 text-left'>Email</th>
            </tr>
          </thead>

          <tbody>
            {displayedContacts.map((contact) => (
              <tr
                key={contact.id}
                className='
                  border-t
                  border-slate-200
                  dark:border-slate-700
                  hover:bg-slate-50
                  dark:hover:bg-slate-800/60
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
                      <p className='font-semibold dark:text-white'>{contact.name}</p>

                      <p className='text-xs text-slate-500'>{contact.title}</p>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-4'>
                  <div className='flex items-center gap-2'>
                    <Building2 size={17} className='text-purple-600' />

                    <span className='dark:text-slate-300'>{contact.company}</span>
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

        {!search && visibleCount < filteredContacts.length && (
          <div className='py-6 text-center text-slate-500'>Loading more contacts...</div>
        )}

        {!search && visibleCount >= filteredContacts.length && (
          <div className='py-6 text-center text-green-600 font-medium'>
            Showing all {filteredContacts.length} contacts
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactExplorer;
