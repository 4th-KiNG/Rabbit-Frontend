import { useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import { Post, ProfileBanner, UserInfo } from "../../share";
import { useUser } from "../../lib/hooks/useUser";
import { SectionButtonsTypes } from "../ProfilePage/ProfilePage.types";
import { useParams } from "react-router-dom";
import usePosts from "../../lib/hooks/usePosts";
import { useProfile } from "../../lib/hooks/useProfile";

const sectionButtons: SectionButtonsTypes[] = [
  { label: "Посты" },
  { label: "Комментарии" },
];

const UserPage = () => {
  const { id } = useParams();

  const { userData, avatar, banner, subToUser, unSubToUser } = useUser(
    id ?? ""
  );
  const { user } = useProfile();
  const { posts } = usePosts(userData?.id);

  const [section, setSection] = useState<"Посты" | "Комментарии">("Посты");

  const isSub = useMemo((): boolean => {
    return (
      !!userData?.subscribersId &&
      !!user?.id &&
      userData.subscribersId.includes(user.id)
    );
  }, [userData, user]);

  const userInfo = [
    {
      title: "подписчики",
      data: userData?.subscribersId?.length ?? 0,
    },
    {
      title: "подписки",
      data: userData?.subscriptionsId?.length ?? 0,
    },
    {
      title: "посты",
      data: posts?.length ?? 0,
    },
    {
      title: "комментарии",
      data: 0,
    },
  ];

  return (
    <>
      <div className="relative z-0 max-[900px]:w-full">
        <ProfileBanner banner={banner} />
        <div className="grid grid-cols-[1fr_320px] gap-6 max-[1300px]:flex">
          <div className="-mt-8 flex flex-col gap-6 max-[1300px]:w-full">
            <UserInfo
              username={userData?.username ?? ""}
              userId={userData?.id ?? ""}
              userAvatar={avatar}
            />
            <div className="hidden max-[1300px]:flex w-full justify-around bg-[#272727] py-3 rounded-xl">
              {userInfo.map((info, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-base font-bold">{info.data}</p>
                  <p className="text-sm font-normal">{info.title}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 max-[900px]:flex-wrap">
              {sectionButtons.map((btn, index) => (
                <div key={index}>
                  <Button
                    className={`rounded-full text-xl max-[1500px]:text-medium max-[500px]:text-sm font-normal text-black dark:text-white px-10 max-[1500px]:px-6 max-[500px]:px-4 py-4 max-[1500px]:py-3 h-max ${
                      btn.label === section ? "bg-[#404040]" : "bg-[#272727]"
                    }`}
                    onClick={() => setSection(btn.label)}
                  >
                    {btn.label}
                  </Button>
                </div>
              ))}
            </div>
            {section === "Посты" && posts && (
              <div className="flex flex-col gap-8 max-[500px]:gap-3">
                {posts.map((post) => (
                  <Post {...post} />
                ))}
              </div>
            )}
          </div>
          <div>
            <Button
              className={`mt-6 w-full rounded-full text-xl max-[1500px]:text-medium max-[500px]:text-sm font-normal ${
                isSub ? "bg-[#404040]" : "bg-[#CE3333]"
              } text-black dark:text-white px-10 max-[1500px]:px-6 max-[500px]:px-4 py-4 max-[1500px]:py-3 h-max`}
              onClick={() => {
                if (!isSub) subToUser();
                else unSubToUser();
              }}
            >
              {isSub ? "Отписаться" : "Подписаться"}
            </Button>
            <div className="p-6 bg-[#404040] mt-6 rounded-3xl max-[1500px]:p-5 max-[1300px]:hidden">
              <p className="text-3xl max-[1500px]:text-2xl font-bold text-black dark:text-white">
                {userData?.username}
              </p>
              <div className="grid grid-cols-[1fr_1fr] mt-5 gap-y-2 text-black dark:text-white">
                {userInfo.map((info, index) => (
                  <div key={index}>
                    <p className="text-xl max-[1500px]:text-lg font-bold">
                      {info.data}
                    </p>
                    <p className="text-base max-[1500px]:text-sm font-normal">
                      {info.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
