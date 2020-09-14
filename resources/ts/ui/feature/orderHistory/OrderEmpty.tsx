import React from "react";
import styled from "styled-components";

export const OrderEmpty = () => {
    return (
        <EmptyContainer>
            <EmptyTitle>Your Order is Empty</EmptyTitle>
        </EmptyContainer>
    );
};

const EmptyContainer = styled.div`
    width: 100%;
`;
const EmptyTitle = styled.div`
    font-size: 2rem;
`;
