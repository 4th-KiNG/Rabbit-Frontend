import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreatePost, PostsResponse } from "../../types/post.types";
import { CreatePost, DeletePost, GetPosts } from "../api/posts/postsApi";
import { useEffect, useState } from "react";
import { usePaginate } from "./usePaginate";

const usePosts = (ownerId?: string) => {
  const [searchString, setSearchString] = useState<string | null>();
  const { currentPage: page } = usePaginate();

  const { data: postsData, refetch: refetchPosts } = useQuery<PostsResponse>({
    queryKey: ["posts", ownerId, searchString, page],
    queryFn: () => GetPosts(ownerId, searchString, page),
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
    if (searchString && searchString.length > 0) {
      refetchPosts();
    }
  }, [searchString, refetchPosts]);

  return {
    postsData,
    refetchPosts,
    createPost,
    deletePost,
    setSearchString,
    searchString,
  };
};

export default usePosts;
