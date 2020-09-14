import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LogoutLaravel } from "../../../../core/repository/logout/LogoutLaravel";
import { LogoutInteractor } from "../../../../core/usecase/LogoutInteractor";
import { useDispatch } from "react-redux";
import { Loader } from "semantic-ui-react";
import { useAdmin } from "../../../../util/hooks/useAdmin";

export const AdminLogout = () => {
    // const history = useHistory();
    // const repository = new LogoutLaravel();
    // const interactor = new LogoutInteractor(repository);
    // const dispatch = useDispatch();
    // const clearAdmin = () => {
    //     dispatch({
    //         type: "CLEARADMIN"
    //     });
    // };

    // const LogoutHandler = async () => {
    //     await interactor.logoutAdmin();
    //     clearAdmin();
    //     history.push("/admin");
    // };
    const { adminLogoutHandler } = useAdmin();
    useEffect(() => {
        adminLogoutHandler();
    }, []);
    return (
        <div>
            <Loader />
        </div>
    );
};
