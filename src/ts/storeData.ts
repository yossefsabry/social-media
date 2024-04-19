import { PostInfoCard, User } from "./interface";

// variable globel
export const url: string = "https://tarmeezacademy.com/api/v1"; // the main url
export let postArray: { value: [] } = { value: [] }; // for the posts in getReqeust
export let currentPage: { value: number } = { value: 1 }; // for the pagination
export let lastPage: { value: number } = { value: 1 }; // for the pagination
export let postInfo: { value: PostInfoCard | undefined } = { value: undefined }; // for the current click post info
export let user: { value: User | undefined} = { value: undefined} // for user
// let updatePost: boolean = false;
export let idPost: { value: number | undefined } = { value: undefined };   // for the post id handle for the delete and update
export let currentPostClick: { value: PostInfoCard | undefined } = { value: undefined }; // for the post click
export let isFetching: { value: boolean } = { value: false }; // for the pagination
