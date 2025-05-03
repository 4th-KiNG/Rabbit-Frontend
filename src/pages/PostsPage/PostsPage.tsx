import { useSearchParams } from "react-router-dom";
import usePosts from "../../lib/hooks/usePosts";
import { CreatePostArea, Pagination, Post } from "../../share";
import { PostProps } from "../../types/post.types";
import { useEffect, useRef } from "react";

const PostsPage = () => {
  const [searchParams] = useSearchParams();
  const postPageRef = useRef<HTMLDivElement>(null);

  const { postsData, setSearchString } = usePosts();

  useEffect(() => {
    if (searchParams.get("search_string")) {
      setSearchString(searchParams.get("search_string"));
    } else {
      setSearchString(null);
    }
  }, [searchParams, setSearchString]);

  useEffect(() => {
    const prevPostId = sessionStorage.getItem("postId");
    if (prevPostId) {
      const scrollPost = document.getElementsByClassName(prevPostId);
      if (scrollPost.length > 0 && scrollPost[0]) {
        scrollPost[0].scrollIntoView();
        sessionStorage.removeItem("postId");
      }
    }
  }, [postsData]);

  return (
    <>
      <div
        className="flex flex-col gap-8 w-full max-[500px]:gap-3"
        ref={postPageRef}
      >
        <CreatePostArea />
        {postsData && (
          <>
            {postsData.posts.map((post: PostProps, index) => (
              <Post {...post} key={index} />
            ))}
            {postsData.total > 10 && <Pagination total={postsData.total} />}
          </>
        )}
      </div>
    </>
  );
};

export default PostsPage;
