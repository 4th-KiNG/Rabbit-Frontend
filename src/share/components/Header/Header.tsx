import { exitIco, logo, search, searchBlack } from "../../../assets";
import { RabbitTitle, Image, ThemeButton } from "../..";
import { useProfile } from "../../../lib/hooks/useProfile";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { Input as InputUI } from "@nextui-org/react";
import { isMobile } from "../../../utils/styles.utils";
import { useDebouncedCallback } from "use-debounce";
import { useTheme } from "next-themes";
import { useAuth } from "../../../lib/hooks/useAuth";

const Header = () => {
  const { user, avatar } = useProfile();
  const { signOut } = useAuth();
  const [searchString, setSearchString] = useState<string>();
  const [, setSearchParams] = useSearchParams();
  const nav = useNavigate();
  const location = useLocation();

  const handleSetSearchString = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setSearchString(e.target.value);
    }
  };

  const debounceSearchString = useDebouncedCallback((value) => {
    if (value) {
      setSearchParams((params) => {
        params.set("search_string", value);
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.delete("search_string");
        return params;
      });
    }
  }, 1000);

  useEffect(() => {
    debounceSearchString(searchString);
  }, [searchString, debounceSearchString, location.pathname]);
  const { theme } = useTheme();

  return (
    <>
      <header className="w-full h-20 max-[900px]:h-16 flex items-center px-10 max-[900px]:px-4 justify-between bg-[#E3E3E3] dark:bg-[#181717]">
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={() => nav("/")}
        >
          <Image url={logo} className="h-11 w-10 max-[900px]:h-10" />
          <RabbitTitle />
        </div>
        <div className="flex gap-6 items-center min-w-[400px] max-[900px]:hidden">
          <InputUI
            size={`${isMobile() ? "md" : "lg"}`}
            placeholder={"Поиск"}
            style={{ fontSize: `${isMobile() ? "14px" : "16px"}` }}
            type={"search"}
            radius="full"
            startContent={
              <img
                src={theme == "light" ? search : searchBlack}
                className="mr-2 w-6"
              />
            }
            value={searchString}
            onChange={handleSetSearchString}
          />
        </div>

        <div className="flex items-center gap-5 max-[500px]:gap-2">
          <div className="hidden max-[900px]:block">
            <ThemeButton />
          </div>
          <div
            className="flex gap-4 items-center cursor-pointer"
            onClick={() => nav("/profile")}
          >
            <span className="text-xl max-[900px]:hidden">{user?.username}</span>
            <Image
              url={avatar}
              className="w-14 max-[900px]:w-10 object-cover h-14 max-[900px]:h-10 rounded-full"
            />
          </div>
          <div
            className="bg-[#eeeeee] dark:bg-[#272727] rounded-full p-3 cursor-pointer flex items-center justify-center"
            onClick={() => signOut()}
          >
            <img src={exitIco} className="w-8 max-[900px]:w-4" alt="" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
