import NavLink from "../../ui/NavLink";
import {
  friends,
  news,
  notifications,
  profile,
  settings,
} from "../../../assets";

const Navbar = () => {
  return (
    <div className="bg-[#2A2A2A] max-w-80 h-screen px-8 pb-8 pt-[116px] max-[1024px]:px-4 max-[1024px]:max-w-60">
      {/* NavBar задается тегом nav, а в нем я обычно пишу span. в общем тег ul и li нужно поменять */}
      <ul>
        {/* чтобы не плодить кучу одинакового кода создаешь массив links, создаешь тип INavLink со свойствами title, url, startImg
        и потом просто выводить все ссылки через links.map */}
        {/* если закрывающийся тег не нужен, то можно просто писать <NavLink /> */}
        {/* чтобы не писать mb-6 в каждом элементе, можешь просто у родительского элемента задать flex и сделать gap */}
        <li className="mb-6">
          <NavLink title={"Новости"} url={"./url"} startImg={news}></NavLink>
        </li>
        <li className="mb-6">
          <NavLink title={"Профиль"} url={"./url"} startImg={profile}></NavLink>
        </li>
        <li className="mb-6">
          <NavLink
            title={"Подписчики"}
            url={"./url"}
            startImg={friends}
          ></NavLink>
        </li>
        <li className="mb-6">
          <NavLink
            title={"Уведомления"}
            url={"./url"}
            startImg={notifications}
          ></NavLink>
        </li>
        <li className="mb-6">
          <NavLink
            title={"Настройки"}
            url={"./url"}
            startImg={settings}
          ></NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
