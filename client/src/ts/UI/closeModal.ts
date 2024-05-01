import { Modal } from "bootstrap";
import * as bootstrap from "bootstrap";

export default function closeModal(name: string)  {
const modal: HTMLElement = (document.getElementById(`${name}`) as HTMLElement);
        const modalInstance: Modal | null = bootstrap.Modal.getInstance(modal);
        if (modalInstance !== null)
            modalInstance.hide();
        document.body.style.cssText = ` overflow: auto !important; `
        var modalBackdrop = document.querySelector('.modal-backdrop.show');
        modalBackdrop!.parentNode!.removeChild(modalBackdrop!);
}
