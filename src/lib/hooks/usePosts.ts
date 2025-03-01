import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreatePost, PostProps } from "../../types/post.types";
import { CreatePost, DeletePost, GetPosts } from "../api/posts/postsApi";

const usePosts = () => {
  const { data: posts, refetch: refetchPosts } = useQuery<PostProps[]>({
    queryKey: ["posts"],
    queryFn: () => GetPosts(),
  });

  const { mutate: createPost } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (createPostDto: ICreatePost) => CreatePost(createPostDto),
    onSuccess: () => refetchPosts(),
  });

  const { mutate: deletePost } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (postId: string) => DeletePost(postId),
    onSuccess: () => refetchPosts(),
  });

  return {
    posts,
    refetchPosts,
    createPost,
    deletePost,
  };
};

export default usePosts;
