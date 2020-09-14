import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

export const InputNews = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = useState("");
    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const SearchNewsHandler = async () => {
        history.push({
            pathname: "/admin/searchnews",
            state: {
                method: "Title",
                value: {
                    title: input
                }
            }
        });
    };
    return (
        <CustomInput
            action={{
                icon: "search",
                onClick: SearchNewsHandler
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ChangeInputHandler(e)
            }
            placeholder="SearchNews..."
        />
    );
};

const CustomInput = styled(Input)`
    margin-bottom: 3rem;
`;
