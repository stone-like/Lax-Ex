import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import Color from "../../../../app/util/css/Color";
import { useMenuHandler } from "../../../../../util/hooks/useMenuHandler";
import { Admin } from "../../../../../core/entity/Admin";
import { User } from "../../../../../core/entity/User";

type menuProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    MenuHandler: (to: string) => void;
    currentActivePage: string;
    isMarginAuto: boolean;
};

type humburgerProps = {
    active: boolean;
    isMarginAuto: boolean;
};

export const HumburgerMenu = (props: menuProps) => {
    const {
        isOpen,
        setIsOpen,
        MenuHandler,
        currentActivePage,
        isMarginAuto
    } = props;

    return (
        <Humburger
            onClick={() => setIsOpen(prev => !prev)}
            active={isOpen}
            isMarginAuto={isMarginAuto}
        >
            <span />
            <span />
            <span />
        </Humburger>
    );
};

const Humburger = styled.div`
    /* margin-left: auto; */
    margin-left: ${(props: humburgerProps) => {
        return props.isMarginAuto ? "auto" : "1.5rem";
    }};
    height: 4rem;
    width: 4rem;
    background-color: transparent;
    margin-right: 2rem;

    transition: all 0.4s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    span {
        transition: all 0.4s ease-in-out;
        height: 3px;
        width: 100%;
        background-color: ${Color.humburgerSpan};
        border-radius: 4px;
    }
    span:nth-of-type(1) {
        ${(props: humburgerProps) =>
            props.active
                ? css`
                      transform: translateY(1.9rem) rotate(-315deg) scale(0.8);
                  `
                : ""};
    }
    span:nth-of-type(2) {
        ${(props: humburgerProps) =>
            props.active
                ? css`
                      width: 4rem;
                      height: 4rem;
                      background-color: transparent;
                      border: 2px solid white;
                      border-radius: 50%;
                  `
                : ""};
    }

    span:nth-of-type(3) {
        ${(props: humburgerProps) =>
            props.active
                ? css`
                      transform: translateY(-1.9rem) rotate(315deg) scale(0.8);
                  `
                : ""}
    }
`;
