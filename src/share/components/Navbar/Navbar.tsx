import { useLocation } from "react-router-dom";
import NavLink from "../../ui/NavLink/NavLink";
import { INavLink } from "../../ui/NavLink/NavLink.types";
import { links } from "./NavBar.static";

const Navbar = () => {
  const locaton = useLocation();

  return (
    <>
      <div className="bg-[#2A2A2A] h-[calc(100vh-80px)] p-8 max-[900px]:hidden">
        <nav className="flex gap-3 flex-col">
          {links.map((link: INavLink, index) => {
            return (
              <span key={index}>
                <NavLink
                  {...link}
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
          {links.map((link: INavLink, index) => {
            return (
              <span className="flex items-center" key={index}>
                <NavLink
                  {...link}
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
