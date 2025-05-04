import TextareaAutosize from "react-textarea-autosize";
import { useProfile } from "../../../lib/hooks/useProfile";
import { PostProps } from "../../../types/post.types";
import {
  Button,
  Comment,
  DropDownMenu,
  Image,
  ImageModal,
  ReportModal,
} from "../..";
import {
  commentIco,
  crossDark,
  crossLight,
  likeIco,
  likeIcoActive,
} from "../../../assets";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import usePosts from "../../../lib/hooks/usePosts";
import { GetImage } from "../../../utils/images.utils";
import { useUser } from "../../../lib/hooks/useUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePost } from "../../../lib/hooks/usePost";
import { useComments } from "../../../lib/hooks/useComments";
import { IReplyItem } from "../../../types/comment";
import { isMobile } from "../../../utils/styles.utils";
import { useTheme } from "next-themes";

const Post = (props: PostProps) => {
  const { title, text, id, images, ownerId } = props;
  const { user } = useProfile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { deletePost } = usePosts();
  const { likes, toggleLike, sendReport } = usePost(id);
  const { comments, createComment, deleteComment } = useComments(id, "post");
  const [openImage, setOpenImage] = useState("");
  const [isOpenModal, setOpenModal] = useState(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [refetchId, setRefetchId] = useState<string | null>(null);
  const [showText, setShowText] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const initialReplyItem: IReplyItem = useMemo(() => {
    return {
      parentId: id,
      parentType: "post",
      replyText: null,
    };
  }, [id]);
  const [replyItem, setReplyItem] = useState<IReplyItem>(initialReplyItem);
  const nav = useNavigate();

  const { userData, avatar } = useUser(ownerId);

  const dropItems = useMemo(
    () => [
      {
        title: "Пожаловаться",
        key: "report",
        onClick: onOpen,
      },
      { title: "Открыть пост", key: "open", onClick: () => nav(`/post/${id}`) },
    ],
    [id, nav, onOpen]
  );

  const isLikeActive = useMemo((): boolean => {
    if (likes && user) return likes.includes(user.id);
    return false;
  }, [likes, user]);

  const handleChangeCommentValue = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target) {
      setCommentValue(event.target.value);
    }
  };

  const handleCreateComment = useCallback(() => {
    if (commentValue.length > 0) {
      createComment({
        parentId: replyItem.parentId,
        parentType: replyItem.parentType,
        text: commentValue,
      });
      setCommentValue("");
      setRefetchId(replyItem.parentId);
      setReplyItem(initialReplyItem);
    }
  }, [replyItem, commentValue, createComment, initialReplyItem]);

  const handleDeleteComment = useCallback(
    (commentId: string, parentType: "post" | "comment", parentId: string) => {
      deleteComment({ commentId: commentId, parentType: parentType });
      setRefetchId(parentId);
    },
    [deleteComment]
  );

  const handleSendReport = useCallback(
    (reason: string) => {
      if (reason.length > 1) sendReport(reason);
    },
    [sendReport]
  );

  return (
    <>
      <div
        className={`w-full ${id} bg-[#eeeeee] dark:bg-[#404040] rounded-2xl p-6 flex flex-col gap-3 max-[900px]:p-5 max-[500px]:p-4`}
      >
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
              userData?.id &&
              user?.id &&
              (userData.id === user.id || user.username === "RabbitAdmin")
                ? [
                    ...dropItems,
                    {
                      title: "Удалить пост",
                      key: "delete",
                      color: "danger",
                      className: "text-danger",
                      onClick: () => {
                        deletePost(id);
                        if (location.pathname.includes("post")) {
                          nav(-1);
                        }
                      },
                    },
                  ]
                : dropItems
            }
          />
          <ReportModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            type="post"
            sendReport={handleSendReport}
          />
        </div>
        <h3 className="text-2xl font-bold break-words max-[900px]:text-lg">
          {title}
        </h3>
        {text && (
          <p className="text-lg break-words max-[900px]:text-base">
            {text.length < 100 || showText ? text : text.slice(0, 100) + "..."}
            {text.length > 100 &&
              (showText ? (
                <button
                  onClick={() => setShowText(false)}
                  className="text-[#ecedee86] ml-2"
                >
                  Скрыть текст
                </button>
              ) : (
                <button
                  onClick={() => setShowText(true)}
                  className="text-[#ecedee86] ml-2"
                >
                  Показать ещё
                </button>
              ))}
          </p>
        )}
        {images.length > 0 && (
          <div className="relative grid grid-cols-3 grid-rows-1 gap-3 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1">
            {images.map((image) => (
              <>
                <div
                  onClick={() => {
                    if (!isMobile()) {
                      setOpenImage(GetImage("posts-images", image));
                      setOpenModal(true);
                    }
                  }}
                >
                  <Image
                    url={GetImage("posts-images", image)}
                    className="rounded-md w-full object-cover"
                  />
                </div>
              </>
            ))}
          </div>
        )}
        <div className="mt-2 flex gap-3">
          <Button
            className="max-w-max max-h-max min-w-0 p-3 rounded-full bg-white dark:bg-[#585757]"
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
          <Button
            className="max-w-max max-h-max min-w-0 p-3 rounded-full bg-white dark:bg-[#585757]"
            onClick={() => nav(`/post/${id}`)}
          >
            <Image
              url={commentIco}
              className="w-4 h-4 object-contain max-[500px]:w-3 max-[500px]:h-3"
            />
            {comments && comments.length > 0 && (
              <p className="text-xs">{comments.length}</p>
            )}
          </Button>
        </div>
        {location.pathname.includes("post") && (
          <div className="flex flex-col gap-5">
            <div className="mt-5 flex flex-col gap-3">
              {comments &&
                comments.map((comment) => (
                  <Comment
                    {...comment}
                    setReplyItem={setReplyItem}
                    deleteComment={handleDeleteComment}
                    refetchId={refetchId}
                    clearRefetchId={() => setRefetchId(null)}
                  />
                ))}
            </div>
            {replyItem.replyText && (
              <div className="bg-white dark:bg-[#585757] p-2 w-max rounded-2xl flex items-center gap-2 max-w-full text-md max-[500px]:text-sm">
                <p className="break-words">
                  Ответ на комментарий:{" "}
                  {replyItem.replyText.length < 10
                    ? replyItem.replyText
                    : replyItem.replyText.slice(0, 11) + "..."}
                </p>
                <Image
                  url={theme === "dark" ? crossLight : crossDark}
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setReplyItem(initialReplyItem)}
                />
              </div>
            )}
            <div className="bg-[#E3E3E3] dark:bg-[#2A2A2A] rounded-xl p-5 flex flex-col items-end gap-4">
              <TextareaAutosize
                className="w-full resize-none bg-transparent border-none outline-none text-md max-[500px]:text-sm"
                placeholder="Добавьте комментарий"
                value={commentValue}
                onChange={handleChangeCommentValue}
              />
              <Button
                className="max-w-max max-h-max min-w-0 px-4 py-2 rounded-full bg-[#CE3333] text-white dark:text-black text-md max-[500px]:text-sm"
                onClick={handleCreateComment}
              >
                Отправить
              </Button>
            </div>
          </div>
        )}
      </div>
      {isOpenModal && (
        <ImageModal image={openImage} closeModal={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default Post;
