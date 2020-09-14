import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { customMedia } from "../../../../app/util/css/Media";

type multipleSearchButtonType = {
    modalName: string;
};
export const MultipleSearchButton = (props: multipleSearchButtonType) => {
    const { modalName } = props;
    const dispatch = useDispatch();
    const openModal = (modalName: string) => {
        dispatch({
            type: "OPENMODAL",
            payload: {
                modal: {
                    modalType: modalName,
                    modalProps: null
                }
            }
        });
    };

    const ModalOpenHandler = () => {
        openModal(modalName);
    };
    return (
        <ButtonContainer>
            <Button basic size="huge" onClick={ModalOpenHandler}>
                Advanced Search
            </Button>
        </ButtonContainer>
    );
};

const ButtonContainer = styled.div`
    margin-left: auto;
    margin-right: 3rem;

    ${customMedia.lessThan("breakpoint")`
       margin-left:0;
       margin-right:0;
       margin-top:4rem;
    `}
`;
