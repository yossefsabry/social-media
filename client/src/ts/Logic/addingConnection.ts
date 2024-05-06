import axios, { AxiosError, AxiosResponse } from "axios";
import { createAlert, loaderHandler } from "../index";
import { url } from "../storeData";
import { AlertType } from "../interface";


export default function addingConnection( idFriend: string) {
    console.log("adding connection");

    console.log(idFriend);
    loaderHandler(true)
    const token: string = localStorage.getItem("token") || "";
    const headers: { authorization: string } = {
        authorization: `bearer_${token}`,
    };
    //http://localhost:5000/user/acceptconnection/6426e14325fb796e7b40268c?connection=accept
    axios.patch(`${url}/user/acceptconnection/${idFriend}?connection=accept`, null, { headers: headers })
        .then((res: AxiosResponse) => {
            createAlert(res.data.message, AlertType.success)
            loaderHandler(false)
        }).catch((e: AxiosError<{ err: { message: string } }>) => {
            console.log(e)
            loaderHandler(false)
            createAlert("error happend +" + e.response?.data?.err?.message, AlertType.danger)
        })
};