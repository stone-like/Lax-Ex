import React, { useRef, useState } from "react";
import styled from "styled-components";
import Color from "../../../../../app/util/css/Color";
import Zindex from "../../../../../app/util/css/Zindex";
import {
    useSpring,
    animated,
    useTransition,
    useChain,
    ReactSpringHook
} from "react-spring";
import { Link, useHistory } from "react-router-dom";
import { Admin } from "../../../../../../core/entity/Admin";
import { humbugerLoginPages } from "../../../../navbar/pages/humbugerLoginPages";
import { humbugerLogoutPages } from "../../../../navbar/pages/humbugerLogoutPages";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/configureStore";
import { CategoryMenu } from "../../../../navbar/sidebar/sidebarComponent/categoryComplement/CategoryMenu";
import { CategoryListComplement } from "../../../../navbar/topbar/topbarComponent/CategoryListComplement";
import { adminHumbugerLoginPages } from "../../pages/adminHumbugerLoginPages";
import { adminHumbugerLogoutPages } from "../../pages/adminHumbugerLogoutPages";

type navigationProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    MenuHandler: (to: string) => void;
    currentActivePage: string;
    isLoggedIn: boolean;
};

export const AdminHumbugerNavigation = (props: navigationProps) => {
    const {
        currentActivePage,
        MenuHandler,
        isOpen,
        setIsOpen,
        isLoggedIn
    } = props;
    const history = useHistory();

    const GoToAnotherPageHandler = (to: string) => {
        MenuHandler(to);
        setIsOpen(false);
    };

    //animation
    const navigationMenuRef = useRef<ReactSpringHook>(null);
    const navProps = useSpring({
        from: { height: "0%" },
        to: { height: isOpen ? "92vh" : "0%" },
        ref: navigationMenuRef,
        config: { duration: 400 }
    });

    const transitionRef = useRef<ReactSpringHook>(null);

    const getTransitionItemsHandler = () => {
        if (!isOpen) {
            return [];
        }

        return isLoggedIn ? adminHumbugerLoginPages : adminHumbugerLogoutPages;
    };

    const transitions = useTransition(
        getTransitionItemsHandler(),
        item => item.to,
        {
            ref: transitionRef,
            trail: 100,
            from: {
                transform: "translateX(-100vw)"
            },
            enter: {
                transform: "translateX(0)"
            },
            leave: { transform: "translateX(-100vw)" }
        }
    );

    useChain(
        isOpen
            ? [navigationMenuRef, transitionRef]
            : [transitionRef, navigationMenuRef],
        [0, isOpen ? 0.5 : 0.1]
    );
    return (
        <NavigationMenu style={navProps}>
            {transitions.map(({ item, key, props }) => (
                <CustomDiv
                    key={key}
                    style={props}
                    onClick={() => GoToAnotherPageHandler(item.to)}
                >
                    {item.title}
                </CustomDiv>
            ))}
        </NavigationMenu>
    );
};

const CategoryContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const CustomLink = styled(animated(Link))`
    font-size: 5rem;
    color: ${Color.mainWhite};
    text-decoration: none;
`;
const CustomDiv = styled(animated.div)`
    font-size: 3rem;
    color: ${Color.mainBlack};
    cursor: pointer;

    &:hover {
        color: "blue";
    }
`;

//navigationMenuをTopMenuの高さだけmagirnかけて下において普段はheight0にしておけばいい
const NavigationMenu = styled(animated.div)`
    /* z-indexがないと背景のが出てきてしまう */
    z-index: ${Zindex.topMenu};

    /* position:fixedがないと表示されない */
    /* absoluteでも表示はされるけどfixしてないので下にぶれてしまってoverflowが意味なくなる */
    position: fixed;

    /* scrollしてしまうときにhiddenにすることによりnavigation出現時にscrollをさせない */
    overflow-y: hidden;

    margin-top: 8vh;

    width: 100%;
    background: ${Color.mainWhite};
    transition: all 0.4s ease-in-out;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    /* padding: 2rem; */
    align-items: center;
`;
