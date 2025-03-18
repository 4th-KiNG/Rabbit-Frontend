import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreatePost, PostProps } from "../../types/post.types";
import { CreatePost, DeletePost, GetPosts } from "../api/posts/postsApi";
import { useEffect, useState } from "react";

const usePosts = (ownerId?: string) => {
  const [searchString, setSearchString] = useState<string | null>();

  const { data: posts, refetch: refetchPosts } = useQuery<PostProps[]>({
    queryKey: ["posts", ownerId, searchString],
    queryFn: () => GetPosts(ownerId, searchString),
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

  useEffect(() => {
    console.log(searchString);
    if (searchString && searchString.length > 0) {
      refetchPosts();
    }
  }, [searchString, refetchPosts]);

  return {
    posts,
    refetchPosts,
    createPost,
    deletePost,
    setSearchString,
    searchString,
  };
};

export default usePosts;
