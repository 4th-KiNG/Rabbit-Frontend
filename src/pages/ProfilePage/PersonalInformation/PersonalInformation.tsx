import { information, informationValue } from "./PersonalInformation.static";


const PersonalInformation = () => {
   return ( 
      <>
         <div className="flex gap-[66px] max-[375px]:gap-6 ml-5 max-[1300px]:my-6">
            <div className="flex flex-col gap-y-5">
               {information.map((item, index) => {
                  return (<span className="text-xl max-[500px]:text-base" key={index}>{item}</span>)
               })}
            </div>
            <div className="flex flex-col gap-y-5">
               {informationValue.map((item, index) => {
                  return (<span className="text-xl max-[500px]:text-base text-[#7F7F7F]" key={index}>{item}</span>)
               })}
            </div>
         </div>
      </>
   );
}
 
export default PersonalInformation;