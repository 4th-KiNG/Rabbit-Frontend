import { useProfile } from "../../lib/hooks/useProfile";
import { bg } from "../../assets";
import { Button, Image, UserInfo } from "../../share";
import { useState } from "react";
import { SectionButtonsTypes } from "./ProfilePage.types";

const sectionButtons: SectionButtonsTypes[] = [
  { label: "Посты" },
  { label: "Комментарии" },
  { label: "Личные данные" },
];

const ProfilePage = () => {
  const { user, profileAvatar } = useProfile();
  const [section, setSection] = useState<
    "Посты" | "Комментарии" | "Личные данные"
  >("Посты");

  const userInfo = [
    {
      title: "подписчики",
      data: user?.subscribersId?.length ?? 0,
    },
    {
      title: "посты",
      data: user?.postsId?.length ?? 0,
    },
    {
      title: "комментарии",
      data: user?.commentsId?.length ?? 0,
    },
  ];

  return (
    <>
      <div className="px-20 py-6">
        <Image
          url={bg}
          className="w-[100%] max-h-36 object-cover rounded-t-3xl"
        />
        <div className="grid grid-cols-[1fr_320px]">
          <div className="-mt-8 ml-5 flex flex-col gap-6">
            <UserInfo
              username={user?.username ?? ""}
              userId={user?.id ?? ""}
              userAvatar={profileAvatar}
            />
            <div className="flex gap-3">
              {sectionButtons.map((btn, index) => (
                <>
                  <Button
                    label={btn.label}
                    className={`rounded-full text-xl font-normal px-10 py-4 h-max ${
                      btn.label === section ? "bg-[#404040]" : "bg-[#272727]"
                    }`}
                    key={index}
                    onClick={() => setSection(btn.label)}
                  />
                </>
              ))}
            </div>
          </div>
          <div className="p-6 bg-[#404040] mt-6 rounded-3xl">
            <p className="text-3xl font-bold">{user?.username}</p>
            <div className="grid grid-cols-[1fr_1fr] mt-5 gap-y-2">
              {userInfo.map((info, index) => (
                <>
                  <div key={index}>
                    <p className="text-xl font-bold">{info.data}</p>
                    <p className="text-base font-normal">{info.title}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
