import { useMutation } from "@tanstack/react-query";
import { ISignIn, ISignUp } from "../api/auth/authApi.types";
import { SignIn, SignOut, SignUp } from "../api/auth/authApi";
import { useProfile } from "./useProfile";
import { ChangePassword, SendNewPassword } from "../api/user/userApi";
import { ChangePasswordValues } from "../../pages/SettingsPage/SettingsInput/SettingsInput.types";

export const useAuth = () => {
  const { refetchUserInfo } = useProfile();

  const { mutate: signIn, error: signInError } = useMutation({
    mutationKey: ["signin"],
    mutationFn: (userData: ISignIn) => SignIn(userData),
    onSuccess: () => refetchUserInfo(),
  });

  const { mutate: signUp, error: signUpError } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (userData: ISignUp) => SignUp(userData),
    onSuccess: () => refetchUserInfo(),
  });

  const { mutate: signOut } = useMutation({
    mutationKey: ["signout"],
    mutationFn: () => SignOut(),
    onSuccess: () => refetchUserInfo(),
  });

  const {
    mutate: sendNewPassword,
    error: newPasswordError,
    isSuccess: isSuccessSendPassword,
  } = useMutation({
    mutationKey: ["recover password"],
    mutationFn: (email: string) => SendNewPassword(email),
  });

  const {
    mutate: changePassword,
    error: changePasswordError,
    isSuccess: isSuccessChangePassword,
  } = useMutation({
    mutationKey: ["change password"],
    mutationFn: (values: ChangePasswordValues) => ChangePassword(values),
  });

  return {
    signOut,
    signIn,
    signUp,
    signInError,
    signUpError,
    sendNewPassword,
    newPasswordError,
    changePassword,
    changePasswordError,
    isSuccessSendPassword,
    isSuccessChangePassword,
  };
};
