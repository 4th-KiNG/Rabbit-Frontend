import { Path, UseFormRegister } from "react-hook-form";

export interface IInput {
  className?: string;
  type?: string;
  label: string;
  placeholder?: string;
  name: Path<IFormInputs>;
  register: UseFormRegister<IFormInputs>;
  requireMessage?: string;
  required?: boolean;
  pattern?: { value: RegExp; message: string };
}

export interface IFormInputs {
  email: string;
  password: string;
  username: string;
  surname: string;
  repeatpassword: string;
}
