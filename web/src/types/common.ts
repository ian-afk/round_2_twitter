export interface SignInI {
  email: string;
  password: string;
}
export interface SignupI {
  email: string;
  password: string;
  fullName: string;
  username: string;
}

export interface UserI {
  username: string;
  fullName: string;
  _id: string;
}

export interface CommentI {
  createdAt: string;
  text: string;
  user: UserI;
  _id: string;
}
export interface DataI {
  content: string;
  _id: string;
  createdAt: string;
  user: UserI;
  comments: CommentI[];
}
