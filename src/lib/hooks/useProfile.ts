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
  });

  const { data: profileAvatar, refetch: refectProfileAvatar } = useQuery({
    queryKey: ["avatar"],
    queryFn: () =>
      GetAvatar(
        localStorage.getItem("access_token") ?? "",
        user ? user.id : ""
      ),
    enabled: !!localStorage.getItem("access_token") && !!user,
  });

  const { data: profileBanner, refetch: refectProfileBanner } = useQuery({
    queryKey: ["banner"],
    queryFn: () =>
      GetBanner(
        localStorage.getItem("access_token") ?? "",
        user ? user.id : ""
      ),
    enabled: !!localStorage.getItem("access_token") && !!user,
  });

  const { mutate: changeAvatar } = useMutation({
    mutationKey: ["changeAvatar"],
    mutationFn: (newAvatar: File) =>
      ChangeAvatar(newAvatar, localStorage.getItem("access_token") ?? ""),
    onSuccess: () => {
      setTimeout(() => {
        refectProfileAvatar();
      }, 100);
    },
  });

  const { mutate: changeBanner } = useMutation({
    mutationKey: ["changeBanner"],
    mutationFn: (newBanner: File) =>
      ChangeBanner(newBanner, localStorage.getItem("access_token") ?? ""),
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
    refectProfileAvatar,
    refectProfileBanner,
  };
};
