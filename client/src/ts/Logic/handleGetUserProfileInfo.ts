import axios, { AxiosError, AxiosResponse } from "axios";
import { setUserLocalStorageInfo } from "./localStorage";
import { url, user } from "../storeData";
import { User } from "../interface";
import {updateNavFriendMenu} from "../index"



/**
 * Handles getting the user profile information.
 * @param token - The user's authentication token.
 * @returns A Promise that resolves to void.
 */
const handleUserProfile = async (token: string, id?: null | string): Promise<any> => {
    // console.log("inside handleUserProfile")
    const headers: { authorization: string } = {
        "authorization": `bearer_${token}`
    }
    return new Promise(async (reslove, reject) => {
        if (id == null) {
            await axios.get(`${url}/user/profile`, { headers: headers }).then((res: AxiosResponse) => {
                setUserLocalStorageInfo(res.data.user) // set the user for localstorage
                user.value = res.data.user;
                reslove(res.data.user)
                updateNavFriendMenu()
                return res.data.user;
            }).catch((e: AxiosError<{ message: string }>) => {
                reject(e.response?.data.message)
                console.log(e.response?.data.message);
            });
        } else {
            let userData: User;
            //http://localhost:5000/user/6426d9b58e106b6d72bdbbc2/profile
            await axios.get(`${url}/user/${id}/profile`, { headers: headers }).then((res: AxiosResponse) => {
                userData = res.data.user;
                reslove(userData)
                updateNavFriendMenu()
                return userData;
            }).catch((e: AxiosError<{ message: string }>) => {
                reject(e.response?.data.message)
                console.log(e.response?.data.message);
            });
        }
    })
}
export default handleUserProfile;
