import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

const Layout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <>
      <Header />
      {/* смотри, чтобы не писать в NavBar max-w, ты просто оборачиваешь NavBar и
      children в div, которому задаешь grid и grid-template-columns: 320px 1fr */}
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
