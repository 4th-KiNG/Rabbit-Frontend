import { useLocation } from "react-router-dom";
import NavLink from "../../ui/NavLink/NavLink";
import { INavLink } from "../../ui/NavLink/NavLink.types";
import { links } from "./NavBar.static";
import { Button } from "../..";
import { sort } from "../../../assets";

const Navbar = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: () => void;
}) => {
  const locaton = useLocation();

  return (
    <>
      <div className="bg-[#2A2A2A] h-[calc(100vh-80px)] p-4 max-[900px]:hidden flex items-center flex-col gap-3">
        <Button className="min-w-20 rounded-full" onClick={setOpen}>
          <img src={sort} className={`w-3 ${!isOpen && "rotate-180"}`} alt="" />
        </Button>
        <nav className="flex gap-3 flex-col w-full">
          {links.map((link: Omit<INavLink, "isOpen">, index) => {
            return (
              <span key={index}>
                <NavLink
                  {...link}
                  isOpen={isOpen}
                  className={`rounded-full w-full ${
                    locaton.pathname === link.url ? "bg-[#404040]" : ""
                  }`}
                />
              </span>
            );
          })}
        </nav>
      </div>
      <div className="hidden max-[900px]:flex fixed z-30 bottom-0 h-16 w-full bg-[#181717] items-center">
        <nav className="flex justify-around w-full">
          {links.map((link: Omit<INavLink, "isOpen">, index) => {
            return (
              <span className="flex items-center" key={index}>
                <NavLink
                  {...link}
                  isOpen
                  className={`rounded-full w-full max-[900px]:min-w-6 ${
                    locaton.pathname === link.url ? "bg-[#404040]" : ""
                  }`}
                />
              </span>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
