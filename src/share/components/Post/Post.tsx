import { useProfile } from "../../../lib/hooks/useProfile";
import { PostProps } from "../../../types/post.types";
import { Button, DropDownMenu, Image } from "../..";
import { likeIco, likeIcoActive } from "../../../assets";
import { useCallback, useMemo, useState } from "react";
import { dropItems } from "./Post.static";

const Post = (props: PostProps) => {
  const { title, text } = props;
  const { profileAvatar, user } = useProfile();
  const [likes, setLikes] = useState<string[]>([]);

  const isLikeActive = useMemo((): boolean => {
    if (likes && user) return likes.includes(user.id);
    return false;
  }, [likes, user]);

  const toggleLike = useCallback(() => {
    if (user) {
      setLikes((prevLikes) => {
        if (prevLikes.includes(user.id)) {
          const newLikes = prevLikes.filter((like) => like !== user.id);
          return newLikes;
        }
        return [...prevLikes, user.id];
      });
    }
  }, [user]);
  return (
    <>
      <div className="w-full bg-[#404040] rounded-2xl p-6 flex flex-col gap-3 max-[900px]:p-5 max-[500px]:p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Image
              url={profileAvatar}
              className="w-10 h-10 object-cover rounded-full max-[900px]:w-8 max-[900px]:h-8"
            />
            <p className="text-lg max-[900px]:text-base">username</p>
          </div>
          <DropDownMenu items={dropItems} />
        </div>
        <h3 className="text-2xl font-bold max-[900px]:text-lg">{title}</h3>
        <p className="text-lg max-[900px]:text-base">{text}</p>
        <div className="mt-2">
          <Button
            className="max-w-max max-h-max min-w-0 p-3 rounded-full bg-[#585757]"
            onClick={() => toggleLike()}
          >
            <Image
              url={isLikeActive ? likeIcoActive : likeIco}
              className="w-4 h-4 object-contain max-[500px]:w-3 max-[500px]:h-3"
            />
            {likes.length > 0 && <p className="text-xs">{likes.length}</p>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Post;
