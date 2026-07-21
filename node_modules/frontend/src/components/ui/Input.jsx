const Input = ({ className = "", ...props }) => {

    return (

        <input

            {...props}

            className={`
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                ${className}
            `}

        />

    );

};

export default Input;