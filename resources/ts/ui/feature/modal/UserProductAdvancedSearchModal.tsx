import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Zindex from "../../app/util/css/Zindex";
import { useDispatch, useSelector } from "react-redux";
import Color from "../../app/util/css/Color";
import { useSpring } from "react-spring";
import { setTimeout } from "timers";
import { closeModal } from "./redux/ModalAction";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store/configureStore";
import { categoryEntityListType } from "../../../core/repository/category/CategoryType";
import { DropdownItemProps } from "semantic-ui-react";
import {
    multipleSearchType,
    MultipleSearchInputTransformation
} from "../../../core/dto/product/productDTOType";
import { UserProductModalRight } from "./UserProductModalRight";
import { customMedia } from "../../app/util/css/Media";

type openProps = {
    isOpen: boolean;
};
export const UserProductAdvancedSearchModal = () => {
    const dispatch = useDispatch();
    const [inputValue, setInput] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const CloseModal = () =>
        dispatch({
            type: "CLOSEMODAL"
        });

    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const CloseModalHandler = () => {
        setIsOpen(false);
        setTimeout(() => {
            CloseModal();
        }, 400);
    };
    useEffect(() => {
        setIsOpen(true);
    }, []);
    return (
        <ModalContainer>
            <ModalLeft onClick={CloseModalHandler} isOpen={isOpen}>
                <BottomArrow>↓</BottomArrow>
                <LeftExplain>Click To Back</LeftExplain>
            </ModalLeft>
            <ModalRight isOpen={isOpen}>
                <UserProductModalRight
                    ChangeInputHandler={ChangeInputHandler}
                    CloseModalHandler={CloseModalHandler}
                    inputValue={inputValue}
                />
            </ModalRight>
        </ModalContainer>
    );
};

const ModalContainer = styled.div`
    z-index: ${Zindex.userProductModal};

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    display: flex;
`;
const ModalLeft = styled.div`
    z-index: ${Zindex.userProductModalLeft};
    height: 100%;
    width: 50%;
    background-color: ${Color.mainBlack};

    transition: transform 0.4s ease-in-out;
    transform: ${(props: openProps) => {
        return props.isOpen ? "translateY(0%)" : "translateY(100%)";
    }};

    color: ${Color.mainWhite};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${customMedia.lessThan("breakpoint")`
      display:none;
    `}
`;
const BottomArrow = styled.div`
    font-size: 7rem;
`;
const LeftExplain = styled.div`
    margin-top: 10rem;
    font-size: 5rem;
`;
const ModalRight = styled.div`
    height: 100%;
    width: 50%;
    background-color: ${Color.mainWhite};

    transition: transform 0.4s ease-in-out;
    transform: ${(props: openProps) => {
        return props.isOpen ? "translateY(0%)" : "translateY(-100%)";
    }};

    ${customMedia.lessThan("breakpoint")`
      width:100%;
    `}
`;
