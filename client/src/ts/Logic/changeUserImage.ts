import axios,{ AxiosError } from "axios"
import { url } from "../storeData"
import { loaderHandler, createAlert, closeModal } from "../index"
import { AlertType } from "../interface";

export async function changeUserImageProfile(): Promise<void> {
    loaderHandler(true)
    let image: File;
    let imageElement: HTMLInputElement | null;
    imageElement = (document.querySelector("#change__image__profile__input") as HTMLInputElement);

    if (imageElement !== null && imageElement.files !== null && imageElement.files.length > 0) {
        image = imageElement.files[0];
        if (image === null) {
            return;
        };
    }

    const formData: FormData = new FormData();
    formData.append("profile", image!); // fix used before assigned

    const token: string = localStorage.getItem('token') || '';
    const headers: { authorization: string } = {
        authorization: `bearer_${token}`,
    }

    const res = await axios.patch(`${url}/user/uploadpic`, formData, { headers: headers }).then(() => {
        createAlert('success upload image', AlertType.success)
        closeModal("image_profile_modal");
        loaderHandler(false)
    }).catch((e: AxiosError<{ err: { message: string }; errors: string[] }>) => { // Updated type of the error object
        loaderHandler(false)
        console.log(e)
        createAlert('error happend: ' + e?.response?.data?.err?.message || e?.response?.data?.errors[0] || "", AlertType.danger)
    });
    return res
};

export async function changeUserImageCover() {

    loaderHandler(true)
    let image: File;
    let imageElement: HTMLInputElement | null;
    imageElement = (document.querySelector("#change__image__cover__input") as HTMLInputElement);

    if (imageElement !== null && imageElement.files !== null && imageElement.files.length > 0) {
        image = imageElement.files[0];
        if (image === null) {
            return;
        };
    }

    const formData: FormData = new FormData();
    formData.append("cover", image!); // fix used before assigned

    const token: string = localStorage.getItem('token') || '';
    const headers: { authorization: string } = {
        authorization: `bearer_${token}`,
    }

    await axios.patch(`${url}/user/uploadcover`, formData, { headers: headers }).then(() => {
        createAlert('success upload image', AlertType.success)
        closeModal("image_cover_modal");
        loaderHandler(false)
    }).catch((e: AxiosError<{ err: { message: string }; errors: string[] }>) => {
        loaderHandler(false)
        console.log(e)
        createAlert('error happend: ' + e?.response?.data?.err?.message || e?.response?.data?.errors[0] || "", AlertType.danger)
    });
};
