import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateComment,
  DeleteComment,
  GetComments,
} from "../api/comments/commentsApi";
import { IComment, ICreateComment, IDeleteComment } from "../../types/comment";

export const useComments = (
  parentId: string,
  parentType: "comment" | "post"
) => {
  const { data: comments, refetch: refetchComments } = useQuery<IComment[]>({
    queryKey: ["comments", parentId, parentType],
    queryFn: () => GetComments(parentId, parentType),
  });

  const { mutate: createComment } = useMutation({
    mutationKey: ["create comment"],
    mutationFn: (createCommentDto: ICreateComment) =>
      CreateComment(createCommentDto),
    onSuccess: () => {
      refetchComments();
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationKey: ["delete comment", parentId, parentType],
    mutationFn: (deleteCommentDto: IDeleteComment) =>
      DeleteComment(deleteCommentDto.commentId, deleteCommentDto.parentType),
    onSuccess: () => {
      setTimeout(() => refetchComments(), 200);
    },
  });

  return {
    comments,
    createComment,
    refetchComments,
    deleteComment,
  };
};
