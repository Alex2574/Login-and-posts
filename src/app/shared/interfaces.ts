import { DatePipe } from '@angular/common';

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
export interface Comment{
  author: string;
  comments: any;
  date: Date;
}
export interface FbCreateResponse {
  name: string;
}
