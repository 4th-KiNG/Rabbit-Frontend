import { useMutation } from "@tanstack/react-query";
import { ISignIn, ISignUp } from "../api/auth/authApi.types";
import { SignIn, SignUp } from "../api/auth/authApi";
import { useProfile } from "./useProfile";

export const useAuth = () => {
  const { refetchUserInfo } = useProfile();

  const { mutate: signIn } = useMutation({
    mutationKey: ["signin"],
    mutationFn: (userData: ISignIn) => SignIn(userData),
    onSuccess: () => refetchUserInfo(),
  });

  const { mutate: signUp } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (userData: ISignUp) => SignUp(userData),
    onSuccess: () => refetchUserInfo(),
  });

  return {
    signIn,
    signUp,
  };
};