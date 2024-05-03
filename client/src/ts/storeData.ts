import { PostInfo, User } from "./interface";

// variable globel
export const url: string = "http://localhost:5000"; // the main url
export const postArray: { value: [] } = { value: [] }; // for the posts in getReqeust
export const currentPage: { value: number } = { value: 1 }; // for the pagination
export const lastPage: { value: number } = { value: 1 }; // for the pagination
export const postInfo: { value: PostInfo | undefined } = { value: undefined }; // for the current click post info
export const user: { value: User | undefined } = { value: undefined } // for user
// const updatePost: boolean = false;
export const idPost: { value: number | undefined } = { value: undefined };   // for the post id handle for the delete and update
export const currentPostClick: { value: PostInfo | undefined } = { value: undefined }; // for the post click
export const isFetching: { value: boolean } = { value: false }; // for the pagination
