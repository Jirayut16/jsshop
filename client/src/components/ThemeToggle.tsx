import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "./ThemeContext";
interface ThemeContext {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme() as ThemeContext;

  return (
    <>
      <button onClick={toggleTheme}>
        {theme === "dark" ? (
          <MdDarkMode className="text-3xl text-amber-400 hover:scale-110  hover:text-orange-400 cursor-pointer" />
        ) : (
          <MdLightMode className="text-3xl hover:scale-110  cursor-pointer" />
        )}
      </button>
    </>
  );
};
export default ThemeToggle;
