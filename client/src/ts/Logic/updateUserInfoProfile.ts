import axios, { AxiosError } from "axios";
import { url } from "../storeData";
import { loaderHandler, createAlert, scrollTop, closeModal } from "../index"
import { AlertType } from "../interface";


export default function updateUserInfoProfile() {
    const username = (document.querySelector("#update-user-info-modal #name-update") as HTMLInputElement).value;
    const headline = (document.querySelector("#update-user-info-modal #headline-update") as HTMLInputElement).value;
    const phone = (document.querySelector("#update-user-info-modal #phone-update") as HTMLInputElement).value;
    const gender = (document.querySelector("#update-user-info-modal #gender-update") as HTMLInputElement).value;

    const token: string | null = localStorage.getItem("token") == null ? null : localStorage.getItem("token");
    const headers: { authorization: string } = {
        authorization: `bearer_${token}`,
    };
    const data = {
        "name": username,
        "phone": phone,
        "headline": headline,
        "gender": gender
    }
    loaderHandler(true);
    //http://localhost:5000/user/update  let title: string;
    axios.patch(`${url}/user/update`, data, { headers: headers })
        .then(() => {
            createAlert("update the user info success", AlertType.success);
            closeModal("update-user-info-modal")
            loaderHandler(false);
            scrollTop();
        })
        .catch((e: AxiosError<{ message: string }>) => {
            createAlert("error happend: " + e?.response?.data?.message, AlertType.danger)
            console.log(e);
            loaderHandler(false);
        });

    console.log("update user info");
};