import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

export const InputOrderStatus = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = useState("");
    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const SearchOrderStatusHandler = async () => {
        history.push({
            pathname: "/admin/orderStatus",
            state: { searchObj: { input } }
        });
    };
    return (
        <CustomInput
            action={{
                icon: "search",
                onClick: SearchOrderStatusHandler
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ChangeInputHandler(e)
            }
            placeholder="SearchOrderStatus..."
        />
    );
};

const CustomInput = styled(Input)`
    margin-bottom: 3rem;
`;
