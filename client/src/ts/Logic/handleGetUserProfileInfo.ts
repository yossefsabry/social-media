import axios, { AxiosError } from "axios";
import { setUserLocalStorageInfo } from "./localStorage";
import { url } from "../storeData";



const handleUserProfile = async (token: string) => {
    
    console.log("inside handleUserProfile")

    const headers: any = {
        "authorization": `bearer_${token}`
    }
    await axios.get(`${url}/user/profile`, { headers:  headers }).then((res) => {
        console.log(res);
        setUserLocalStorageInfo(res.data.user) // set the user for localstorage
    }).catch((e: AxiosError) => {
        console.log(e);
    });
}
export default handleUserProfile;