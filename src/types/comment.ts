import { Dispatch, SetStateAction } from "react";

export interface IComment {
  id: string;
  ownerId: string;
  text: string;
  parentId: string;
  parentType: "post" | "comment";
  refetchId: string | null;
  clearRefetchId: () => void;
  setReplyItem: Dispatch<SetStateAction<IReplyItem>>;
  deleteComment: (
    commentId: string,
    parentType: "post" | "comment",
    parentId: string
  ) => void;
}

export interface IReplyItem {
  parentId: string;
  parentType: "post" | "comment";
  replyText: string | null;
}

export interface ICreateComment {
  parentId: string;
  parentType: "post" | "comment";
  text: string;
}

export interface IDeleteComment {
  commentId: string;
  parentType: "post" | "comment";
}
