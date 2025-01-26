import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeAvatar, ChangeBanner, GetUserInfo } from "../api/user/userApi";
import { UserData } from "../../types/user.types";
import { AVATARS_STORAGE, BANNERS_STORAGE } from "../../constants/storage";
import { GetImage } from "../../utils/images.utils";
import { useMemo } from "react";

export const useProfile = () => {
  const { data: user, refetch: refetchUserInfo } = useQuery<UserData>({
    queryKey: ["user"],
    queryFn: () => GetUserInfo(localStorage.getItem("access_token") ?? ""),
    enabled: !!localStorage.getItem("access_token"),
    retry: 0,
    staleTime: 0,
  });

  const { mutate: changeAvatar } = useMutation({
    mutationKey: ["changeAvatar"],
    mutationFn: (newAvatar: File) => ChangeAvatar(newAvatar),
    onSuccess: () => setTimeout(() => refetchUserInfo(), 200),
  });

  const { mutate: changeBanner } = useMutation({
    mutationKey: ["changeBanner"],
    mutationFn: (newBanner: File) => ChangeBanner(newBanner),
    onSuccess: () => setTimeout(() => refetchUserInfo(), 200),
  });

  const avatar = useMemo(
    () => GetImage(AVATARS_STORAGE, user?.avatar ?? "default-avatar.png"),
    [user?.avatar]
  );

  const banner = useMemo(
    () => GetImage(BANNERS_STORAGE, user?.banner ?? "default-banner.png"),
    [user?.banner]
  );

  return {
    user,
    avatar,
    banner,
    refetchUserInfo,
    changeAvatar,
    changeBanner,
  };
};
