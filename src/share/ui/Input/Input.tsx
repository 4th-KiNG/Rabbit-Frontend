import { Input as InputUI } from "@nextui-org/react";
import { IInput } from "./Input.types";

const Input = (props: IInput) => {
  const { label, type, register, name } = props;
  return (
    <>
      <InputUI
        size="lg"
        label={label}
        labelPlacement="inside"
        style={{ fontSize: "16px" }}
        type={type}
        {...register(name)}
      />
    </>
  );
};

export default Input;
