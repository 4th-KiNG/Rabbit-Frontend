import { logo, notifications, search } from "../../../assets";
import { RabbitTitle } from "../../ui";
import { Input } from "@nextui-org/react";

const Header = () => {
  return (
    <>
      {/* никакого absolute быть не должно header должен быть в основном потоке элементов */}
      {/* также я понимаю, что свойство pr-[83px] ты брал по макету, и я потом Саше тоже за это скажу, но если есть в дизайне косяки с несимметричным блоком,
      то лучше спрашивай у меня. убери gap-[208px] и добавь свойство justify-between */}
      <header
        className="absolute top-0 left-0 bg-[#181717] w-full min-h-[84px] 
    flex items-center px-10 justify-between"
      >
        {/* вместо gap-[20px] можно gap-5 написать. Если нет необходимости указывать размер через пиксели, то лучше указывать в rem +*/}
        <div className="flex gap-5">
          <img src={logo} alt="logo" />
          <RabbitTitle />
        </div>

        <div className="basis-auto grow flex justify-between">
          <div className="flex gap-6 items-center">
            <Input
              type="search"
              placeholder="Поиск"
              startContent={<img src={search} />}
            />
            <img src={notifications} className="max-w-[28px]" />
          </div>

          <div className="flex gap-6 items-center">
            <span>username</span>
            <div className="w-[56px] h-[56px] rounded-full bg-[#D9D9D9]"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
