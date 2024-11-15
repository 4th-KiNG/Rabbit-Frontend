import NavLink from "../../ui/NavLink/NavLink";
import {
  friends,
  news,
  notifications,
  profile,
  settings,
} from "../../../assets";
import { INavLink } from "../../ui/NavLink/NavLink.types"

const Navbar = () => {

  const links = [
    {
      title: 'Новости',
      url: './url',
      startImg: news,
      id: 0,
    },
    {
      title: 'Профиль',
      url: './url',
      startImg: profile,
      id: 1,
    },
    {
      title: 'Подписчики',
      url: './url',
      startImg: friends,
      id: 2,
    },
    {
      title: 'Уведомления',
      url: './url',
      startImg: notifications,
      id: 3,
    },
    {
      title: 'Настройки',
      url: './url',
      startImg: settings,
      id: 4,
    },
  ];

  return (
    <>
      {/* чтобы не писать px-8 pb-8 pt-[116px] можешь написать p-8 pt-[116px] +*/}
      <div className="bg-[#2A2A2A] max-w-80 h-screen  p-8 pt-[116px]">
        {/* NavBar задается тегом nav, а в нем я обычно пишу span. в общем тег ul и li нужно поменять +*/}
        <nav className="flex gap-6 flex-col">
          {/* чтобы не плодить кучу одинакового кода создаешь массив links, создаешь тип INavLink со свойствами title, url, startImg
        и потом просто выводить все ссылки через links.map +*/}
          {/* если закрывающийся тег не нужен, то можно просто писать <NavLink /> +*/}
          {/* чтобы не писать mb-6 в каждом элементе, можешь просто у родительского элемента задать flex и сделать gap +*/}
          {links.map((props: INavLink) => {
            const {title, url, startImg} = props;
            return <span><NavLink title={title} url={url} startImg={startImg} /></span>
          })}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
