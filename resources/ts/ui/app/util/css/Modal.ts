import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import Breakpoint from "./BreakPoint";
import Zindex from "./Zindex";
import Color from "./Color";

type Props = {
    width?: number;
    height?: number;
};
export const ModalHeader = styled.div`
    font-size: 3rem;
    height: 10%;
    color: black;
    font-weight: 400;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 5rem 5rem;
`;

export const ModalContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 3rem 3rem;
`;

export const ModalImage = styled.div``;

export const ModalDescription = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`;

export const ModalActions = styled.div`
    height: 10%;
    display: flex;
`;
export const ModalDrop = styled.div`
    z-index: ${Zindex.modalOuter};
    /* 外のz-indexより中の白いほうのをz-indexが高くなるようにする */
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    /* display:flex;
    justify-content:center;
    align-items:center; */
`;
const customMedia = generateMedia({
    breakpoint: `${Breakpoint.mobile}px`
});
export const ModalContainer = styled.div`
    margin-left: 20%;
    width: 100%;
    height: 100%;
    position: absolute;
    /* background: rgba(0, 0, 0, 0.8); */

    ${customMedia.lessThan("breakpoint")`
     margin-top:6vh;
     margin-left:0;
    `}
`;

export const ModalWrapper = styled.div`
    position: relative;
    top: 50%;
    left: 30%;
    transform: translate(-30%, -50%);
    background: white;
    z-index: ${Zindex.modalInner};

    display: flex;
    flex-direction: column;

    width: ${(props: Props) => (props.width ? `${props.width}%` : "60%")};
    height: ${(props: Props) => (props.height ? `${props.height}%` : "85%")};
    ${customMedia.lessThan("breakpoint")`
     width:90%;
     height:75%;
      left: 50%;
  transform: translate(-50%, -50%);
    `} /* heightはcontentの内容に合わせる */

    border-radius:1%;
`;

export const ModalDivider = styled.div`
    background-color: ${Color.modalDivider};
    height: 1px;
    width: 100%;
`;
