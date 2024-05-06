import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import { url } from "../storeData";
import {createAlert, loaderHandler} from "../index.ts"
import { AlertType } from "../interface";

export default async function requestConnection(friendId: string ) {
    console.log('welcmoe')
    loaderHandler(true)
    const token: string = localStorage.getItem("token") || "";
    const headers: { authorization: string } = {
        authorization: `bearer_${token}`,
    }

    // http://localhost:5000/user/requestconnection/642706f7734cffe4ddc7ef77
    axios.patch(`${url}/user/requestconnection/${friendId}`, null ,{ headers: headers })
    .then((res) => {
        console.log(res)
        createAlert(res.data.message,  AlertType.success )
        loaderHandler(false)
    }).catch((e: AxiosError<{message: string}>) => {
        createAlert("error happend +" + e.response?.data?.message, AlertType.danger )
        loaderHandler(false)
        console.log(e)
    })

}