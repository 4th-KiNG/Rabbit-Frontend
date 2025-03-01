import { exitIco, logo, notifications, search, searchBlack } from "../../../assets";
import { RabbitTitle, Input, Image, Button, ThemeButton } from "../..";
import { useAuth } from "../../../lib/hooks/useAuth";
import { useProfile } from "../../../lib/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

const Header = () => {
  const { signOut } = useAuth();
  const { user, avatar } = useProfile();
  const nav = useNavigate();
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
          <Input
            type="search"
            label="Поиск"
            startImage={<img src={theme == "light" ? search : searchBlack} className="mr-2 w-6" />}
          />
          <Button className="p-3 bg-transparent min-w-0 rounded-full w-13 h-13">
            <Image url={notifications} className="w-full h-full" />
          </Button>
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
          <ThemeButton />
          {/* <div
            className="bg-[#272727] rounded-full p-3 cursor-pointer"
            onClick={() => signOut()}
          >
            <img src={exitIco} className="w-8 max-[900px]:w-4" alt="" />
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
