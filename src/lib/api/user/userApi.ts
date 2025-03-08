import { UserData } from "../../../types/user.types";
import { Http, API } from "../../../constants/api";
import { CompressionImage } from "../../../utils/images.utils";

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
