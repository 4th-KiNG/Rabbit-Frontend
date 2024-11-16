import { Button as ButtonUI } from "@nextui-org/react";
import { IButton } from "./Button.types";

const Button = (props: IButton) => {
  const { children, onClick, className } = props;
  return (
    <>
      <ButtonUI className={`${className}`} onClick={onClick}>
        {children}
      </ButtonUI>
    </>
  );
};

export default Button;
