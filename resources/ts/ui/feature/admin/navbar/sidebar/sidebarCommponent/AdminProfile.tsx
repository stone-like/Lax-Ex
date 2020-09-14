import React, { Fragment } from "react";
import { Admin } from "../../../../../../core/entity/Admin";
import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import BreakPoint from "../../../../../app/util/css/BreakPoint";

type AdminProfileProps = {
    admin: Admin;
};
export const AdminProfile = (props: AdminProfileProps) => {
    const { admin } = props;

    return (
        <ProfileContainer>
            {admin.isLoggedIn ? (
                <Fragment>
                    <ProfileName>name:{admin.name}</ProfileName>
                    <ProfileRole>role:{admin.role}</ProfileRole>
                </Fragment>
            ) : (
                <NotLoggIned>Make Sure You are LoggedIn</NotLoggIned>
            )}
        </ProfileContainer>
    );
};
const customMedia = generateMedia({
    breakpoint: `${BreakPoint.adminProfile}px`
});

const ProfileContainer = styled.div`
    margin-top: 3rem;
    height: 10%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProfileName = styled.div`
    font-size: 1.8rem;
    margin-bottom: 1rem;
`;
const ProfileRole = styled.div`
    font-size: 1.8rem;
`;

const NotLoggIned = styled.div`
    font-size: 1.8rem;
    padding: 0.2rem 0.5rem;
    white-space: nowrap;

    ${customMedia.lessThan("breakpoint")`
        font-size:1.3rem;
    `}
`;
