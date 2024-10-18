import { useMutation } from "@tanstack/react-query";
import { ISignIn, ISignUp } from "../api/authApi.types";
import { SignIn, SignUp } from "../api/authApi";

export const useAuth = () => {
  const { mutate: signIn } = useMutation({
    mutationKey: ["signin"],
    mutationFn: (userData: ISignIn) => SignIn(userData),
  });

  const { mutate: signUp } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (userData: ISignUp) => SignUp(userData),
  });

  return {
    signIn,
    signUp,
  };
};
