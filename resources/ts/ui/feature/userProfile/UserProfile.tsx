import React from "react";
import styled from "styled-components";
import { profileContent } from "./ProfileContent";
import { EachProfileCard } from "./EachProfileCard";

export const UserProfile = () => {
    return (
        <ProfileContainer>
            <ProfileTitle>UserProfile</ProfileTitle>
            <ProfileWrapper>
                {profileContent.map(eachProfile => (
                    <EachProfileCard profile={eachProfile} />
                ))}
            </ProfileWrapper>
        </ProfileContainer>
    );
};

const ProfileTitle = styled.div`
    font-size: 2rem;
    padding-left: 5rem;
`;

const ProfileContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 5rem 0;
    margin-top: 2rem;
`;

const ProfileWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    margin: 5rem auto 0 auto;
    /* grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
    grid-template-columns: repeat(auto-fit, minmax(auto, 250px));
    grid-auto-rows: 150px;

    grid-row-gap: 10rem;
    grid-column-gap: 10rem;

    justify-content: center;
`;
