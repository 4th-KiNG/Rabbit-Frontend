import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ChangeAvatar,
  ChangeBanner,
  GetAvatar,
  GetBanner,
  GetUserInfo,
} from "../api/user/userApi";
import { UserData } from "../../types/user.types";

export const useProfile = () => {
  const { data: user, refetch: refetchUserInfo } = useQuery<UserData>({
    queryKey: ["user"],
    queryFn: () => GetUserInfo(localStorage.getItem("access_token") ?? ""),
    enabled: !!localStorage.getItem("access_token"),
    retry: 0,
    staleTime: 0,
  });

  const { data: profileAvatar, refetch: refetchProfileAvatar } = useQuery({
    queryKey: ["avatar"],
    queryFn: () => GetAvatar(user ? user.id : ""),
    enabled: !!localStorage.getItem("access_token") && !!user,
  });

  const { data: profileBanner, refetch: refectProfileBanner } = useQuery({
    queryKey: ["banner"],
    queryFn: () => GetBanner(user ? user.id : ""),
    enabled: !!localStorage.getItem("access_token") && !!user,
  });

  const { mutate: changeAvatar } = useMutation({
    mutationKey: ["changeAvatar"],
    mutationFn: (newAvatar: File) => ChangeAvatar(newAvatar),
    onSuccess: () => {
      setTimeout(() => {
        refetchProfileAvatar();
      }, 100);
    },
  });

  const { mutate: changeBanner } = useMutation({
    mutationKey: ["changeBanner"],
    mutationFn: (newBanner: File) => ChangeBanner(newBanner),
    onSuccess: () => {
      setTimeout(() => {
        refectProfileBanner();
      }, 100);
    },
  });

  return {
    profileAvatar,
    profileBanner,
    user,
    refetchUserInfo,
    changeAvatar,
    changeBanner,
    refetchProfileAvatar,
    refectProfileBanner,
  };
};
