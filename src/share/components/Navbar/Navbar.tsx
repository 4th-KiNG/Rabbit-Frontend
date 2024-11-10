import NavLink from "../../ui/NavLink";
import { friends, news, notifications, profile, settings } from "../../../assets";

const Navbar = () => {
  return (
    <div className="bg-[#2A2A2A] max-w-80 h-screen px-8 pb-8 pt-[116px] max-[1024px]:px-4 max-[1024px]:max-w-60">
      <ul>
        <li className="mb-6"><NavLink title={'Новости'} url={'./url'} startImg={news}></NavLink></li>
        <li className="mb-6"><NavLink title={'Профиль'} url={'./url'} startImg={profile}></NavLink></li>
        <li className="mb-6"><NavLink title={'Подписчики'} url={'./url'} startImg={friends}></NavLink></li>
        <li className="mb-6"><NavLink title={'Уведомления'} url={'./url'} startImg={notifications}></NavLink></li>
        <li className="mb-6"><NavLink title={'Настройки'} url={'./url'} startImg={settings}></NavLink></li>
    </ul>
    </div>
  );
};

export default Navbar;
