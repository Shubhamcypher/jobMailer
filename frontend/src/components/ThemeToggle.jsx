import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {

    const { theme, toggleTheme } = useTheme();

    return (

        <button
            onClick={toggleTheme}
            className="
                w-12
                h-12
                rounded-full
                bg-white
                dark:bg-slate-800
                dark:text-white
                shadow-lg
                border
                border-slate-200
                dark:border-slate-700
                flex
                items-center
                justify-center
                transition-all
                duration-300
                hover:scale-105
            "
        >

            {
                theme === "light"
                    ? <Moon size={20} />
                    : <Sun size={20} />
            }

        </button>

    );

};

export default ThemeToggle;