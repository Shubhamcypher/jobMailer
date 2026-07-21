const Card = ({ title, children, className = "" }) => {
    return (
        <div
            className={`
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-gray-200
                p-6
                ${className}
            `}
        >
            {title && (
                <h2 className="text-xl font-semibold mb-5 text-gray-800">
                    {title}
                </h2>
            )}

            {children}
        </div>
    );
};

export default Card;