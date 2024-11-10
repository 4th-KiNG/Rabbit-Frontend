import {Button} from "@nextui-org/react";

const NavLink = (props: any) => {
   return (
      <>
         <Button variant="light">
            <a href={props.url} className="flex gap-4 items-center text-lg">
               <img src={props.startImg} />
               {props.title}
            </a>
         </Button>
      </>
   );
}
 
export default NavLink;