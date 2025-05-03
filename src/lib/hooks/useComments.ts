import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateComment,
  DeleteComment,
  GetComments,
  GetLikes,
  SendReport,
  ToggleLikeComment,
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

  const { mutate: sendReport } = useMutation({
    mutationKey: ["send report", parentId, parentType],
    mutationFn: ({
      commentId,
      reason,
    }: {
      commentId: string;
      reason: string;
    }) => SendReport(commentId, reason),
  });

  const { mutate: toggleLike } = useMutation({
    mutationKey: ["like or dislike comment"],
    mutationFn: () => ToggleLikeComment(parentId, parentType),
    onSuccess: () => refetchLikes(),
  });

  const { data: likes, refetch: refetchLikes } = useQuery({
    queryKey: ["likes", parentId, parentType],
    queryFn: () => GetLikes(parentId, parentType),
  });

  return {
    comments,
    createComment,
    refetchComments,
    deleteComment,
    sendReport,
    toggleLike,
    likes,
  };
};
