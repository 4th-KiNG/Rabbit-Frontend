import { useProfile } from "../../../lib/hooks/useProfile";
import { Button, Image } from "../..";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { photoIco } from "../../../assets";

const CreatePostArea = () => {
  const { profileAvatar } = useProfile();
  const [isFocus, setFocus] = useState<boolean>(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const [textTitle, setTextTitle] = useState("");
  const [textArea, setTextArea] = useState("");

  const handleChangeTextTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTextTitle(e.target.value);

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTextArea(e.target.value);

  const handleClickOutside = (e: MouseEvent) => {
    if (areaRef.current && !areaRef.current.contains(e.target as Node)) {
      setFocus(false);
      setTextArea("");
      setTextTitle("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className={` rounded-2xl p-4 max-[500px]:p-3 flex bg-[#eeeeee] dark:bg-[#404040] ${
          !isFocus ? "min-h-10" : "min-h-52"
        }`}
        ref={areaRef}
      >
        <Image
          url={profileAvatar}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="w-full">
          <input
            type="text"
            className="w-full text-lg p-2 bg-transparent outline-none border-none"
            placeholder="О чем хотите поговорить?"
            onFocus={() => setFocus(true)}
            value={textTitle}
            onChange={handleChangeTextTitle}
          />
          {isFocus && (
            <>
              <textarea
                className="w-full inline-table text-md p-2 bg-transparent outline-none border-noned h-auto"
                placeholder="Текст обсуждения"
                value={textArea}
                onChange={handleChangeTextArea}
              />
              <div className="flex items-center justify-end gap-4 mt-4">
                <Button className="p-2 min-w-max h-max rounded-full">
                  <Image url={photoIco} className="w-6 h-6" />
                </Button>
                <Button className="rounded-full bg-[#CE3333]">
                  <p>Опубликовать</p>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePostArea;
