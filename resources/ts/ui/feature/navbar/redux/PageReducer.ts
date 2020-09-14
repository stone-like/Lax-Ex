import { pageState } from "./PageType";
import { allPageActionType, pagePayloadType } from "./PageAction";

export const initialState: pageState = {
    page: ""
};
const setActivePage = (
    state: pageState,
    payload: pagePayloadType
): pageState => {
    return {
        ...state,
        page: payload.page
    };
};
export const PageReducer = (
    state: pageState = initialState,
    action: allPageActionType
): pageState => {
    switch (action.type) {
        case "SETACTIVEPAGE":
            return setActivePage(state, action.payload);
        default:
            return state;
    }
};
