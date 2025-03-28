import { useProfile } from "../../../lib/hooks/useProfile";
import { Button, Image, TagInput } from "../..";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { crossLight, photoIco } from "../../../assets";
import usePosts from "../../../lib/hooks/usePosts";
import { Tag } from "react-tag-input";
import TextareaAutosize from "react-textarea-autosize";

const CreatePostArea = () => {
  const { avatar } = useProfile();
  const [isFocus, setFocus] = useState<boolean>(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [textTitle, setTextTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const { createPost } = usePosts();

  const handleChangeTextTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTextTitle(e.target.value),
    []
  );

  const handleChangeTextArea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setTextArea(e.target.value),
    []
  );

  const handleUploadFile = useCallback(() => {
    if (
      imagesRef.current &&
      imagesRef.current.files &&
      imagesRef.current.files.length + uploadFiles.length <= 5
    )
      setUploadFiles([...uploadFiles, ...imagesRef.current.files]);
  }, [imagesRef, uploadFiles]);

  const handleRemoveFile = useCallback(
    (file: File) => {
      setUploadFiles(uploadFiles.filter((uploadFile) => uploadFile !== file));
    },
    [uploadFiles]
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (areaRef.current && !areaRef.current.contains(e.target as Node)) {
        setFocus(false);
        setTextArea("");
        setTextTitle("");
        setUploadFiles([]);
      }
    },
    [areaRef]
  );

  const handleCreatePost = useCallback(() => {
    if (textTitle !== "") {
      createPost({
        text: textArea,
        title: textTitle,
        images: uploadFiles,
        tags: tags.map((tag) => tag.text),
      });
      setFocus(false);
      setTextArea("");
      setTextTitle("");
      setUploadFiles([]);
      setTags([]);
    }
  }, [textTitle, textArea, uploadFiles, createPost, tags]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <>
      <div
        className={`bg-[#404040] rounded-2xl p-4 max-[500px]:p-3 flex ${
          !isFocus ? "min-h-10" : "min-h-50"
        }`}
        ref={areaRef}
      >
        <Image
          url={avatar}
          className="w-10 h-10 rounded-full object-cover max-[900px]:w-8 max-[900px]:h-8"
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
            <div className="flex flex-col gap-3">
              <TextareaAutosize
                className="w-full inline-table text-md p-2 bg-transparent outline-none border-noned h-auto"
                placeholder="Текст обсуждения"
                value={textArea}
                onChange={handleChangeTextArea}
              />
              {uploadFiles.length > 0 && (
                <>
                  <p>Загруженные файлы (максимум 5 штук):</p>
                  <div className="flex gap-3 flex-wrap">
                    {uploadFiles.map((file) => (
                      <>
                        <div className="relative">
                          <Image
                            url={URL.createObjectURL(file)}
                            className="w-16 h-16 object-cover"
                          />
                          <Button
                            className="absolute -top-2 -right-2 p-1 min-w-0 h-max bg-black rounded-full"
                            onClick={() => handleRemoveFile(file)}
                          >
                            <Image url={crossLight} className="w-5 h-5" />
                          </Button>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
              <p className="text-base max-[550px]:text-sm">
                Теги вашего поста (максимум 15 штук):
              </p>
              <TagInput tags={tags} setTags={setTags} />
              <div className="flex items-center justify-end gap-4 mt-4">
                <Button
                  className="p-2 min-w-max h-max rounded-full"
                  onClick={() => imagesRef.current?.click()}
                >
                  <Image url={photoIco} className="w-6 h-6" />
                </Button>
                <Button
                  className="rounded-full bg-[#CE3333]"
                  onClick={handleCreatePost}
                >
                  <p>Опубликовать</p>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={handleUploadFile}
        ref={imagesRef}
        accept=".png,.jpg,.jpeg"
        multiple
      />
    </>
  );
};

export default CreatePostArea;
