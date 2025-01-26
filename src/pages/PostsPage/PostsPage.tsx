import usePosts from "../../lib/hooks/usePosts";
import { CreatePostArea, Post } from "../../share";
import { PostProps } from "../../types/post.types";

const PostsPage = () => {
  const { posts } = usePosts();
  return (
    <>
      <div className=" flex flex-col gap-8 w-full  max-[500px]:gap-3">
        <CreatePostArea />
        {/* <Filters /> */}
        {posts &&
          posts.map((post: PostProps, index) => <Post {...post} key={index} />)}
      </div>
    </>
  );
};

export default PostsPage;
