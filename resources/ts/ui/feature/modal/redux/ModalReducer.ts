import { allModalActionType } from "./ModalAction";
import { modalState, modalPayload } from "./ModalType";

const initialState: modalState = {
    modal: {
        modalType: "",
        modalProps: null
    }
};

//modalTypeとmodalStateを紐づけてswitchで分岐した方がよさそう

const openModal = (state: modalState, payload: modalPayload): modalState => {
    const { modal } = payload;
    return {
        modal: modal
    };
};

const closeModal = (state: modalState): modalState => {
    return {
        modal: {
            modalType: "",
            modalProps: null
        }
    };
};

export const ModalReducer = (
    state: modalState = initialState,
    action: allModalActionType
): modalState => {
    switch (action.type) {
        case "OPENMODAL":
            return openModal(state, action.payload);
        case "CLOSEMODAL":
            return closeModal(state);
        default:
            return state;
    }
};
