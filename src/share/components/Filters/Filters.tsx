import { CheckboxGroup } from "@nextui-org/react";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { checkboxs } from "./Filters.static";
import { ICheckbox } from "../../ui/Checkbox/Checkbox.types";
import Button from "../../ui/Button/Button";
import { useState } from "react";
import  sort  from '../../../assets/sort.svg'

const Filters = () => {
   const [isActive, setIsActive] = useState(false);

   return ( 
      <>
         <CheckboxGroup className="relative" defaultValue={['politics', 'games', 'science']}>
            <div className="max-w-[620px] flex flex-row flex-wrap gap-y-4">
               <Button className="bg-[#2A2A2A] rounded-full py-2 px-4 mr-2" onClick={() => {setIsActive(!isActive)}}>
                  <span>Сортировать</span>
                  <img style={isActive ? {transform: 'scale(-1)'}: {}} 
                  className="transition-transform duration-150 ease-linear" src={sort} alt='arrow'/>
               </Button>
               {checkboxs.map((checkbox: ICheckbox, index) => {
                  return (
                     <span style={isActive ? {}: {opacity: '0', visibility: 'hidden', position: 'absolute'}} 
                     className="py-2 px-4 transition-opacity duration-150 ease-linear" key={index}><Checkbox {...checkbox} /></span>
                  );
               })}
            </div>
         </CheckboxGroup>
      </>
   );
}

export default Filters;