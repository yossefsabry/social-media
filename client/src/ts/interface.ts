// deno-lint-ignore-file ban-types

// ========== user object ========== 
export interface User {
  username: string;
  name: string;
  id: number;
  email: string;
  posts_count: number;
  comments_count: number;
  profile_image: ProfileImage;
  author: AuthorUserPost
}

interface AuthorUserPost {
  name: string;
  id: number;
}

interface ProfileImage {
  image: string | object;
}
// ========== end user object ========== 

// ========== postInfo interface ========== 
export interface PostInfo {
  id: number;
  comments: postInfoComments;
  author: postInfoAuthor;
}
interface postInfoComments {
  [x: string]: any;
  comments: string[];
}
interface postInfoAuthor {
  name: string;
  id: number;
}
// ========== end postInfo interface ========== 


// type for the createAlert
export enum AlertType {
  danger = "danger",
  success = "success",
  info = "info"
}

// interface for comment for card
export interface CommentCard {
  body: string;
  id: number;
  author: authorComment;
}
interface authorComment {
  email: string;
  created_at: string;
  username: string;
  name: string;
  id: number;
  profile_image: Object | string;
}

// ---- interface for comment for card ----


// interface for postInfo
export interface PostInfoCard {
  author: authorPostInfo;
  id: number;
  title: string | null;
  body: string;
  comments_count: number;
  tags: string[];
  comments: string[];
  image: Object | string;
  create_at: string;
}
interface authorPostInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_image: Object | string;
}
// --- interface for postInfo ---


// --- custom window interface ---
export interface CustomWindow extends Window {
    showUserInfo?: Function;
    handleClickCard?: Function;
    handleAddingComment?: Function;
    handleClickDeleteButton?: Function;
    handleClickEditButton?: Function;
}

