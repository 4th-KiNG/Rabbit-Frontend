export interface PostsResponse {
  posts: PostProps[];
  total: number;
}

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
  tags: string[];
  images: File[];
}
