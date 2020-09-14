import styled, { css } from "styled-components";
import Color from "./Color";

type inputProps = {
    value: string;
    name: string;
};

const getRequiredOrNot = (name: string): string => {
    switch (name) {
        case "postCodeH":
            return "*";
        case "postCodeE":
            return "*";

        // case "Prefecture":
        //     return "*";
        case "Address1":
            return "*";

        case "Address2":
            return "";

        case "Name":
            return "*";

        case "PhoneNumber":
            return "";
        case "cardName":
            return "*";
        case "email":
            return "*";
        case "password":
            return "*";
        case "password_confirmation":
            return "*";
        case "name":
            return "*";
    }
};
export const InputContent = styled.input`
    padding: 12px;
    font-size: 14px;
    border: 1px solid ${Color.border};
    width: 100%;
    margin-bottom: 18px;
    color: #888;
    font-family: "Lato", "sans-serif";
    font-size: 16px;
    font-weight: 300;

    background-color: ${Color.mainWhite};

    &:focus,
    &:hover {
        outline: none;
        border-color: ${Color.borderFocus};
    }
`;
export const CheckContainer = styled.div`
    position: absolute;
    right: 0px;
    top: -20px;
`;

export const LabelContent = styled.label`
    position: absolute;
    left: 8px;
    top: 8px;
    width: 60%;
    color: ${Color.inputContentColor};
    font-size: 16px;
    display: inline-block;
    padding: 4px 10px;
    font-weight: 400;
    background-color: ${Color.mainWhite};
    transition: color 0.3s, top 0.3s;

    &::after {
        
        color: ${Color.inputContentColor};
        /* contentは''で囲まないと機能しないので注意 */
        content: '${(props: inputProps) => {
            return getRequiredOrNot(props.name);
        }}'
    }

    ${(props: inputProps) => {
        return (
            props.value !== "" &&
            css`
                top: -13px;
                color: ${Color.sidebarBlack};
                width: auto;
            `
        );
    }}
`;

export const InputContainer = styled.div`
    text-align: left;
    position: relative;
    flex:1;
    width:100%;
    
    
    & ${InputContent}:focus  + ${LabelContent} {
            top: -13px;
            color: #555;
            width: auto;
        }

     & ${InputContent}:focus,${InputContent}:hover + ${LabelContent}{
            color: ${Color.sidebarBlack};
            cursor: text;
  }
`;
