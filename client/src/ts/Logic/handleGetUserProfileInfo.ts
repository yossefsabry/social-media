import axios, { AxiosError, AxiosResponse } from "axios";
import { setUserLocalStorageInfo  } from "./localStorage";
import { url , user} from "../storeData";



/**
 * Handles getting the user profile information.
 * @param token - The user's authentication token.
 * @returns A Promise that resolves to void.
 */
const handleUserProfile = async (token: string): Promise<void> => {
    // console.log("inside handleUserProfile")
    const headers: { authorization: string } = {
        "authorization": `bearer_${token}`
    }
    await axios.get(`${url}/user/profile`, { headers: headers }).then((res: AxiosResponse) => {
        setUserLocalStorageInfo(res.data.user) // set the user for localstorage
        user.value = res.data.user;
    }).catch((e: AxiosError) => {
        console.log(e);
    });
}
export default handleUserProfile;
