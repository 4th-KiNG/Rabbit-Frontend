import { exitIco, logo, notifications, search } from "../../../assets";
import { RabbitTitle, Input } from "../..";
import { useAuth } from "../../../lib/hooks/useAuth";
import { useProfile } from "../../../lib/hooks/useProfile";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { signOut } = useAuth();
  const { user, profileAvatar } = useProfile();
  const nav = useNavigate();
  return (
    <>
      <header className="bg-[#181717] w-full h-20 max-[900px]:h-16 flex items-center px-10 max-[900px]:px-4 justify-between">
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={() => nav("/")}
        >
          <img src={logo} className="max-[900px]:h-10" alt="logo" />
          <RabbitTitle />
        </div>
        <div className="flex gap-6 items-center min-w-[400px] max-[900px]:hidden">
          <Input
            type="search"
            label="Поиск"
            startImage={<img src={search} className="mr-2 w-6" />}
          />
          <img src={notifications} className="w-6" />
        </div>

        <div className="flex items-center gap-6">
          <div
            className="flex gap-4 items-center cursor-pointer"
            onClick={() => nav("/profile")}
          >
            <span className="text-xl max-[900px]:hidden">{user?.username}</span>
            <img
              src={profileAvatar}
              className="w-14 max-[900px]:w-9 object-cover h-14 max-[900px]:h-9 rounded-full"
              alt=""
            />
          </div>
          <div
            className="bg-gray-700 rounded-full p-3"
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
