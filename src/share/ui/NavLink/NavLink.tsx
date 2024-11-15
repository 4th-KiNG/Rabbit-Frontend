import { Button } from "@nextui-org/react";
import { INavLink } from "./NavLink.types";
import { Link } from "react-router-dom";

const NavLink = (props: INavLink) => {
  const { title, url, startImg, className } = props;
  return (
    <>
      <Button variant="light" className={`${className} h-max`}>
        <Link to={url} className="flex gap-4 text-lg w-full">
          <img src={startImg} />
          {title}
        </Link>
      </Button>
    </>
  );
};

export default NavLink;
