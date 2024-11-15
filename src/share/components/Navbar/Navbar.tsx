import NavLink from "../../ui/NavLink/NavLink";
import { INavLink } from "../../ui/NavLink/NavLink.types";
import { links } from "./NavBar.static";

const Navbar = () => {
  return (
    <>
      <div className="bg-[#2A2A2A] h-[calc(100vh-80px)] p-8">
        <nav className="flex gap-3 flex-col">
          {links.map((link: INavLink) => {
            return (
              <span>
                <NavLink {...link} className="rounded-full w-full p-3 px-5" />
              </span>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
