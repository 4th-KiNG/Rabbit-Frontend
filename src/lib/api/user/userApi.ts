import { UserData } from "../../../types/user.types";
import { Http, IP } from "../../../constants/api";

export const GetUserInfo = async (token: string): Promise<UserData> => {
  const { data } = await Http({
    method: "get",
    url: `${IP}/user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const GetAvatar = async (id: string) => {
  const { data } = await Http({
    method: "get",
    url: `${IP}/user/avatar/${id}`,
    responseType: "blob",
  });
  const image = URL.createObjectURL(data);
  return image;
};

export const ChangeAvatar = async (newAvatar: File) => {
  const avatarFormData = new FormData();
  avatarFormData.append("avatar", newAvatar);

  const { data } = await Http({
    method: "post",
    url: `${IP}/user/avatar`,
    data: avatarFormData,
  });
  return data;
};

export const GetBanner = async (id: string) => {
  const { data } = await Http({
    method: "get",
    url: `${IP}/user/banner/${id}`,
    responseType: "blob",
  });
  const image = URL.createObjectURL(data);
  return image;
};

export const ChangeBanner = async (newBanner: File) => {
  const bannerFormData = new FormData();
  bannerFormData.append("banner", newBanner);

  const { data } = await Http({
    method: "post",
    url: `${IP}/user/banner`,
    data: bannerFormData,
  });
  return data;
};
