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

export const GetAvatar = async (token: string, id: string) => {
  const { data } = await axios({
    method: "get",
    url: `${IP}/user/avatar/${id}`,
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

export const GetBanner = async (token: string, id: string) => {
  const { data } = await axios({
    method: "get",
    url: `${IP}/user/banner/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });
  const image = URL.createObjectURL(data);
  return image;
};

export const ChangeBanner = async (newBanner: File, token: string) => {
  const bannerFormData = new FormData();
  bannerFormData.append("banner", newBanner);

  const { data } = await axios({
    method: "post",
    url: `${IP}/user/banner`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: bannerFormData,
  });
  return data;
};
