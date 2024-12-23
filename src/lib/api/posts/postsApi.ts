import { Http, IP } from "../../../constants/api";
import { ICreatePost } from "../../../types/post.types";

export const CreatePost = async (createPostDto: ICreatePost) => {
  const { title, text } = createPostDto;
  const { data } = await Http({
    method: "post",
    url: `${IP}/posts`,
    data: {
      title: title,
      text: text,
    },
  });
  console.log(data);
  return data;
};

export const GetPosts = async () => {
  const { data } = await Http({
    method: "get",
    url: `${IP}/posts`,
  });
  console.log(data);
  return data;
};

export const DeletePost = async (postId: string) => {
  const { data } = await Http({
    method: "delete",
    url: `${IP}/posts/${postId}`,
  });
  console.log(data);
  return data;
};
