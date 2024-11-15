import {
  news,
  profile,
  friends,
  notifications,
  settings,
} from "../../../assets";

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
    url: "/",
    startImg: friends,
    id: 2,
  },
  {
    title: "Уведомления",
    url: "/",
    startImg: notifications,
    id: 3,
  },
  {
    title: "Настройки",
    url: "/",
    startImg: settings,
    id: 4,
  },
];
