export interface UserData {
  id: string;
  username: string;
  email: string;
  regDate: string;
  birthDate?: string;
  commentsId?: string[];
  postsId?: string[];
  subscribersId?: string[];
  subscriptionsId?: string[];
  sex?: string;
}
