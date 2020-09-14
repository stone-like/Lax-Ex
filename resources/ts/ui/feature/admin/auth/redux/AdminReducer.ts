import { Admin } from "../../../../../core/entity/Admin";
import { adminState } from "./AdminType";
import { adminPayloadType, allAdminActionType } from "./AdminAction";

export const initialState: adminState = {
    admin: new Admin(null, "", "", [], "", null, false)
};

const setAdmin = (state: adminState, payload: adminPayloadType): adminState => {
    return {
        ...state,
        admin: payload.admin
    };
};

const clearAdmin = (state: adminState): adminState => {
    return {
        ...state,
        admin: new Admin(null, "", "", [], "", null, false)
    };
};

//toDo:sepecificationPattern
export const AdminReducer = (
    state: adminState = initialState,
    action: allAdminActionType
): adminState => {
    switch (action.type) {
        case "SETADMIN":
            return setAdmin(state, action.payload);
        case "CLEARADMIN":
            return clearAdmin(state);
        default:
            return state;
    }
};
