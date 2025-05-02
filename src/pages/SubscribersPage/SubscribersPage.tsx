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
    <div className="flex items-center bg-transparent border-[#404040] border-3 rounded-[32px] p-3">
      <div
        className="flex gap-5 items-center cursor-pointer flex-1"
        onClick={() => nav(`/user/${userId}`)}
      >
        <img src={avatar} alt="" className="w-12 h-12 rounded-full" />
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{username}</h3>
          <p className="text-sm font-thin">
            {subscribersId ? subscribersId.length : 0} подписчиков
          </p>
        </div>
      </div>

      {subscribersId && subscribersId.includes(myId) && (
        <Button
          className="rounded-full bg-[#404040]"
          onClick={() => {
            unSubToUser();
          }}
        >
          <p>Отписаться</p>
        </Button>
      )}
      {(!subscribersId || !subscribersId.includes(myId)) && (
        <Button
          className="rounded-full bg-[#CE3333]"
          onClick={() => {
            subToUser();
          }}
        >
          <p>Подписаться</p>
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
              status === "subscribers" ? "bg-[#CE3333]" : "bg-[#404040]"
            } text-base`}
            onClick={() => setStatus("subscribers")}
          >
            <p>Подписчики</p>
          </Button>
          <Button
            className={`rounded-full ${
              status === "subscriptions" ? "bg-[#CE3333]" : "bg-[#404040]"
            } text-base`}
            onClick={() => setStatus("subscriptions")}
          >
            <p>Подписки</p>
          </Button>
        </div>
        <div>
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
