import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DislikePost,
  GetLikes,
  GetPost,
  LikePost,
} from "../api/posts/postsApi";
import { PostProps } from "../../types/post.types";

export const usePost = (postId: string) => {
  const { data: postData } = useQuery<PostProps>({
    queryKey: ["post data", postId],
    queryFn: () => GetPost(postId),
  });

  const { mutate: likePost } = useMutation({
    mutationKey: ["post like"],
    mutationFn: () => LikePost(postId),
    onSuccess: () => refetchLikes(),
  });

  const { mutate: dislikePost } = useMutation({
    mutationKey: ["dislike post"],
    mutationFn: () => DislikePost(postId),
    onSuccess: () => refetchLikes(),
  });

  const { data: likes, refetch: refetchLikes } = useQuery({
    queryKey: ["likes", postId],
    queryFn: () => GetLikes(postId),
  });

  return {
    likePost,
    dislikePost,
    likes,
    postData,
  };
};
