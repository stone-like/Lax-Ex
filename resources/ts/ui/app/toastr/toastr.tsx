import React from "react";
import { toastr } from "react-redux-toastr";
import styled from "styled-components";

export const createToastr = (productName: string, productImagePath: string) => {
    const toastrOptions = {
        timeOut: 3000,
        icon: <CustomImage src={productImagePath} />,
        showCloseButton: true,
        closeOnToastrClick: true
    };
    const title = "Item Added";
    const message = `${productName} is successfully Added!`;
    toastr.message(title, message, toastrOptions);
};

const CustomImage = styled.img``;
