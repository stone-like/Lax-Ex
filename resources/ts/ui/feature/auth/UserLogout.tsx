import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LogoutLaravel } from "../../../core/repository/logout/LogoutLaravel";
import { LogoutInteractor } from "../../../core/usecase/LogoutInteractor";
import { useDispatch } from "react-redux";
import { Loader } from "semantic-ui-react";
import { useUser } from "../../../util/hooks/useUser";

export const UserLogout = () => {
    // const history = useHistory();
    // const repository = new LogoutLaravel();
    // const interactor = new LogoutInteractor(repository);
    // const dispatch = useDispatch();
    // const clearUser = () => dispatch({ type: "CLEARUSER" });

    // const LogoutHandler = async () => {
    //     await interactor.logoutUser();
    //     clearUser();
    //     history.push("/");
    // };

    //logoutしたらreload挟んだ方がよさそう
    const { userLogoutHandler } = useUser();
    useEffect(() => {
        userLogoutHandler(true)();
    }, []);
    return (
        <div>
            <Loader />
        </div>
    );
};
