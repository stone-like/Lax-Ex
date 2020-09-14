import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { categoryEntityListType } from "../../../../../core/repository/category/CategoryType";
import { useForm } from "react-hook-form";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { useHistory } from "react-router-dom";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { useCategory } from "../../../../../util/hooks/useCategory";
import { Product } from "../../../../../core/entity/Product";
import * as H from "history";
import { ErrorOption } from "react-hook-form/dist/types/form";
import { ProductForm } from "../productForm";
import { setProductErrorType } from "../setErrorProduct";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

export const AdminCreateProductForm = () => {
    const { withNormalAuthErrorHandler } = useAuthError("admin");
    const CreateFormHandler = async (
        data: any,
        setError: setProductErrorType,
        getAllCategory: () => Promise<void>,
        history: H.History,
        interactor: ProductInteractor,
        addProduct: (product: Product) => void
    ) => {
        const res = await interactor.createProduct({
            name: data.name,
            description: data.description,
            weight: data.weight,
            price: data.price,
            quantity: data.quantity,
            category_id: data.category_id
        });
        if (res.isFailure()) {
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }

        addProduct(res.value);
        getAllCategory();
        history.push("/admin/products");
    };

    return <ProductForm FormHandler={CreateFormHandler} />;
};
