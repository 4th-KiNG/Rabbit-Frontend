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
