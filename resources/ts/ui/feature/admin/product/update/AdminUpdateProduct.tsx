import React, { Fragment, useState } from "react";
import { Product } from "../../../../../core/entity/Product";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import {
    Input,
    Form,
    DropdownItemProps,
    Image,
    Button,
    FormProps
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { categoryEntityListType } from "../../../../../core/repository/category/CategoryType";
import { AdminUpdateProductImage } from "./AdminUpdateProductImage";
import { imageObjListType } from "./ImageType";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { productImageErrorType } from "../../../../../core/error/product/productErrorType";
import { AdminCreateProductImage } from "./AdminCreateProductImage";
import { AdminUpdateForm } from "./AdminUpdateForm";
type LocationState = {
    product: Product;
};

export const AdminUpdateProduct = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const product = props.location.state.product;
    return (
        <Fragment>
            <AdminUpdateForm product={product} />
            <AdminUpdateProductImage productImages={product.images} />
            <AdminCreateProductImage productId={product.id} />
        </Fragment>
    );
};
