import { exitIco, logo, search } from "../../../assets";
import { RabbitTitle, Image } from "../..";
import { useAuth } from "../../../lib/hooks/useAuth";
import { useProfile } from "../../../lib/hooks/useProfile";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { Input as InputUI } from "@nextui-org/react";
import { isMobile } from "../../../utils/styles.utils";
import { useDebouncedCallback } from "use-debounce";

const Header = () => {
  const { signOut } = useAuth();
  const { user, avatar } = useProfile();
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

  return (
    <>
      <header className="bg-[#181717] w-full h-20 max-[900px]:h-16 flex items-center px-10 max-[900px]:px-4 justify-between">
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
            startContent={<img src={search} className="mr-2 w-6" />}
            value={searchString}
            onChange={handleSetSearchString}
          />
        </div>

        <div className="flex items-center gap-6">
          <div
            className="flex gap-4 items-center cursor-pointer"
            onClick={() => nav("/profile")}
          >
            <span className="text-xl max-[900px]:hidden">{user?.username}</span>
            <Image
              url={avatar}
              className="w-14 max-[900px]:w-9 object-cover h-14 max-[900px]:h-9 rounded-full"
            />
          </div>
          <div
            className="bg-[#272727] rounded-full p-3 cursor-pointer"
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
