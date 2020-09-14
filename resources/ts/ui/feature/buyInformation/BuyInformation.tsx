import React from "react";
import { StaticContext } from "react-router";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { Order } from "../../../core/entity/Order";
import styled from "styled-components";
import { InformationProductList } from "./InformationProductList";
import { InformationAddress } from "./InformationAddress";

type LocationState = {
    order: Order;
};
export const BuyInformation = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const order = props.location.state.order;

    return (
        <InformationContainer>
            <InformationWrapper>
                <InformationTitle>Shopping Complete</InformationTitle>
                <InformationProductList order={order} />
                <InformationAddress address={order.address} />
            </InformationWrapper>
        </InformationContainer>
    );
};

const InformationContainer = styled.div`
    width: 100%;
    padding: 2rem;
`;
const InformationWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const InformationTitle = styled.div`
    font-size: 2rem;
    justify-self: center;
    align-self: center;
`;
