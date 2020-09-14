import React from "react";
import styled from "styled-components";
import Color from "./Color";

type Props = {
    height: number;
    color: string;
};
export const Border = (props: Props) => {
    const { height, color } = props;
    return <CustomBorder height={height} color={color} />;
};

const CustomBorder = styled.div`
    height: ${(props: Props) => {
        return props.height + "px";
    }};
    width: 100%;
    background-color: ${(props: Props) => {
        return props.color;
    }};
`;
