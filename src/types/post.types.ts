export interface PostProps {
  id: string;
  title: string;
  ownerId: string;
  commentsId?: string[];
  likesId?: string[];
  text?: string;
  image?: string;
  createDate: Date;
}

export interface ICreatePost {
  title: string;
  text: string;
}
