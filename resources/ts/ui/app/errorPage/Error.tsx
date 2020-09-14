import React from "react";
import { ErrorPageError } from "../../../util/ErrorPageError";
import { productErrorType } from "../../../core/error/product/productErrorType";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { permissionToRoleErrorType } from "../../../core/error/role/roleErrorType";
import { authErrorType } from "../../feature/admin/authenticatedRoute/authErrorType";
import styled from "styled-components";
import { cardErrorType } from "../../../core/error/card/cardErrorType";
import { orderStatusErrorType } from "../../../core/error/orderStatus/orderStatusErrorType";
import { withAuthErrorType } from "../../../util/ErrorType";
type LocationState = {
    error: {
        errors: withAuthErrorType;
    };
};

export const Error = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const errors = props.location.state.error.errors;
    return (
        <ErrorContainer>
            <h1>Error Has Occured!</h1>
            <h2>ErrorMessage:</h2>
            {errors.category_id && (
                <StrictP>category_id:{errors.category_id[0]}</StrictP>
            )}
            {errors.prefecture_id && (
                <StrictP>prefecture_id:{errors.prefecture_id[0]}</StrictP>
            )}
            {errors.address_id && (
                <StrictP>address_id:{errors.address_id[0]}</StrictP>
            )}
            {errors.user_id && <StrictP>user_id:{errors.user_id[0]}</StrictP>}
            {errors.admin_id && (
                <StrictP>admin_id:{errors.admin_id[0]}</StrictP>
            )}
            {errors.permission_id && (
                <StrictP>permission_id:{errors.permission_id[0]}</StrictP>
            )}
            {errors.discount_id && (
                <StrictP>discount_id:{errors.discount_id[0]}</StrictP>
            )}
            {errors.shipping_id && (
                <StrictP>shipping_id:{errors.shipping_id[0]}</StrictP>
            )}
            {errors.rowId && <StrictP>rowId:{errors.rowId[0]}</StrictP>}
            {errors.name && <StrictP>name:{errors.name[0]}</StrictP>}
            {errors.price && <StrictP>price:{errors.price[0]}</StrictP>}
            {errors.weight && <StrictP>weight:{errors.weight[0]}</StrictP>}
            {errors.quantity && (
                <StrictP>quantity:{errors.quantity[0]}</StrictP>
            )}
            {errors.product_id && (
                <StrictP>product_id:{errors.product_id[0]}</StrictP>
            )}
            {errors.order_status_id && (
                <StrictP>order_status_id:{errors.order_status_id[0]}</StrictP>
            )}
            {errors.order_id && (
                <StrictP>order_status_id:{errors.order_id[0]}</StrictP>
            )}
            {errors.role_id && <StrictP>role_id:{errors.role_id}</StrictP>}
            {errors.auth && <StrictP>{errors.auth}</StrictP>}
            {errors.card && <StrictP>{errors.card[0]}</StrictP>}
        </ErrorContainer>
    );
};

const ErrorContainer = styled.div`
    padding: 2rem;
`;

const StrictP = styled.p`
    font-weight: 400;
    font-size: 1.4rem;
    color: red;
`;
