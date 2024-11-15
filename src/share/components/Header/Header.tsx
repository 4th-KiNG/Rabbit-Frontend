import { logo, notifications, search } from "../../../assets";
import { RabbitTitle, Input } from "../..";

const Header = () => {
  return (
    <>
      <header
        className="bg-[#181717] w-full min-h-20
    flex items-center px-10 justify-between"
      >
        <div className="flex gap-3">
          <img src={logo} alt="logo" />
          <RabbitTitle />
        </div>
        <div className="flex gap-6 items-center min-w-[400px]">
          <Input
            type="search"
            label="Поиск"
            startImage={<img src={search} className="mr-2 w-6" />}
          />
          <img src={notifications} className="w-6" />
        </div>

        <div className="flex gap-6 items-center">
          <span>username</span>
          <div className="w-[56px] h-[56px] rounded-full bg-[#D9D9D9]"></div>
        </div>
      </header>
    </>
  );
};

export default Header;
