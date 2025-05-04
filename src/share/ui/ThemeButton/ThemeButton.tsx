import { useTheme } from "next-themes";
import { Switch as SwitchUI } from "@nextui-org/react";
import { SunIcon, MoonIcon, MoonIconMobile, SunIconMobile } from "./Icons";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [isSelect, setSelect] = useState(theme === "dark");

  useEffect(() => {
    if (!isSelect) setTheme("light");
    else setTheme("dark");
  }, [isSelect, setTheme]);
  return (
    <>
      <div className="max-[900px]:hidden">
        <SwitchUI
          defaultSelected
          color="default"
          size="lg"
          isSelected={isSelect}
          onValueChange={setSelect}
          classNames={{ wrapper: "bg-white" }}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <MoonIcon className={className} />
            ) : (
              <SunIcon className={className} />
            )
          }
        />
      </div>
      <Button
        className="p-3 min-w-0 rounded-full w-10 h-10 flex-col items-center justify-center bg-[#eeeeee] dark:bg-[#272727] hidden max-[900px]:flex"
        onClick={() => setSelect(!isSelect)}
      >
        {theme === "light" && <MoonIconMobile />}
        {theme === "dark" && <SunIconMobile />}
      </Button>
    </>
  );
};

export default ThemeButton;
