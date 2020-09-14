import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import Breakpoint from "./Breakpoint";

const customMedia = generateMedia({
    upper: "1000px",
    lower: `${Breakpoint.mobile}px`
});

type ButtonProps = {
    paddingX: number;
    paddingY: number;
    color?: string;
    breakpoint1?: number;
    breakpoint2?: number;
    onClick?:
        | (() => void)
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
};
export const BorderButton = styled.button`
    background: transparent;
    border: 0.2px solid black;
    color: ${(props: ButtonProps) => (props.color ? props.color : "black")};
    border-color: ${(props: ButtonProps) =>
        props.color ? props.color : "black"};
    font-size: 1.6rem;
    padding: ${(props: ButtonProps) =>
        `${props.paddingX}rem ${props.paddingY}rem`};
    cursor: pointer;
    transition: all 0.4s ease-in-out;

    ${customMedia.between("lower", "upper")`
    padding: 0.7rem 0.7rem;
    font-size:1.2rem;
  `}

    /* 横並びにしたいのでinlineblock */
  display: inline-block;
    &:hover {
        background: ${(props: ButtonProps) =>
            props.color ? props.color : "black"};
        color: white;
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        background: grey;
        color: white;
        cursor: default;
    }
`;
