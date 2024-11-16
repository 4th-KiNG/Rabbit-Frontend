export interface PostProps {
  id: string;
  title: string;
  userId: string;
  commentsId?: string[];
  likesId?: string[];
  text?: string;
  image?: string;
  createDate: Date;
}
