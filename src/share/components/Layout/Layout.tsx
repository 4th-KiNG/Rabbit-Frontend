import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

const Layout = ({ children }: { children: Readonly<ReactNode> }) => {
  return <>
    {children} 
    <Header />
    <Navbar />
  </>;
};

export default Layout;
