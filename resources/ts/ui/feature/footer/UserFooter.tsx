import React from "react";
import styled, { keyframes } from "styled-components";
import Color from "../../app/util/css/Color";

export const UserFooter = () => {
    const logoNavLi = ["about us", "Blog", "contact"];
    const followNavLi = ["twitter", "line", "instagram"];
    return (
        <FooterContainer>
            <FooterLogo>Lax</FooterLogo>
            <FooterFollow>Follow Us</FooterFollow>
            <FooterLogoNav>
                <FooterLogoNavUl>
                    {logoNavLi.map((name, index) => (
                        <FooterLogoNavLi key={index}>
                            <FooterLogoNavLiContent>
                                {name}
                            </FooterLogoNavLiContent>
                        </FooterLogoNavLi>
                    ))}
                </FooterLogoNavUl>
            </FooterLogoNav>
            <FooterFollowNav>
                <FooterFollowNavUl>
                    {followNavLi.map((name, index) => (
                        <FooterFollowNavLi key={index}>
                            <FooterFollowNavLiContent>
                                {name}
                            </FooterFollowNavLiContent>
                        </FooterFollowNavLi>
                    ))}
                </FooterFollowNavUl>
            </FooterFollowNav>
            <FooterCopyRight>Copyright © 2020 Lax.</FooterCopyRight>
        </FooterContainer>
    );
};

const borderAnimation = keyframes`
0%{
    width:0%;
}
100%{
    width:100%;
}
`;

const FooterContainer = styled.div`
    height: 35vh;
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 20% 1fr 25%;
    grid-template-areas:
        "areaA areaB"
        "areaC areaD"
        "areaC areaE";

    background-color: ${Color.mainWhite};
    color: ${Color.mainBlack};
`;
const FooterLogo = styled.div`
    grid-area: areaA;
    /* background-color: red; */

    font-size: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
`;
const FooterFollow = styled.div`
    grid-area: areaB;
    /* background-color: blue; */

    font-size: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    background-color: ${Color.mainBlack};
    color: ${Color.mainWhite};
`;
const FooterLogoNav = styled.div`
    grid-area: areaC;
    /* background-color: yellow; */
    padding: 3rem 3rem 3rem 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FooterLogoNavUl = styled.ul`
    width: 100%;
    height: 100%;
    list-style: none;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;
const FooterLogoNavLi = styled.li``;
const FooterLogoNavLiContent = styled.div`
    display: inline-block;
    position: relative;
    cursor: pointer;

    &::after {
        position: absolute;
        bottom: -4px;
        left: 0;
        content: "";
        width: 100%;
        height: 1px;
        background-color: ${Color.mainBlack};
        transform: scale(0, 1);
        transform-origin: right top;
        transition: transform 0.4s;
    }
    &:hover::after {
        transform-origin: left top;
        transform: scale(1, 1);
    }
`;

const FooterFollowNav = styled.div`
    grid-area: areaD;
    /* background-color: green; */
    padding: 2rem 2rem 2rem 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Color.mainBlack};
    color: ${Color.mainWhite};
`;

const FooterFollowNavUl = styled.ul`
    width: 100%;
    height: 100%;
    list-style: none;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;
const FooterFollowNavLi = styled.li``;
const FooterFollowNavLiContent = styled.div`
    display: inline-block;
    position: relative;
    cursor: pointer;
    &::after {
        position: absolute;
        bottom: -4px;
        left: 0;
        content: "";
        width: 100%;
        height: 1px;
        background-color: ${Color.mainWhite};
        transform: scale(0, 1);
        transform-origin: right top;
        transition: transform 0.4s;
    }
    &:hover::after {
        transform-origin: left top;
        transform: scale(1, 1);
    }
`;
const FooterCopyRight = styled.div`
    grid-area: areaE;
    /* background-color: purple; */

    font-weight: 400;
    display: flex;
    justify-content: flex-end;
    padding-right: 7rem;
    padding-top: 1.5rem;
    background-color: ${Color.mainBlack};
    color: ${Color.mainWhite};
`;
