import React, { useEffect, FormEvent, Fragment } from "react";
import { Product } from "../../../../../core/entity/Product";
import { Form, DropdownItemProps } from "semantic-ui-react";
import { categoryEntityListType } from "../../../../../core/repository/category/CategoryType";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { useForm } from "react-hook-form";
import { MdAirlineSeatIndividualSuite } from "react-icons/md";
import styled from "styled-components";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { useHistory } from "react-router-dom";
import { useCategory } from "../../../../../util/hooks/useCategory";
import { ErrorOption } from "react-hook-form/dist/types/form";
import * as H from "history";
import { ProductForm } from "../productForm";
import { setProductErrorType } from "../setErrorProduct";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type adminUpdateFormType = {
    product: Product;
};
export const AdminUpdateForm = (props: adminUpdateFormType) => {
    const { product } = props;
    const { withNormalAuthErrorHandler } = useAuthError("admin");
    const UpdateFormHandler = async (
        data: any,
        setError: setProductErrorType,
        getAllCategory: () => Promise<void>,
        history: H.History,
        interactor: ProductInteractor
    ) => {
        const res = await interactor.updateProduct(
            {
                name: data.name,
                description: data.description,
                weight: data.weight,
                price: data.price,
                quantity: data.quantity,
                category_id: data.category_id
            },
            product.id
        );
        if (res.isFailure()) {
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }

        getAllCategory();
        return history.push("/admin/products");
    };

    return <ProductForm product={product} FormHandler={UpdateFormHandler} />;
};
