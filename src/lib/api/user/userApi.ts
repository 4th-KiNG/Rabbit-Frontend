import { UserData } from "../../../types/user.types";
import { Http, API } from "../../../constants/api";

export const GetUserInfo = async (token: string): Promise<UserData> => {
  const { data } = await Http({
    method: "get",
    url: `${API}/user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const ChangeAvatar = async (newAvatar: File) => {
  const avatarFormData = new FormData();
  avatarFormData.append("avatar", newAvatar);

  const { data } = await Http({
    method: "post",
    url: `${API}/user/avatar`,
    data: avatarFormData,
  });
  return data;
};

export const ChangeBanner = async (newBanner: File) => {
  const bannerFormData = new FormData();
  bannerFormData.append("banner", newBanner);

  const { data } = await Http({
    method: "post",
    url: `${API}/user/banner`,
    data: bannerFormData,
  });
  return data;
};

export const GetByUserId = async (userId: string): Promise<UserData> => {
  const { data } = await Http({
    method: "get",
    url: `${API}/user/${userId}`,
  });

  return data;
};
