import { useTheme } from "next-themes";
import { darkThemeIco, lightThemeIco } from "../../../assets";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {theme == "dark" && (
        <img
          src={lightThemeIco}
          className="max-[700px]:w-[40px]"
          onClick={() => setTheme("light")}
        />
      )}
      {theme == "light" && (
        <img
          src={darkThemeIco}
          className="max-[700px]:w-[40px]"
          onClick={() => setTheme("dark")}
        />
      )}
    </>
  );
};

export default ThemeButton;
