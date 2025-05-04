import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../../lib/hooks/usePost";
import { Button, Post } from "../../share";
import { useEffect } from "react";

const PostPage = () => {
  const { id } = useParams();
  const { postData } = usePost(id ?? "1");
  const nav = useNavigate();

  useEffect(() => {
    if (id) {
      sessionStorage.setItem("postId", id);
    }
  }, [id]);

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        className="text-sm bg-[#eeeeee] dark:bg-[#404040] rounded-full"
        onClick={() => nav("/")}
      >
        <p>К постам</p>
      </Button>
      {postData && <Post {...postData} />}
    </div>
  );
};

export default PostPage;
