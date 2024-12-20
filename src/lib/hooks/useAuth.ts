import { useMutation } from "@tanstack/react-query";
import { ISignIn, ISignUp } from "../api/auth/authApi.types";
import { SignIn, SignOut, SignUp } from "../api/auth/authApi";
import { useProfile } from "./useProfile";

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

  return {
    signOut,
    signIn,
    signUp,
    signInError,
    signUpError,
  };
};
