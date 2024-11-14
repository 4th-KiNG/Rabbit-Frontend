import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ChangeAvatar,
  GetProfileAvatar,
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
    queryFn: () => GetProfileAvatar(localStorage.getItem("access_token") ?? ""),
    enabled: !!localStorage.getItem("access_token"),
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

  return {
    profileAvatar,
    user,
    refetchUserInfo,
    changeAvatar,
    refectProfileAvatar,
  };
};
