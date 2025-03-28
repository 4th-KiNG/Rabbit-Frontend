import { useParams } from "react-router-dom";
import { usePost } from "../../lib/hooks/usePost";
import { Post } from "../../share";
import { useEffect } from "react";

const PostPage = () => {
  const { id } = useParams();
  const { postData } = usePost(id ?? "1");

  useEffect(() => {
    if (id) {
      sessionStorage.setItem("postId", id);
    }
  }, [id]);

  return <>{postData && <Post {...postData} />}</>;
};

export default PostPage;
