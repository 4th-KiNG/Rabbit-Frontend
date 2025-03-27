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
