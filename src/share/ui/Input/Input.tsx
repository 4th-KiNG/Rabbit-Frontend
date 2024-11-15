import { Input as InputUI } from "@nextui-org/react";
import { IInput } from "./Input.types";
import { isMobile } from "../../../utils/styles.utils";

const Input = (props: IInput) => {
  const { label, type, register, name, startImage, className } = props;
  return (
    <>
      {register && name ? (
        <InputUI
          size={`${isMobile() ? "md" : "lg"}`}
          label={label}
          labelPlacement="inside"
          style={{ fontSize: `${isMobile() ? "14px" : "16px"}` }}
          type={type}
          {...register(name)}
        />
      ) : (
        <InputUI
          size={`${isMobile() ? "md" : "lg"}`}
          placeholder={label}
          style={{ fontSize: `${isMobile() ? "14px" : "16px"}` }}
          type={type}
          radius="full"
          startContent={startImage}
          className={`${className}`}
        />
      )}
    </>
  );
};

export default Input;
