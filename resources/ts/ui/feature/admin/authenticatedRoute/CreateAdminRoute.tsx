import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";

type createAdminProps = {
    path: string;
    component: FunctionComponent;
};

export const CreateAdminRoute = (props: createAdminProps) => {
    //リロードしたときにadminの復帰よりもここのcheckが先になってしまうのでisLoggedInで対策
    const admin = useSelector((state: RootState) => {
        return state.admin.admin;
    });
    const { component, ...rest } = props;

    const nameList = plunkPermissionToNames(admin.permissions);

    return (
        <Route
            {...rest}
            render={() =>
                admin.isLoggedIn ? (
                    nameList.includes("createAdmin") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require CreateAdminPermission."
                                        }
                                    }
                                }
                            }}
                        />
                    )
                ) : (
                    <CustomLoader />
                )
            }
        />
    );
};
