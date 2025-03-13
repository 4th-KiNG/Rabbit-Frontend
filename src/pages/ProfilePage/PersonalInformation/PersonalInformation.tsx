import { information } from "./PersonalInformation.static";

const PersonalInformation = () => {
   return ( 
      <>
         <div className="flex flex-col gap-5 max-[500px]:gap-4 ml-5 max-[1300px]:my-6">
            {information.map((item, index) => {
               return (
                  <div className="text-xl max-[500px]:text-base flex gap-[66px] max-[500px]:gap-6 justify-start">
                     <span key={index} className="basis-[190px] flex-shrink-0 max-[500px]:basis-[140px]">{item.key}</span>
                     <span key={index} className="text-[#7F7F7F]">{item.value}</span>
                  </div>
               )
            })}
         </div>
      </>
   );
}
 
export default PersonalInformation;