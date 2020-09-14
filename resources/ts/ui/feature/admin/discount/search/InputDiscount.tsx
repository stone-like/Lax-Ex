import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

export const InputDiscount = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = useState("");
    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const SearchDiscountHandler = async () => {
        history.push({
            pathname: "/admin/discount",
            state: { searchObj: { input } }
        });
    };
    return (
        <CustomInput
            action={{
                icon: "search",
                onClick: SearchDiscountHandler
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ChangeInputHandler(e)
            }
            placeholder="SearchDiscount..."
        />
    );
};

const CustomInput = styled(Input)`
    margin-bottom: 3rem;
`;
