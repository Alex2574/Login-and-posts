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
  comments: any;
}

export interface CommentBlock {
  author: string;
  comment: any;
  date: Date;
  email: string;
  msg: string;
  message: string;
}
export interface Comment{
  author: string;
  comments: any;
  date: Date;
}
export interface FbCreateResponse {
  name: string;
}
