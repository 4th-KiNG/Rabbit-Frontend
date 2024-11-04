import { Button as ButtonUI } from "@nextui-org/react";
import { IButton } from "./Button.types";

const Button = (props: IButton) => {
  const { label, onClick, className } = props;
  return (
    <>
      <ButtonUI
        className={`${className} text-base text-center max-[700px]:text-sm`}
        onClick={onClick}
      >
        {label}
      </ButtonUI>
    </>
  );
};

export default Button;
