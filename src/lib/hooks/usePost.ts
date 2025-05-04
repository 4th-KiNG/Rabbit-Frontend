import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GetLikes,
  GetPost,
  SendReport,
  ToggleLikePost,
} from "../api/posts/postsApi";
import { PostProps } from "../../types/post.types";

export const usePost = (postId: string) => {
  const { data: postData } = useQuery<PostProps>({
    queryKey: ["post data", postId],
    queryFn: () => GetPost(postId),
  });

  const { mutate: toggleLike } = useMutation({
    mutationKey: ["dislike post"],
    mutationFn: () => ToggleLikePost(postId),
    onSuccess: () => refetchLikes(),
  });

  const { data: likes, refetch: refetchLikes } = useQuery({
    queryKey: ["likes", postId],
    queryFn: () => GetLikes(postId),
  });

  const { mutate: sendReport, isSuccess: isSuccessSendReport } = useMutation({
    mutationKey: ["send report", postId],
    mutationFn: (reason: string) => SendReport(postId, reason),
  });

  return {
    sendReport,
    toggleLike,
    likes,
    postData,
    isSuccessSendReport,
  };
};
