import { useQuery } from "@tanstack/react-query";
import { GetUserInfo } from "../api/user/userApi";
import { UserData } from "../../types/user.types";

export const useProfile = () => {
  const { data: user, refetch: refetchUserInfo } = useQuery<UserData>({
    queryKey: ["user"],
    queryFn: () => GetUserInfo(localStorage.getItem("access_token") ?? ""),
    enabled: !!localStorage.getItem("access_token"),
  });

  return {
    user,
    refetchUserInfo,
  };
};
