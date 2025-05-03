import { Http, API } from "../../../constants/api";
import { ICreatePost } from "../../../types/post.types";
import { CompressionImage } from "../../../utils/images.utils";

export const CreatePost = async (createPostDto: ICreatePost) => {
  const { title, text, images, tags } = createPostDto;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("text", text);
  tags.forEach((tag) => formData.append("tags", tag));
  if (images && images.length > 0) {
    for (const [index, image] of images.entries()) {
      const smallImage = await CompressionImage(image);
      formData.append(
        "images",
        smallImage,
        smallImage.name || `image_${index}`
      );
    }
  }
  const { data } = await Http({
    method: "post",
    url: `${API}/posts`,
    data: formData,
  });
  return data;
};

export const GetPosts = async (
  ownerId?: string,
  searchString?: string | null,
  page?: number
) => {
  const { data } = await Http({
    method: "get",
    url: `${API}/posts`,
    params: {
      ownerId: ownerId,
      search_string: searchString,
      page: page,
    },
  });
  return data;
};

export const DeletePost = async (postId: string) => {
  const { data } = await Http({
    method: "delete",
    url: `${API}/posts/${postId}`,
  });
  return data;
};

export const LikePost = async (postId: string) => {
  const { data } = await Http({
    method: "patch",
    url: `${API}/posts/${postId}/likes`,
    params: {
      status: "like",
    },
  });
  return data;
};

export const ToggleLikePost = async (postId: string) => {
  const { data } = await Http({
    method: "patch",
    url: `${API}/posts/${postId}/likes`,
  });
  return data;
};

export const GetLikes = async (postId: string) => {
  const { data } = await Http({
    method: "get",
    url: `${API}/posts/${postId}/likes`,
  });
  return data;
};

export const GetPost = async (postId: string) => {
  const { data } = await Http({
    method: "get",
    url: `${API}/posts/${postId}`,
  });
  return data;
};

export const SendReport = async (postId: string, reason: string) => {
  const { data } = await Http({
    method: "post",
    url: `${API}/posts/${postId}/report`,
    data: {
      reason: reason,
    },
  });
  return data;
};
