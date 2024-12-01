import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

const Layout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <div className="relative h-screen">
      <Header />
      <div className="grid grid-cols-[320px_1fr] max-[1300px]:grid-cols-[280px_1fr] max-[900px]:flex max-[900px]:h-[calc(100vh-64px)]">
        <Navbar />
        <div className="w-full py-8 px-24 overflow-y-auto max-h-[calc(100vh-80px)] max-[1200px]:px-8 max-[900px]:pb-16 max-[500px]:px-5 max-[500px]:pt-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
