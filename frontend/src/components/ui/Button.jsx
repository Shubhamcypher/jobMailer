const Button = ({
    children,
    loading = false,
    className = "",
    ...props
}) => {

    return (

        <button

            {...props}

            className={`
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-medium
                py-3
                rounded-xl
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}

        >

            {

                loading ?

                "Please wait..."

                :

                children

            }

        </button>

    );

};

export default Button;