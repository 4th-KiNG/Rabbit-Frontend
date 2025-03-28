import { Link } from "react-router-dom";
import { useUser } from "../../../lib/hooks/useUser";
import { IComment } from "../../../types/comment";
import Image from "../../ui/Image/Image";
import { useProfile } from "../../../lib/hooks/useProfile";
import { Button, DropDownMenu, ModalForm } from "../..";
import {
  commentIco,
  likeIco,
  likeIcoActive,
  minusIcon,
  plusIcon,
} from "../../../assets";
import { useEffect, useState } from "react";
import { useComments } from "../../../lib/hooks/useComments";
import { DropDownItem } from "../DropDownMenu/DropDownMenu.types";
import { useDisclosure } from "@nextui-org/react";

const Comment = (props: IComment) => {
  const {
    id,
    ownerId,
    text,
    setReplyItem,
    parentType,
    parentId,
    deleteComment,
    refetchId,
    clearRefetchId,
  } = props;
  const { userData, avatar } = useUser(ownerId);
  const { user } = useProfile();
  const { comments, refetchComments } = useComments(id, "comment");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLikeActive, setLikeActive] = useState(false);
  const [isShowReplies, setShowReplies] = useState(false);
  const [dropItems] = useState<DropDownItem[]>([
    {
      title: "Пожаловаться",
      key: "report",
      onClick: onOpen,
    },
  ]);

  const toggleLike = () => setLikeActive(!isLikeActive);
  const likes: string[] = [];

  useEffect(() => {
    if (refetchId === id) {
      setTimeout(() => {
        refetchComments();
        clearRefetchId();
      }, 200);
    }
  }, [refetchId, refetchComments, id, clearRefetchId]);

  return (
    <div className="flex flex-col gap-3 max-w-full">
      {userData && (
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
            className="w-8 h-8 object-cover rounded-full max-[900px]:w-6 max-[900px]:h-6"
          />
          <p className="text-lg max-[900px]:text-base">{userData?.username}</p>
        </Link>
      )}
      <div className="pl-10 flex flex-col gap-3 max-w-full">
        <p className="max-w-full text-balance whitespace-normal break-words">
          {text}
        </p>
        <div className="mt-2 flex gap-3 items-center">
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
          <Button className="max-w-max max-h-max min-w-0 p-3 rounded-full bg-[#585757]">
            <Image
              url={commentIco}
              className="w-4 h-4 object-contain max-[500px]:w-3 max-[500px]:h-3"
            />
            <p
              className="text-xs"
              onClick={() =>
                setReplyItem({
                  parentId: id,
                  parentType: "comment",
                  replyText: text,
                })
              }
            >
              Ответить
            </p>
          </Button>
          <DropDownMenu
            items={
              userData?.id && user?.id && userData.id === user.id
                ? [
                    ...dropItems,
                    {
                      title: "Удалить комметарий",
                      key: "delete",
                      color: "danger",
                      className: "text-danger",
                      onClick: () => deleteComment(id, parentType, parentId),
                    },
                  ]
                : dropItems
            }
          />
          <ModalForm
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Пожаловаться на контент комментария"
            content="Coming soon..."
          />
        </div>
        {comments && comments.length > 0 && (
          <Button
            className="w-max max-w-max max-h-max min-w-0 px-1 py-2 rounded-full"
            onClick={() => setShowReplies(!isShowReplies)}
          >
            <Image url={isShowReplies ? minusIcon : plusIcon} />
            <p className="text-base text-[#CE3333]">
              {isShowReplies ? "Скрыть" : "Показать"} {comments.length} ответов
            </p>
          </Button>
        )}
        {comments && comments.length > 0 && isShowReplies && (
          <div className="flex flex-col gap-3">
            {comments &&
              comments.map((comment) => (
                <Comment
                  {...comment}
                  setReplyItem={setReplyItem}
                  deleteComment={deleteComment}
                  refetchId={refetchId}
                  clearRefetchId={clearRefetchId}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
