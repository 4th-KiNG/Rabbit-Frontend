import { Image } from "../..";
import { comingSoonText, logo } from "../../../assets";

const ComingSoon = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full relative">
        <Image
          url={comingSoonText}
          className="w-[300px] h-[300px] animate-spin-slow"
        />
        <Image
          url={logo}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 "
        />
      </div>
    </>
  );
};

export default ComingSoon;
