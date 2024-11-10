import { logo, notifications, search } from "../../../assets";
import { RabbitTitle } from "../../ui";
import {Input} from "@nextui-org/react";

const Header = () => {
  return <>
    <header className="absolute top-0 left-0 bg-[#181717] w-full min-h-[84px] 
    flex items-center pl-10 pr-[83px] max-[1024px]:px-7 gap-[208px]">
      <div className="flex gap-[20px]">
        <img src={logo} alt="logo" />
        <RabbitTitle />
      </div>

      <div className="basis-auto grow flex justify-between">

        <div className="flex gap-6 items-center">
          <Input type="search" placeholder="Поиск" startContent={<img src={search} />}/>
          <img src={notifications} className="max-w-[28px]" />
        </div>

        <div className="flex gap-6 items-center">
          <span>username</span>
          <div className="w-[56px] h-[56px] rounded-full bg-[#D9D9D9]"></div>
        </div>

      </div>
    </header>
  </>;
};

export default Header;
