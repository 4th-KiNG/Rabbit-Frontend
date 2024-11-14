import { Button } from "@nextui-org/react";

//Во первых сначала создавай папку NavLink, а в ней уже сам компонент
//Во вторых никогда в TypeScript не пиши any. Создаешь файл NavLink.types.ts в этой же папке и в нем описываешь тип NavLink
const NavLink = (props: any) => {
  return (
    <>
      {/* у Button задай через className закругление максимальное и ширина у него должна быть 100% */}
      <Button variant="light">
        <a href={props.url} className="flex gap-4 items-center text-lg">
          <img src={props.startImg} />
          {props.title}
        </a>
      </Button>
    </>
  );
};

export default NavLink;
