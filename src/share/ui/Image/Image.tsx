import { Skeleton } from "@nextui-org/react";
import { ImageProps } from "./Image.types";

const Image = (props: ImageProps) => {
  const { url, className, onClick, ref } = props;
  return (
    <>
      {url ? (
        <img src={url} className={className} onClick={onClick} ref={ref} />
      ) : (
        <Skeleton className={className} />
      )}
    </>
  );
};

export default Image;
