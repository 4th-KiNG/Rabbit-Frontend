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

export const GetProfileAvatar = async (token: string) => {
  const { data } = await axios({
    method: "get",
    url: `${IP}/user/avatar`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });
  const image = URL.createObjectURL(data);
  return image;
};

export const ChangeAvatar = async (newAvatar: File, token: string) => {
  const avatarFormData = new FormData();
  avatarFormData.append("avatar", newAvatar);

  const { data } = await axios({
    method: "post",
    url: `${IP}/user/avatar`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: avatarFormData,
  });
  return data;
};
