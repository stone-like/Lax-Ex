import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { InputUser } from "./InputUser";
import { Loader } from "semantic-ui-react";
import { userSearchType, searchUserObjType } from "./userSearchType";
import { StaticContext, Redirect, RouteComponentProps } from "react-router";
import { UserLaravel } from "../../../../../core/repository/user/UserLaravel";
import { UserInteractor } from "../../../../../core/usecase/UserInteractor";
import { AdminUserTable } from "./AdminUserTable";
import { userEntityListType } from "../../../../../core/repository/user/userType";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

//RouteComponentProps<{}, StaticContext, ?>は?の部分をgenericsとして使いまわしした方がいいかも(importも面倒だし)
export const AdminSearchUser = (
    props: RouteComponentProps<{}, StaticContext, userSearchType>
) => {
    const searchObj = props.location.state.searchObj;
    const [userList, setUserList] = useState<userEntityListType>();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");

    const repository = new UserLaravel();
    const interactor = new UserInteractor(repository);
    const SearchFromBackend = async (searchObj: searchUserObjType) => {
        return await interactor.searchByName(searchObj.input);
    };
    const SetAllUser = async () => {
        const userList = await interactor.getAllUser();
        setUserList(userList);
    };

    const SearchUser = async () => {
        if (searchObj === undefined) {
            return;
        }
        if (searchObj.input === "") {
            await SetAllUser();

            return;
        }

        const res = await SearchFromBackend(searchObj);
        if (res.isFailure()) {
            //通常発生しないvalidationErrorが起こった時
            return (
                // <Redirect
                //     to={{
                //         pathname: "/admin/error",
                //         state: { error: res.value }
                //     }}
                // />
                withAbNormalAuthErrorHandler(res.value)
            );
        }
        setUserList(res.value); //useStateがすぐには反映されない問題
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchUser();
    }, [searchObj]);

    useEffect(() => {
        setIsLoaded(true);
    }, [userList]);
    return (
        <SearchUserContainer>
            <InputUser />
            {isSearchObjLoaded ? (
                <AdminUserTable userList={userList} setUserList={setUserList} />
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchUserContainer>
    );
};
const SearchUserContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
