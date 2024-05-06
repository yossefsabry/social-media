import axios, { AxiosError, AxiosResponse } from "axios"
import { url } from "../storeData"
import { createAlert, loaderHandler } from "../index"
import { AlertType } from "../interface";
export default function removeConnection(id: string) {
    console.log(id)
    loaderHandler(true)
    const token: string = localStorage.getItem("token") || "";
    const headers: { authorization: string } = {
        authorization: `bearer_${token}`,
    };
    console.log("remove one connection")
    //http://localhost:5000/user/removeconnection/6426e14325fb796e7b40268c
    axios.patch(`${url}/user/removeconnection/${id}`, null, { headers: headers })
        .then((res: AxiosResponse) => {
            createAlert(res.data.message, AlertType.success)
            loaderHandler(false)
        }).catch((e: AxiosError<{ err: { message: string } }>) => {
            console.log(e)
            loaderHandler(false)
            createAlert("error happend +" + e.response?.data?.err?.message, AlertType.danger)
        })
}