import { X, Users } from "lucide-react";

const ContactModal = ({ open, onClose, children, total }) => {

    if (!open) return null;

    return (

        <div
            className="
            fixed
            inset-0
            z-50
            bg-black/50
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-6
        "
        >

            <div
                className="
                w-full
                max-w-7xl
                h-[90vh]
                bg-white
                dark:bg-slate-900
                rounded-3xl
                shadow-2xl
                border
                border-slate-200
                dark:border-slate-700
                flex
                flex-col
                overflow-hidden
            "
            >

                {/* Header */}

                <div
                    className="
                    flex
                    justify-between
                    items-center
                    px-8
                    py-5
                    border-b
                    border-slate-200
                    dark:border-slate-700
                "
                >

                    <div className="flex items-center gap-4">

                        <div
                            className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-linear-to-br
                            from-indigo-500
                            to-purple-600
                            flex
                            items-center
                            justify-center
                        "
                        >

                            <Users
                                className="text-white"
                                size={28}
                            />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold dark:text-white">

                                Contact Explorer

                            </h2>

                            <p className="text-slate-500 dark:text-slate-400">

                                {total} Imported Contacts

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="
                        w-11
                        h-11
                        rounded-xl
                        bg-slate-100
                        dark:bg-slate-800
                        hover:bg-red-500
                        hover:text-white
                        transition
                        cursor-pointer
                    "

                    >

                        <X className="mx-auto" />

                    </button>

                </div>

                {/* Body */}

                <div className="flex-1 overflow-hidden">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default ContactModal;