import { Document, Types } from "mongoose";


export interface IUsers extends Document {
    username: string;
    email: string;
    password: string;
    location: string;
    createdAt?: Date;
}

export interface IUserPayload {
    id: string
    email: string;

  }
   
  export interface IUserResponse extends IUsers {
      id: number;
  }
   
   
  export interface IUserLogin {
      username: string;
      password: string;
  }