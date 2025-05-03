import { useMutation, useQuery } from "@tanstack/react-query";
import { GetByUserId, SubToUser, UnSubToUser } from "../api/user/userApi";
import { UserData } from "../../types/user.types";
import { useMemo } from "react";
import { GetImage } from "../../utils/images.utils";
import { AVATARS_STORAGE, BANNERS_STORAGE } from "../../constants/storage";
import { IComment } from "../../types/comment";
import { GetCommentsByOwnerId } from "../api/comments/commentsApi";

export const useUser = (userId: string) => {
  const { data: userData, refetch: refetchUserData } = useQuery<UserData>({
    queryKey: [`${userId} info`],
    queryFn: () => GetByUserId(userId),
  });

  const { mutate: subToUser } = useMutation({
    mutationKey: ["sub to user", userId],
    mutationFn: () => SubToUser(userId),
    onSuccess: () => setTimeout(() => refetchUserData(), 200),
  });

  const { mutate: unSubToUser } = useMutation({
    mutationKey: ["unsub to user", userId],
    mutationFn: () => UnSubToUser(userId),
    onSuccess: () => setTimeout(() => refetchUserData(), 200),
  });

  const { data: userComments } = useQuery<IComment[]>({
    queryKey: ["get comments by owner id", userData?.id],
    queryFn: () => GetCommentsByOwnerId(userData?.id ?? ""),
    enabled: !!userData,
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
    subToUser,
    unSubToUser,
    userComments,
  };
};
