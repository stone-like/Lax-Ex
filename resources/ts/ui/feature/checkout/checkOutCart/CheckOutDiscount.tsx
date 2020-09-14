import React, { useState } from "react";
import Color from "../../../app/util/css/Color";
import styled from "styled-components";
import { DiscountInteractor } from "../../../../core/usecase/DiscountInteractor";
import { DiscountLaravel } from "../../../../core/repository/discount/DiscountLaravel";
import { useDispatch } from "react-redux";
import { Cart } from "../../../../core/entity/Cart";
import { AiOutlineSearch, AiOutlineMoneyCollect } from "react-icons/ai";
export const CheckOutDiscount = () => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const repository = new DiscountLaravel();
    const interactor = new DiscountInteractor(repository);
    const dispatch = useDispatch();
    const setCart = (cart: Cart) => {
        dispatch({
            type: "SETCART",
            payload: {
                cart
            }
        });
    };
    const setDiscountHandler = async () => {
        const res = await interactor.setDiscount(input);

        if (res.isFailure()) {
            //discountErrorTypeにあるdiscount_idのエラーはここでは出ない
            return setError(res.value.discountCode[0]);
        }

        setCart(res.value);
    };

    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setInput(e.target.value);
    };

    return (
        <AllContainer>
            <TitleContainer>DiscountCode</TitleContainer>
            <SearchContainer>
                <SearchInput
                    placeholder="Enter DiscountCode"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        ChangeInputHandler(e)
                    }
                />
                <SearchDiv onClick={setDiscountHandler}>
                    <AiOutlineMoneyCollect />
                </SearchDiv>
            </SearchContainer>
            {error && <ErrorP>{error}</ErrorP>}
        </AllContainer>
    );
};
const ErrorP = styled.p`
    color: red;
    font-weight: 600;
`;
const TitleContainer = styled.div`
    font-size: 2rem;
`;
const AllContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 3rem;
`;
const SearchContainer = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    padding-right: 3rem;
    margin-top: 1rem;
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
