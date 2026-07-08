import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";

const ContactPreview = ({ campaign }) => {

    const [search, setSearch] = useState("");

    const filteredContacts = useMemo(() => {

        if (!search.trim()) {
            return campaign.contacts.slice(0, 10);
        }

        return campaign.contacts.filter(contact =>
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.company.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase())
        );

    }, [campaign.contacts, search]);

    return (

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div className="flex items-center gap-3">

                    <div className="p-3 rounded-xl bg-indigo-100">

                        <Users
                            className="text-indigo-600"
                            size={24}
                        />

                    </div>

                    <div>

                        <h2 className="text-xl font-bold text-slate-800">
                            Contact Preview
                        </h2>

                        <p className="text-sm text-slate-500">

                            {campaign.total} Contacts Available

                        </p>

                    </div>

                </div>

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-slate-400"
                    />

                    <input

                        type="text"

                        placeholder="Search..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="
                            pl-10
                            pr-4
                            py-2.5
                            border
                            rounded-xl
                            border-slate-300
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "

                    />

                </div>

            </div>

            {

                campaign.contacts.length === 0 ?

                    (

                        <div className="text-center py-16">

                            <Users
                                size={60}
                                className="mx-auto text-slate-300 mb-4"
                            />

                            <h3 className="text-lg font-semibold text-slate-600">

                                No Contacts Uploaded

                            </h3>

                            <p className="text-slate-400 mt-2">

                                Upload an Excel file to preview contacts.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="overflow-x-auto rounded-xl border">

                            <table className="min-w-full">

                                <thead className="bg-slate-100 sticky top-0">

                                    <tr>

                                        <th className="px-5 py-4 text-left font-semibold">
                                            Name
                                        </th>

                                        <th className="px-5 py-4 text-left font-semibold">
                                            Company
                                        </th>

                                        <th className="px-5 py-4 text-left font-semibold">
                                            Email
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredContacts.map(contact => (

                                            <tr
                                                key={contact.id}
                                                className="
                                                    border-t
                                                    hover:bg-blue-50
                                                    transition
                                                "
                                            >

                                                <td className="px-5 py-4 font-medium">

                                                    {contact.name}

                                                </td>

                                                <td className="px-5 py-4 text-slate-600">

                                                    {contact.company}

                                                </td>

                                                <td className="px-5 py-4 text-blue-600">

                                                    {contact.email}

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    )

            }

        </div>

    );

};

export default ContactPreview;