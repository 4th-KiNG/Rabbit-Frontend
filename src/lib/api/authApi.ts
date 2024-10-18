import axios from "axios";
import { IP } from "../../constants/api";
import { ISignUp, ISignIn } from "./authApi.types";

export const SignUp = async (userData: ISignUp) => {
  const { data } = await axios({
    method: "post",
    url: `${IP}/auth/signup`,
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    },
  });
  console.log(data);
};

export const SignIn = async (userData: ISignIn) => {
  const { data } = await axios({
    method: "post",
    url: `${IP}/auth/signin`,
    data: {
      email: userData.email,
      password: userData.password,
    },
  });
  console.log(data);
};
