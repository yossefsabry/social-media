import axios, { AxiosError } from "axios";
import { url } from "../storeData";
import { loaderHandler, createAlert, scrollTop, closeModal } from "../index"
import { AlertType } from "../interface";

// FIX MAY FROM THE SERVER
/**
 * Updates the password for the user.
 */
export default function updatePasswordUser(): void {
    const oldPassword: string = (document.querySelector("#update-user-password-modal #update__old__password") as HTMLInputElement).value;
    const newPasswrord: string = (document.querySelector("#update-user-password-modal #update__new__password") as HTMLInputElement).value;
    const confimPassword: string = (document.querySelector("#update-user-password-modal #update__confirm__password") as HTMLInputElement).value;

    const token: string = localStorage.getItem("token") || "";
    const headers: { authorization: string } = {
        authorization: `bearer_${token}`,
    };
    const data: { oldPassword: string, newPassword: string, confirmPassword: string } = {
        "oldPassword": oldPassword,
        "newPassword": newPasswrord,
        "confirmPassword": confimPassword
    }
    loaderHandler(true);
    //http://localhost:5000/user/changepassword
    axios.patch(`${url}/user/changepassword`, data, { headers: headers })
        .then(() => {
            createAlert("update the user password success..", AlertType.success);
            closeModal("update-user-info-modal")
            loaderHandler(false);
            scrollTop();
        })
        .catch((e: AxiosError<{ message: string; errors?: string[] }>) => {
            const errorMessage: string = e.response?.data?.errors?.[0] || e?.response?.data?.message || "";
            createAlert("error happened: " + errorMessage, AlertType.danger);
            console.log(e);
            loaderHandler(false);
        });
};