import { useQuery } from "@tanstack/react-query";
import { GetByUserId } from "../api/user/userApi";
import { UserData } from "../../types/user.types";
import { useMemo } from "react";
import { GetImage } from "../../utils/images.utils";
import { AVATARS_STORAGE, BANNERS_STORAGE } from "../../constants/storage";

export const useUser = (userId: string) => {
  const { data: userData } = useQuery<UserData>({
    queryKey: [`${userId} info`],
    queryFn: () => GetByUserId(userId),
  });

  const avatar = useMemo(
    () => GetImage(AVATARS_STORAGE, userData?.avatar ?? "default-avatar.png"),
    [userData?.avatar]
  );

  const banner = useMemo(
    () => GetImage(BANNERS_STORAGE, userData?.banner ?? "default-banner.png"),
    [userData?.banner]
  );

  return {
    userData,
    avatar,
    banner,
  };
};
