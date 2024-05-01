import axios from "axios"
import { Modal } from "bootstrap";
import * as bootstrap from "bootstrap";
import { url } from "../storeData"
import { loaderHandler, createAlert } from "../index"
import { AlertType } from "../interface";

export async function changeUserImageProfile(): Promise<any> {

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

    const token = localStorage.getItem('token') || '';
    const headers: any = {
        authorization: `bearer_${token}`,
    }

    const res = await axios.patch(`${url}/user/uploadpic`, formData, { headers: headers }).then((response) => {
        createAlert('success upload image', AlertType.success)
        console.log(response)
        const modal: HTMLElement = (document.getElementById("image_profile_modal") as HTMLElement);
        const modalInstance: Modal | null = bootstrap.Modal.getInstance(modal);
        if (modalInstance !== null)
            modalInstance.hide();
        document.body.style.cssText = ` overflow: auto !important; `
        var modalBackdrop = document.querySelector('.modal-backdrop.show');
        modalBackdrop!.parentNode!.removeChild(modalBackdrop!);
        loaderHandler(false)
    }).catch((e) => {
        loaderHandler(false)
        // console.log(e)
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

    const token = localStorage.getItem('token') || '';
    const headers: any = {
        authorization: `bearer_${token}`,
    }

    const res = await axios.patch(`${url}/user/uploadcover`, formData, { headers: headers }).then((response) => {
        createAlert('success upload image', AlertType.success)
        // console.log(response)
        const modal: HTMLElement = (document.getElementById("image_cover_modal") as HTMLElement);
        const modalInstance: Modal | null = bootstrap.Modal.getInstance(modal);
        if (modalInstance !== null)
            modalInstance.hide();
        document.body.style.cssText = ` overflow: auto !important; `
        var modalBackdrop = document.querySelector('.modal-backdrop.show');
        modalBackdrop!.parentNode!.removeChild(modalBackdrop!);
        loaderHandler(false)
    }).catch((e) => {
        loaderHandler(false)
        console.log(e)
        createAlert('error happend: ' + e?.response?.data?.err?.message || e?.response?.data?.errors[0] || "", AlertType.danger)
    });
    return res

};