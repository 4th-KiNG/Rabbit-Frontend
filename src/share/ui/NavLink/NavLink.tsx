import { Button } from "@nextui-org/react";
import { INavLink } from "./NavLink.types"

//Во первых сначала создавай папку NavLink, а в ней уже сам компонент + 
//Во вторых никогда в TypeScript не пиши any. Создаешь файл NavLink.types.ts в этой же папке и в нем описываешь тип NavLink + 
const NavLink = (props: INavLink) => {
  //Когда передаешь пропсы лучше делать деструктуризацию типа {title, url} = props, чтобы не брать свойства через точку везде + 
  const {title, url, startImg} = props;
  return (
    <>
      {/* у Button задай через className закругление максимальное и ширина у него должна быть 100% + */}
      <Button variant="light" className="rounded-full w-full flex justify-start">
        <a href={url} className="flex gap-4 text-lg items-center">
          <img src={startImg} />
          {title}
        </a>
      </Button>
    </>
  );
};

export default NavLink;
