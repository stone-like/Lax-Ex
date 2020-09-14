import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const InputAdmin = () => {
    const history = useHistory();

    const [input, setInput] = useState("");
    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const SearchAdminHandler = async () => {
        history.push({
            pathname: "/admin/searchadmin",
            state: { searchObj: { input } }
        });
    };
    return (
        <CustomInput
            action={{
                icon: "search",
                onClick: SearchAdminHandler
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ChangeInputHandler(e)
            }
            placeholder="SearchAdmin..."
        />
    );
};
const CustomInput = styled(Input)`
    margin-bottom: 3rem;
`;
