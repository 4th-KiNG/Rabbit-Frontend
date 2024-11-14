import { Skeleton } from "@nextui-org/react";
import { ImageProps } from "./Image.types";

const Image = (props: ImageProps) => {
  const { url, className } = props;
  return (
    <>
      {url ? (
        <img src={url} className={className} />
      ) : (
        <Skeleton className={className} />
      )}
    </>
  );
};

export default Image;
