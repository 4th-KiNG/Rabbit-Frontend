import { UserData } from "../../../types/user.types";
import { Http, API } from "../../../constants/api";
import { CompressionImage } from "../../../utils/images.utils";
import { ChangePasswordValues } from "../../../pages/SettingsPage/SettingsInput/SettingsInput.types";

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
  const smallAvatar = await CompressionImage(newAvatar);
  avatarFormData.append("avatar", smallAvatar);

  const { data } = await Http({
    method: "post",
    url: `${API}/user/avatar`,
    data: avatarFormData,
  });
  return data;
};

export const ChangeBanner = async (newBanner: File) => {
  const bannerFormData = new FormData();
  const smallBanner = await CompressionImage(newBanner);
  bannerFormData.append("banner", smallBanner);

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

export const SubToUser = async (userId: string) => {
  const { data } = await Http({
    method: "patch",
    url: `${API}/user/${userId}`,
    params: {
      status: "subscribe",
    },
  });
  return data;
};

export const UnSubToUser = async (userId: string) => {
  const { data } = await Http({
    method: "patch",
    url: `${API}/user/${userId}`,
    params: {
      status: "unsubscribe",
    },
  });
  return data;
};

export const SendNewPassword = async (email: string) => {
  const { data } = await Http({
    method: "get",
    url: `${API}/auth/recoverPassword`,
    params: {
      email: email,
    },
  });
  return data;
};

export const ChangePassword = async (values: ChangePasswordValues) => {
  const { data } = await Http({
    method: "post",
    url: `${API}/user/changePassword`,
    data: values,
  });
  return data;
};
