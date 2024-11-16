import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

const Layout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <div className="max-h-screen relative">
      <Header />
      <div className="grid grid-cols-[320px_1fr] max-[1300px]:grid-cols-[280px_1fr] max-[900px]:flex">
        <Navbar />
        <div className="w-full overflow-y-auto max-h-[calc(100vh-80px)] max-[900px]:pb-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
