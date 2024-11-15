import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

const Layout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="grid grid-cols-[320px_1fr] max-[1300px]:grid-cols-[280px_1fr] max-[900px]:flex">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
