import { CreatePostArea, Post, Filters } from "../../share";
import { PostProps } from "../../types/post.types";

const posts: PostProps[] = [
  {
    id: "1",
    title: "Давайте обсудим",
    userId: "2",
    text: "Текст",
    createDate: new Date(),
  },
  {
    id: "1",
    title: "Давайте обсудим",
    userId: "2",
    text: "Очень много текста. Очень много текста.Очень много текста.Очень много текста.Очень много текста.Очень много текста.Очень много текста.Очень много текста.Очень много текста.Очень много текста.Очень много текста.Очень много текста.",
    createDate: new Date(),
  },
  {
    id: "1",
    title: "Давайте обсудим",
    userId: "2",
    text: "Текст",
    createDate: new Date(),
  },
  {
    id: "1",
    title: "Давайте обсудим",
    userId: "2",
    text: "Текст",
    createDate: new Date(),
  },
];

const PostsPage = () => {
  return (
    <>
      <div className="py-8 px-20 flex flex-col gap-8 w-full max-[900px]:px-8 max-[500px]:gap-3 max-[500px]:p-5">
        <CreatePostArea />
        <Filters />
        {posts.map((post: PostProps, index) => (
          <Post {...post} key={index} />
        ))}
      </div>
    </>
  );
};

export default PostsPage;
