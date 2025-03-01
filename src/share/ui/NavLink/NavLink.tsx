import { Button } from "@nextui-org/react";
import { INavLink } from "./NavLink.types";
import { Link } from "react-router-dom";
import Image from "../Image/Image";

const NavLink = (props: INavLink) => {
  const { title, url, startImg, className, isOpen } = props;
  return (
    <>
      <Button variant="light" className={`${className} p-0 h-max`}>
        <Link
          to={url}
          className={`flex items-center gap-4 text-lg w-${
            isOpen ? "full" : "max"
          } p-3 px-5 max-[1300px]:text-base max-[900px]:p-3 max-[900px]:w-max`}
        >
          <Image
            url={startImg}
            className="w-8 h-8 max-[1300px]:w-6 max-[1300px]:h-6"
          />
          {isOpen && <p className="max-[900px]:hidden">{title}</p>}
        </Link>
      </Button>
    </>
  );
};

export default NavLink;
