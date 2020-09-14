import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import Color from "../../../app/util/css/Color";
import { useHistory } from "react-router-dom";
import { useMenuHandler } from "../../../../util/hooks/useMenuHandler";

type Props = {
    width: number;
};
export const InfoProductSearch = (props: Props) => {
    const { width } = props;

    const history = useHistory();
    const [input, setInput] = useState("");
    const { setActivePageHandler } = useMenuHandler(false);
    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const SearchInputHandler = async () => {
        setActivePageHandler("products");

        return history.push({
            pathname: "/products",
            state: {
                method: "Name",
                value: { name: input },
                page: 1
            }
        });
    };
    return (
        <SearchContainer width={width}>
            <SearchInput
                placeholder="What are you looking for?"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    ChangeInputHandler(e)
                }
            />
            <SearchDiv onClick={SearchInputHandler}>
                <AiOutlineSearch />
            </SearchDiv>
        </SearchContainer>
    );
};

const SearchContainer = styled.div`
    width: ${(props: Props) => (props.width ? `${props.width}%` : "25%")};
    position: relative;
    display: flex;
    padding-right: 3rem;
`;
const SearchInput = styled.input`
    width: 100%;
    border-bottom: 1px solid ${Color.mainBlack};
    border-top: none;
    border-right: none;
    border-left: none;

    padding: 5px;
    /* border-radius: 5px 0 0 5px; */
    outline: none;
    color: #9dbfaf;
    &:focus {
        color: ${Color.mainBlack};
        outline: none;
    }
    background-color: ${Color.mainWhite};
`;
const SearchDiv = styled.div`
    width: 40px;
    height: 50px;
    /* border: 1px solid ${Color.mainBlack}; */
    background: ${Color.mainBlack};

    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    /* border-radius: 0 5px 5px 0; */
    cursor: pointer;
    font-size: 20px;

    &:hover {
        background-color: ${Color.focusBlack};
    }

    i {
        color: #0052cc;
    }
`;
