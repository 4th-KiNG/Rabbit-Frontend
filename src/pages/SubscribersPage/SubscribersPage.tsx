import { useEffect, useState } from "react";
import { Button } from "../../share";
import { useUser } from "../../lib/hooks/useUser";
import { useProfile } from "../../lib/hooks/useProfile";
import { useNavigate } from "react-router-dom";

interface IPerson {
  userId: string;
  myId: string;
}

const Person = (person: IPerson) => {
  const { userId, myId } = person;
  const { userData, avatar, subToUser, unSubToUser } = useUser(userId);
  const nav = useNavigate();
  if (!userData) return;

  const { username, subscribersId } = userData;

  return (
    <div className="flex items-center flex-wrap bg-transparent border-[#E3E3E3] dark:border-[#404040] border-3 rounded-[32px] p-3 max-[500px]:p-2 max-[500px]:border-1">
      <div
        className="flex gap-5 items-center cursor-pointer flex-1 max-[500px]:gap-3"
        onClick={() => nav(`/user/${userId}`)}
      >
        <img
          src={avatar}
          alt=""
          className="w-12 h-12 max-[500px]:w-10 max-[500px]:h-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold max-[500px]:text-base">
            {username}
          </h3>
          <p className="text-sm font-thin min-w-max max-[500px]:text-[12px]">
            {subscribersId ? subscribersId.length : 0} подписчиков
          </p>
        </div>
      </div>

      {subscribersId && subscribersId.includes(myId) && (
        <Button
          className="rounded-full bg-[#E3E3E3] dark:bg-[#404040] max-[500px]:min-w-10 max-[500px]:h-10"
          onClick={() => {
            unSubToUser();
          }}
        >
          <p className="max-[500px]:hidden">Отписаться</p>
          <p className="hidden max-[500px]:block">-</p>
        </Button>
      )}
      {(!subscribersId || !subscribersId.includes(myId)) && (
        <Button
          className="rounded-full bg-[#CE3333] text-white max-[500px]:min-w-10 max-[500px]:h-10"
          onClick={() => {
            subToUser();
          }}
        >
          <p className="max-[500px]:hidden">Подписаться</p>
          <p className="hidden max-[500px]:block">+</p>
        </Button>
      )}
    </div>
  );
};

const SubscribersPage = () => {
  const [status, setStatus] = useState<"subscribers" | "subscriptions">(
    (localStorage.getItem("subsPageStatus") as
      | "subscribers"
      | "subscriptions") ?? "subscribers"
  );
  const { user, refetchUserInfo } = useProfile();

  useEffect(() => {
    refetchUserInfo();
    localStorage.setItem("subsPageStatus", status);
  }, [status, refetchUserInfo]);

  if (!user) return;

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <Button
            className={`rounded-full ${
              status === "subscribers"
                ? "bg-[#CE3333] text-white"
                : "bg-[#E3E3E3] dark:bg-[#404040]"
            } text-base`}
            onClick={() => setStatus("subscribers")}
          >
            <p className="text-md max-[500px]:text-sm">Подписчики</p>
          </Button>
          <Button
            className={`rounded-full ${
              status === "subscriptions"
                ? "bg-[#CE3333] text-white"
                : "bg-[#E3E3E3] dark:bg-[#404040]"
            } text-base`}
            onClick={() => setStatus("subscriptions")}
          >
            <p className="text-md max-[500px]:text-sm">Подписки</p>
          </Button>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {status === "subscribers" &&
            user.subscribersId &&
            user.subscribersId.map((userId) => (
              <Person key={userId} userId={userId} myId={user.id} />
            ))}
          {status === "subscriptions" &&
            user.subscriptionsId &&
            user.subscriptionsId.map((userId) => (
              <Person key={userId} userId={userId} myId={user.id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default SubscribersPage;
