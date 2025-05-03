import { API, Http } from "../../../constants/api";
import { ICreateComment } from "../../../types/comment";

export const GetComments = async (
  parentId: string,
  parentType: "comment" | "post"
) => {
  const { data } = await Http({
    method: "get",
    url: `${API}/comments`,
    params: {
      parentId: parentId,
      parentType: parentType,
    },
  });
  return data;
};

export const CreateComment = async (createCommentDto: ICreateComment) => {
  const { parentId, parentType, text } = createCommentDto;
  const { data } = await Http({
    method: "post",
    url: `${API}/comments/create`,
    data: {
      parentId: parentId,
      parentType: parentType,
      text: text,
    },
  });

  return data;
};

export const DeleteComment = async (
  commentId: string,
  parentType: "comment" | "post"
) => {
  const { data } = await Http({
    method: "delete",
    url: `${API}/comments`,
    params: {
      commentId: commentId,
      parentType: parentType,
    },
  });
  return data;
};

export const SendReport = async (commentId: string, reason: string) => {
  const { data } = await Http({
    method: "post",
    url: `${API}/comments/${commentId}/report`,
    data: { reason: reason },
  });
  return data;
};

export const GetCommentsByOwnerId = async (ownerId: string) => {
  const { data } = await Http({
    method: "get",
    url: `${API}/comments/${ownerId}`,
  });
  return data;
};

export const ToggleLikeComment = async (
  commentId: string,
  parentType: string
) => {
  const { data } = await Http({
    method: "patch",
    url: `${API}/comments/like`,
    data: {
      commentId: commentId,
      parentType: parentType,
    },
  });
  return data;
};

export const GetLikes = async (commentId: string, parentType: string) => {
  const { data } = await Http({
    method: "get",
    url: `${API}/comments/like`,
    params: {
      commentId: commentId,
      parentType: parentType,
    },
  });
  return data;
};
