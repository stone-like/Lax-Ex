import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";
import { CustomArrowProps } from "react-slick";

export const NextArrow = (props: CustomArrowProps) => {
    return (
        <NextContainer onClick={props.onClick}>
            <IoIosArrowForward />
        </NextContainer>
    );
};
const NextContainer = styled.span`
    font-size: 3rem;
    color: ${Color.mainBlack};
    display: flex;
    align-items: center;
    cursor: pointer;
`;
