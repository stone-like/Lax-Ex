import { useDispatch } from "react-redux";
import { Admin } from "../../core/entity/Admin";
import { PersistLocalStorage } from "../../core/repository/persist/PersistLocalStorage";
import { PersistInteractor } from "../../core/usecase/PersistInteractor";
import { LogoutLaravel } from "../../core/repository/logout/LogoutLaravel";
import { LogoutInteractor } from "../../core/usecase/LogoutInteractor";
import { useHistory } from "react-router-dom";

export const useAdmin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const setAdmin = (admin: Admin) =>
        dispatch({ type: "SETADMIN", payload: { admin } });
    const clearAdmin = () => dispatch({ type: "CLEARADMIN" });
    const persistRepository = new PersistLocalStorage();
    const persistInteractor = new PersistInteractor(persistRepository);
    const logoutRepository = new LogoutLaravel();
    const logoutInteractor = new LogoutInteractor(logoutRepository);

    const ttl = 60 * 60 * 1000; //60Minutes;,単位がmillsecondなので×1000をしてsecondにしないといけない
    const setAdminHandler = (admin: Admin) => {
        setAdmin(admin);
        persistInteractor.setLocalStorageWithExpiry("admin", admin, ttl);
    };

    const adminLogoutHandler = async () => {
        //普通のadminlogoutでも使うんだけど、ユーザーページに行った際にも使う
        //もしlocalにadminが残っていればlogout、なければ何もしない
        //なのでユーザーページに行ったときにadminがlocalに残っている最初の一回のみ起動することを想定している
        const res = persistInteractor.getAdminFromLocalStorage();
        if (res.isFailure()) {
            return;
        }
        await logoutInteractor.logoutAdmin();
        clearAdmin();
        persistInteractor.removeLocalStorage("admin");

        // if (fromName === "user") {
        //     return history.push("/");
        // }
        // return history.push("/admin");
    };

    const restoreFromLocalStorageHandler = () => {
        const res = persistInteractor.getAdminFromLocalStorage();

        if (res.isFailure()) {
            return; //特にエラーというわけではなく、ただrestoreするものがなかっただけの話
        }
        setAdmin(res.value);
    };

    return {
        setAdminHandler,
        adminLogoutHandler,
        restoreFromLocalStorageHandler
    };
};
