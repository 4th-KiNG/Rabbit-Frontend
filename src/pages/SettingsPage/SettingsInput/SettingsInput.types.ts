import { ChangeEvent } from "react";

export interface IInput {
  label?: string;
  type?: string;
  placeholder?: string;
}

export interface IInputPass {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ChangePasswordValues {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
}
