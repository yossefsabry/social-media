// deno-lint-ignore-file ban-types

// ========== user object ========== 
export interface User {
  headline?: string;
  age: number;
  name: string;
  _id: number;
  connections?: userConnection;
  confimEmail: boolean;
  password?: string;
  createdAt: string;
  images?: userImages;
  phone: string;
  role: string;
  gender: string;
  email: string;
  status: string;
}

export interface userIdInfo {
  name: string;
  _id: number;
  images: userImages;
}

interface userImages {
  cover?: {
    url: string;
  };
  profile?: {
    url: string;
  }
}

interface userConnection {
  accepted: Array<any>;
  requested: Array<any>;
}

// ========== end user object ========== 

// ========== postInfo interface ========== 
export interface PostInfo {
  _id: number;
  comments?: postInfoComments[];
  userId: postInfoAuthor;
  title: string;
  reactions: postReactions;
  isDeleted: boolean;
  isPrivate: boolean;
  createdAt: string;
  images: Array<postImages>;
}
interface postImages {
  url: string;
  public_id: string;
}
export interface postInfoComments {
  postId: string;
  replies: Array<any>;
  reactions?: postReactions;
  text: string;
  _id: string;
  userId?: postInfoAuthor;
}
export interface postInfoAuthor {
  name: string;
  _id: number;
  images: userImages;
}
interface postReactions {
  like: Array<any>;
  love?: Array<any>;
  funny?: Array<any>;
  support?: Array<any>;
}
// ========== end postInfo interface ========== 


// type for the createAlert
export enum AlertType {
  danger = "danger",
  success = "success",
  info = "info"
}


// --- custom window interface ---
export interface CustomWindow extends Window {
  showUserInfo?: Function;
  handleClickCard?: Function;
  handleAddingComment?: Function;
  handleClickDeleteButton?: Function;
  handleClickEditButton?: Function;
  addingLike?: Function;
  sharePost?: Function;
  settingCurrentPost?: Function;
}

