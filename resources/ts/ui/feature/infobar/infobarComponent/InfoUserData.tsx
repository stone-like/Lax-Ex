import React from "react";
import { User } from "../../../../core/entity/User";
import styled from "styled-components";

type Props = {
    user: User;
};
export const InfoUserData = (props: Props) => {
    const { user } = props;
    return (
        <>
            {user.isLoggedIn ? (
                <AccountMenu>{user.name}</AccountMenu>
            ) : (
                <AccountMenu>Not LoggedIn</AccountMenu>
            )}
        </>
    );
};

const AccountMenu = styled.div`
    margin-left: auto;
    margin-right: 2rem;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
