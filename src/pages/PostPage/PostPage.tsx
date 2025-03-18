import { useParams } from "react-router-dom";
import { usePost } from "../../lib/hooks/usePost";
import { Post } from "../../share";

const PostPage = () => {
  const { id } = useParams();
  const { postData } = usePost(id ?? "1");
  return <>{postData && <Post {...postData} />}</>;
};

export default PostPage;
