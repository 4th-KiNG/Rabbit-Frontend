import { Input as InputUI } from "@nextui-org/react";
import { IInput } from "./Input.types";
import { isMobile } from "../../../utils/styles.utils";

const Input = (props: IInput) => {
  const { label, type, register, name } = props;
  return (
    <>
      <InputUI
        size={`${isMobile() ? "md" : "lg"}`}
        label={label}
        labelPlacement="inside"
        style={{ fontSize: `${isMobile() ? "12px" : "16px"}` }}
        type={type}
        {...register(name)}
      />
    </>
  );
};

export default Input;
