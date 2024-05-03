import { Modal } from "bootstrap";
import * as bootstrap from "bootstrap";

// Fix problem when closeing modal
/**
 * Closes a modal by hiding it and removing the modal backdrop.
 * @param name - The name of the modal to close.
 */
export default function closeModal(name: string): void  {
const modal: HTMLElement = (document.getElementById(`${name}`) as HTMLElement);
        const modalInstance: Modal | null = bootstrap.Modal.getInstance(modal);
        if (modalInstance !== null)
            modalInstance.hide();
        document.body.style.cssText = ` overflow: auto !important; `
        let modalBackdrop: HTMLElement = (document.querySelector('.modal-backdrop.show') as HTMLElement);
        modalBackdrop!.parentNode!.removeChild(modalBackdrop!);
}
