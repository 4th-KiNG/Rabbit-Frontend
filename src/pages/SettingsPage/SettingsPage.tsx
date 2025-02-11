import Button from "../../share/ui/Button/Button";
import { SettingsInput, SettingsInputPasswword } from "./SettingsInput/SettingsInput";
import { inputContent, passwordContent } from "./SettingsInput/SettingsInput.static"
import { IInput } from "./SettingsInput/SettingsInput.types"
import { Select, SelectItem } from "@nextui-org/react";

const genders = [
  {key: "female", label: "Женский"},
  {key: "Male", label: "Мужской"},
];
const SettingsPage = () => {
  return (
    <>
      <h1 className="text-[2.5rem] font-bold mb-8 max-[475px]:text-[1.5rem] max-[475px]:mb-5">Настройки</h1>
      <form className="max-w-[664px] w-full gap-y-11 flex flex-col max-[475px]:gap-y-8" action="#">
        <div>
          <h2 className="text-[2.5rem] font-bold text-[#7F7F7F] mb-6 max-[475px]:text-[1.5rem]">Личные данные</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4 max-[475px]:gap-x-4">
            {inputContent.map((input: IInput, index) => {
              return <SettingsInput {...input} key={index} />
            })}
            <Select labelPlacement="outside" label="Пол" placeholder="Пол" 
            className="max-w-[200px] max-[475px]:max-w-[156px] [&_svg]:scale-150 [&_label]:translate-x-4 
            [&_button[data-slot='trigger']]:rounded-[62px] [&_button[data-slot='trigger']]:px-4">
              {genders.map((gender) => {
                return <SelectItem key={gender.key}>{gender.label}</SelectItem>
              })}
            </Select>
          </div>
          <Button className="rounded-[52px] bg-[#CE3333] text-xl mt-6 py-[15px] px-8 
          max-w-[280px] max-[475px]:max-w-[195px] max-[475px]:text-[14px] max-[475px]:px-4">
            Сохранить изменения 
          </Button>
        </div>
        <div>
          <h2 className="text-[2.5rem] font-bold text-[#7F7F7F] mb-6 max-[475px]:text-[1.5rem]">Пароль</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4 max-[475px]:gap-x-4">
            {passwordContent.map((item: string, index) => {
              return <SettingsInputPasswword label={item} key={index}/>
            })}
          </div>
          <Button className="rounded-[52px] bg-[#CE3333] text-xl mt-6 py-[15px] px-8 max-w-[244px]
          max-[475px]:max-w-[195px] max-[475px]:text-[14px] max-[475px]:px-4">
            Изменить пароль
          </Button>
        </div>
      </form>
    </>
  );
};

export default SettingsPage;
