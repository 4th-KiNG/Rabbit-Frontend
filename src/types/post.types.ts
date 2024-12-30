export interface PostProps {
  id: string;
  title: string;
  ownerId: string;
  commentsId?: string[];
  likesId?: string[];
  text?: string;
  image?: string;
  createDate: Date;
  images: [];
}

export interface ICreatePost {
  title: string;
  text: string;
  images: File[];
}
