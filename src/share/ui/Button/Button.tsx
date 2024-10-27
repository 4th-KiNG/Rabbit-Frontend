import { Button as ButtonUI } from "@nextui-org/react";
import { IButton } from "./Button.types";

const Button = (props: IButton) => {
  const { label, onClick, className } = props;
  return (
    <>
      <ButtonUI
        className={`${className} text-base text-center`}
        onClick={onClick}
      >
        {label}
      </ButtonUI>
    </>
  );
};

export default Button;
