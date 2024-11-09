import axios from "axios";
import { UserData } from "../../../types/user.types";
import { IP } from "../../../constants/api";

export const GetUserInfo = async (token: string): Promise<UserData> => {
  const { data } = await axios({
    method: "get",
    url: `${IP}/user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
