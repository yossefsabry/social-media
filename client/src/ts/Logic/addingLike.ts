import axios, { AxiosError } from "axios"
import { url } from "../storeData"
import { changeLove } from "../index"
import { PostInfo } from "../interface";

/**
 * Adds or removes a like from a post.
 * 
 * @param id - The ID of the post.
 * @param item - The item to be liked or unliked.
 * @returns A Promise that resolves to void.
 */
export default async function addingLike(id: number, item: string | any): Promise<void> {
    // no need for now
    const item__data: PostInfo = JSON.parse(decodeURIComponent(item));
    console.log(item__data)
    // no need for now

    const element__like: HTMLElement = (document.getElementById(`like__element_${id}`) as HTMLElement); // Type assertion to HTMLElement
    let condition: boolean = element__like.getAttribute("fill") == "red" ? true : false;

    const token: string = localStorage.getItem("token") || "";
    const headers: { authorization: string } = {
        authorization: `bearer_${token}`,
    }

    // if there bg__red for the element that mean the there is like in the post else there is no like
    if (!condition) {
        // http://localhost:5000/post/64278a91f94efbe790dc4591/react?react=like
        axios.patch(`${url}/post/${id}/react?react=like`, null, { headers: headers }).then(() => {
            console.log("the condition is ", condition)
            changeLove(true, id)
        }).catch((e: AxiosError) => {
            console.log(e)
        });
    } else {
        //http://localhost:5000/post/64271ab303dd8b398513ae85/unlike
        axios.patch(`${url}/post/${id}/unlike`, null, { headers: headers }).then(() => {
            console.log("insde delete the like")
            changeLove(false, id)
        }).catch((e: AxiosError) => {
            console.log(e)
        });
    }
};