import { ImageModalProps } from "./ImageModal.types";
import { Image } from "../..";
import { crossLight } from "../../../assets";
import { useCallback, useEffect, useRef } from "react";

const ImageModal = (props: ImageModalProps) => {
  const { image, closeModal } = props;
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (imageRef.current && !imageRef.current.contains(e.target as Node)) {
        closeModal();
      }
    },
    [closeModal, imageRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <>
      <div className="fixed bg-[rgba(0,0,0,0.7)] top-0 left-0 w-screen h-screen flex justify-center items-center z-50 p-20">
        <Image
          url={crossLight}
          className="absolute w-8 top-4 right-4 z-100"
          onClick={() => closeModal()}
        />
        <div ref={imageRef}>
          <Image
            url={image}
            className="w-max h-max max-w-[calc(100vw-160px)] max-h-[calc(100vh-160px)] object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default ImageModal;
