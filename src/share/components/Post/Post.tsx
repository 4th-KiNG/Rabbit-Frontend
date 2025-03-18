import { useProfile } from "../../../lib/hooks/useProfile";
import { PostProps } from "../../../types/post.types";
import { Button, DropDownMenu, Image, ImageModal, ModalForm } from "../..";
import { likeIco, likeIcoActive } from "../../../assets";
import { useCallback, useMemo, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { DropDownItem } from "../DropDownMenu/DropDownMenu.types";
import usePosts from "../../../lib/hooks/usePosts";
import { GetImage } from "../../../utils/images.utils";
import { useUser } from "../../../lib/hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { usePost } from "../../../lib/hooks/usePost";

const Post = (props: PostProps) => {
  const { title, text, id, images, ownerId } = props;
  const { user } = useProfile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { deletePost } = usePosts();
  const { likes, likePost, dislikePost } = usePost(id);
  const [openImage, setOpenImage] = useState("");
  const [isOpenModal, setOpenModal] = useState(false);
  const nav = useNavigate();

  const { userData, avatar } = useUser(ownerId);

  const [dropItems] = useState<DropDownItem[]>([
    {
      title: "Пожаловаться",
      key: "report",
      onClick: onOpen,
    },
    { title: "Открыть пост", key: "open", onClick: () => nav(`/post/${id}`) },
  ]);

  const isLikeActive = useMemo((): boolean => {
    if (likes && user) return likes.includes(user.id);
    return false;
  }, [likes, user]);

  const toggleLike = useCallback(() => {
    if (isLikeActive) dislikePost();
    else likePost();
  }, [isLikeActive, dislikePost, likePost]);

  return (
    <>
      <div className="w-full bg-[#404040] rounded-2xl p-6 flex flex-col gap-3 max-[900px]:p-5 max-[500px]:p-4">
        <div className="flex justify-between">
          <Link
            to={`${
              user && userData && userData?.id === user?.id
                ? "/profile"
                : `/user/${userData?.id}`
            }`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              url={avatar}
              className="w-10 h-10 object-cover rounded-full max-[900px]:w-8 max-[900px]:h-8"
            />
            <p className="text-lg max-[900px]:text-base">
              {userData?.username}
            </p>
          </Link>
          <DropDownMenu
            items={
              userData?.id && user?.id && userData.id === user.id
                ? [
                    ...dropItems,
                    {
                      title: "Удалить пост",
                      key: "delete",
                      color: "danger",
                      className: "text-danger",
                      onClick: () => deletePost(id),
                    },
                  ]
                : dropItems
            }
          />
          <ModalForm
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Пожаловаться на контент поста"
            content="Coming soon..."
          />
        </div>
        <h3 className="text-2xl font-bold max-[900px]:text-lg">{title}</h3>
        <p className="text-lg max-[900px]:text-base">{text}</p>
        <div className="grid grid-cols-3 grid-rows-1 gap-3 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1">
          {images.map((image) => (
            <>
              <div
                onClick={() => {
                  setOpenImage(GetImage("posts-images", image));
                  setOpenModal(true);
                }}
              >
                <Image
                  url={GetImage("posts-images", image)}
                  className="rounded-md h-full"
                />
              </div>
            </>
          ))}
        </div>
        <div className="mt-2">
          <Button
            className="max-w-max max-h-max min-w-0 p-3 rounded-full bg-[#585757]"
            onClick={toggleLike}
          >
            <Image
              url={isLikeActive ? likeIcoActive : likeIco}
              className="w-4 h-4 object-contain max-[500px]:w-3 max-[500px]:h-3"
            />
            {likes && likes.length > 0 && (
              <p className="text-xs">{likes.length}</p>
            )}
          </Button>
        </div>
      </div>
      {isOpenModal && (
        <ImageModal image={openImage} closeModal={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default Post;
