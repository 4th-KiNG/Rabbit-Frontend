import { Http, API } from "../../../constants/api";
import { ISignUp, ISignIn } from "./authApi.types";

export const SignUp = async (userData: ISignUp) => {
  const { data } = await Http({
    method: "post",
    url: `${API}/auth/signup`,
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    },
  });
  Http.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;
  localStorage.setItem("access_token", data.access_token);
};

export const SignIn = async (userData: ISignIn) => {
  const { data } = await Http({
    method: "post",
    url: `${API}/auth/signin`,
    data: {
      email: userData.email,
      password: userData.password,
    },
  });
  Http.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;
  localStorage.setItem("access_token", data.access_token);
};

export const SignOut = async () => {
  localStorage.removeItem("access_token");
  location.reload();
};
