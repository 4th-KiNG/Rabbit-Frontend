import { news, profile, friends, settings } from "../../../assets";

export const links = [
  {
    title: "Новости",
    url: "/",
    startImg: news,
    id: 0,
  },
  {
    title: "Профиль",
    url: "/profile",
    startImg: profile,
    id: 1,
  },
  {
    title: "Подписчики",
    url: "/subscribers",
    startImg: friends,
    id: 2,
  },
  {
    title: "Настройки",
    url: "/settings",
    startImg: settings,
    id: 3,
  },
];
