export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Post {
  id?: string;
  title: string;
  text: string;
  author: string;
  date: Date;
  updateTime?: Date;
  comments: CommentBlock[];
}

export interface Questionnaire {
  id?: string;
  date: Date;
  gender?: string;
  birthDate: Date;
  ageGroup: number;
  education: string;
  employee: string;
  gross: number;
  email: string;
}
export interface Messages {
  message: string;
}
export interface CommentBlock {
  commentsInfo: string;
  author: string;
  comments: string;
  date: Date;
  email: string;
  msg: any;
  message: string;
  post: string;
}
export interface Comment {
  author: string;
  comments: any;
  date: Date;
}
export interface FbCreateResponse {
  name: string;
}
