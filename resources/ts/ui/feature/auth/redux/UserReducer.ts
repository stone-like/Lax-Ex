import { userState } from "./UserType";
import { User } from "../../../../core/entity/User";
import { allUserActionType, userPayloadType } from "./UserAction";

//もし一つのreducerにつき、ひとつのEntity対応ならStateはEntityでいいけど、
//一つのreducerで複数Entity使うなら{user:～、history:~}みたいにstateをobjectで管理しなくてはいけない,一応今回は複数Entity取れるようにしているが、Userとかはstate=Entityで良さそうな気もする
export const initialState: userState = {
    user: new User(null, "", "", [], "", false)
};

const setUser = (state: userState, payload: userPayloadType): userState => {
    //ここでnew　Userとしなくていいのはそもそもフロント側のrepositoryでdataを受け取り、repository→usecaseの際にnew　Userをしているから
    //心配なら改めてここでnew　Userしてもいいかもしれないけど・・・

    return {
        ...state,
        user: payload.user
    };
};

const clearUser = (state: userState): userState => {
    return {
        ...state,
        user: new User(null, "", "", [], "", false)
    };
};

//toDo:sepecificationPattern
export const UserReducer = (
    state: userState = initialState,
    action: allUserActionType
): userState => {
    switch (action.type) {
        case "SETUSER":
            return setUser(state, action.payload);
        case "CLEARUSER":
            return clearUser(state);
        default:
            return state;
    }
};
