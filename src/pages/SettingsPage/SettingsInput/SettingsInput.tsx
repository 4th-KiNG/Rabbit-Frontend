import { Input as SInput } from "@nextui-org/react";
import { IInput, IInputPass } from "./SettingsInput.types";
import { useState } from "react";
import { eye, eyeClosed } from "../../../assets";
import { isMobileSettings } from "../../../utils/styles.utils";

const correctInput =
  "[&_div[data-slot='input-wrapper']]:rounded-[62px] [&_div[data-slot='input-wrapper']]:px-4 [&_label]:translate-x-4";
export const SettingsInput = (props: IInput) => {
  const { label, type, placeholder } = props;
  return (
    <SInput
      label={label}
      type={type}
      labelPlacement="outside"
      className={`${correctInput} 
         ${isMobileSettings() ? "max-w-[156px]" : "max-w-[200px]"}`}
      placeholder={placeholder}
    />
  );
};

export const SettingsInputPassword = (props: IInputPass) => {
  const [eyeIsActive, setEyeIsActive] = useState(false);
  return (
    <SInput
      type={eyeIsActive ? "text" : "password"}
      placeholder={props.label}
      value={props.value}
      onChange={props.onChange}
      endContent={
        <button
          className="focus:outline-0"
          type="button"
          onClick={() => {
            setEyeIsActive(!eyeIsActive);
          }}
        >
          {eyeIsActive ? <img src={eyeClosed} /> : <img src={eye} />}
        </button>
      }
      className={`${correctInput} 
         ${"max-w-[240px] w-full"}`}
    />
  );
};
