import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { StaticContext, RouteComponentProps } from "react-router";
import { News } from "../../../../core/entity/News";
import { newsEntityListType } from "../../../../core/repository/news/NewsType";
import { allNewsSearchType } from "../news/search/newsSearchType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";
type newsProps = {
    news: News;
};

type LocationState = newsProps | allNewsSearchType;
type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type createNewsProps = {
    path: string | string[];
    component: componentType;
};
export const CreateNewsRoute = (props: createNewsProps) => {
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
                    nameList.includes("createNews") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require CreateNewsPermission."
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
