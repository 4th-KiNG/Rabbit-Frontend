import { useProfile } from "../../../lib/hooks/useProfile";
import { Button, Image } from "../..";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { crossLight, photoIco } from "../../../assets";
import usePosts from "../../../lib/hooks/usePosts";

const CreatePostArea = () => {
  const { avatar } = useProfile();
  const [isFocus, setFocus] = useState<boolean>(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [textTitle, setTextTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
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
    if (imagesRef.current && imagesRef.current.files)
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

  const handleCreatePost = () => {
    if (textTitle !== "" && textTitle !== "") {
      createPost({
        text: textArea,
        title: textTitle,
        images: uploadFiles,
      });
      setFocus(false);
      setTextArea("");
      setTextTitle("");
      setUploadFiles([]);
    }
  };

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
        <Image url={avatar} className="w-10 h-10 rounded-full object-cover" />
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
              {uploadFiles.length > 0 && (
                <>
                  <p className="mb-3">Загруженные файлы:</p>
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
            </>
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
