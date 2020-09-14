import { modalPayload } from "./ModalType";

export type openModalType = {
    type: "OPENMODAL";
    payload: modalPayload;
};
export const openModal = (payload: modalPayload): openModalType => ({
    type: "OPENMODAL",
    payload
});

export type closeModalType = {
    type: "CLOSEMODAL";
};

export const closeModal = (): closeModalType => ({
    type: "CLOSEMODAL"
});

export type allModalActionType =
    | ReturnType<typeof openModal>
    | ReturnType<typeof closeModal>;
