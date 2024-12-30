import { Http, API } from "../../../constants/api";
import { ICreatePost } from "../../../types/post.types";

export const CreatePost = async (createPostDto: ICreatePost) => {
  const { title, text, images } = createPostDto;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("text", text);
  if (images && images.length > 0) {
    images.forEach((image, index) => {
      formData.append("images", image, image.name || `image_${index}`);
    });
  }
  const { data } = await Http({
    method: "post",
    url: `${API}/posts`,
    data: formData,
  });
  return data;
};

export const GetPosts = async () => {
  const { data } = await Http({
    method: "get",
    url: `${API}/posts`,
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
