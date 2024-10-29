import { useTheme } from "next-themes";
import { darkThemeIco, lightThemeIco } from "../../../assets";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {theme == "dark" && (
        <img src={lightThemeIco} onClick={() => setTheme("light")} />
      )}
      {theme == "light" && (
        <img src={darkThemeIco} onClick={() => setTheme("dark")} />
      )}
    </>
  );
};

export default ThemeButton;
