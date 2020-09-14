import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export const InputCategory = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = useState("");
    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const SearchCategoryHandler = async () => {
        history.push({
            pathname: "/admin/searchcategory",
            state: { searchObj: { input } }
        });
    };
    return (
        <CustomInput
            action={{
                icon: "search",
                onClick: SearchCategoryHandler
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ChangeInputHandler(e)
            }
            placeholder="SearchCategory..."
        />
    );
};
const CustomInput = styled(Input)`
    margin-bottom: 3rem;
`;
