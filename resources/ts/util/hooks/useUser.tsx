import { useDispatch } from "react-redux";
import { User } from "../../core/entity/User";
import { PersistLocalStorage } from "../../core/repository/persist/PersistLocalStorage";
import { PersistInteractor } from "../../core/usecase/PersistInteractor";
import { LogoutLaravel } from "../../core/repository/logout/LogoutLaravel";
import { LogoutInteractor } from "../../core/usecase/LogoutInteractor";
import { useHistory } from "react-router-dom";

export const useUser = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const setUser = (user: User) =>
        dispatch({ type: "SETUSER", payload: { user } });
    const clearUser = () => dispatch({ type: "CLEARUSER" });
    const persistRepository = new PersistLocalStorage();
    const persistInteractor = new PersistInteractor(persistRepository);
    const logoutRepository = new LogoutLaravel();
    const logoutInteractor = new LogoutInteractor(logoutRepository);

    const ttl = 60 * 60 * 1000; //60Minutes;,単位がmillsecondなので×1000をしてsecondにしないといけない

    const setUserHandler = (user: User) => {
        setUser(user);
        persistInteractor.setLocalStorageWithExpiry("user", user, ttl);
    };

    const userLogoutHandler = async () => {
        await logoutInteractor.logoutUser();
        clearUser();
        persistInteractor.removeLocalStorage("user");

        // if (fromName === "admin") {
        //     return history.push("/admin");
        // }
        // return history.push("/");
    };

    const restoreFromLocalStorageHandler = () => {
        const res = persistInteractor.getUserFromLocalStorage();

        if (res.isFailure()) {
            return; //特にエラーというわけではなく、ただrestoreするものがなかっただけの話
        }
        setUser(res.value);
    };

    return {
        setUserHandler,
        userLogoutHandler,
        restoreFromLocalStorageHandler
    };
};
