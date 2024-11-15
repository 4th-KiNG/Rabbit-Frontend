import { useRef } from "react";
import { changeAvatarIco } from "../../../assets";
import { UserInfoProps } from "./UserInfo.types";
import { Image } from "../../";
import { useProfile } from "../../../lib/hooks/useProfile";

const UserInfo = (props: UserInfoProps) => {
  const { username, userAvatar } = props;
  const changeAvatarRef = useRef<HTMLInputElement>(null);
  const { changeAvatar } = useProfile();

  const handleAvatarChange = () => {
    if (changeAvatarRef.current?.files) {
      changeAvatar(changeAvatarRef.current.files[0]);
    }
  };

  return (
    <>
      <div className="flex items-center gap-5 relative ml-5 max-[900px]:ml-1">
        <div onClick={() => changeAvatarRef.current?.click()}>
          <Image
            url={userAvatar ?? ""}
            className="w-[108px] h-[108px] max-[900px]:w-20 max-[900px]:h-20 rounded-full object-cover relative z-0"
          />
          <img
            src={changeAvatarIco}
            className="absolute bottom-0 left-0 z-10"
            alt=""
          />
        </div>
        <p className="text-3xl font-bold">{username}</p>

        <input
          type="file"
          ref={changeAvatarRef}
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>
    </>
  );
};

export default UserInfo;
