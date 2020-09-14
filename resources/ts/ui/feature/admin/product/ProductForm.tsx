import React, { useEffect } from "react";
import { Product } from "../../../../core/entity/Product";
import { useSelector, useDispatch } from "react-redux";
import { categoryEntityListType } from "../../../../core/repository/category/CategoryType";
import { useForm } from "react-hook-form";
import { useCategory } from "../../../../util/hooks/useCategory";
import { RootState } from "../../../store/configureStore";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import * as H from "history";
import { ProductInteractor } from "../../../../core/usecase/ProductInteractor";
import { ErrorOption } from "react-hook-form/dist/types/form";
import { useHistory } from "react-router-dom";
import { ProductLaravel } from "../../../../core/repository/product/ProductLaravel";
import { setProductErrorType } from "./setErrorProduct";
import { addProduct } from "../../product/redux/ProductAction";
import { productFormNameType } from "./form/ProductFormType";

type Props = {
    product?: Product;
    FormHandler: (
        data: any,
        setError: setProductErrorType,
        getAllCategory: () => Promise<void>,
        history: H.History<{}>,
        interactor: ProductInteractor,
        addProduct?: (product: Product) => void
    ) => Promise<void>;
};
export const ProductForm = (props: Props) => {
    const { product, FormHandler } = props;
    const categoryList = useSelector((state: RootState) => {
        return state.category.categoryList;
    });
    const dispatch = useDispatch();
    const addProduct = (product: Product) => {
        dispatch({
            type: "ADDPRODUCT",
            payload: {
                product
            }
        });
    };
    const [, getAllCategory] = useCategory();
    const history = useHistory();
    const repository = new ProductLaravel();
    const interactor = new ProductInteractor(repository);
    const processCategoryList = (categoryList: categoryEntityListType) => {
        return categoryList.map(category => {
            return {
                key: category.id,
                text: category.name,
                value: category.id
            };
        });
    };
    const defaultValues =
        product === undefined
            ? {}
            : {
                  name: product.name,
                  quantity: product.quantity,
                  price: product.price,
                  weight: product.weight,
                  category_id: product.categoryId,
                  description: product.description
              };
    const {
        register,
        errors,
        handleSubmit,
        setError,
        trigger,
        setValue,
        watch,
        formState
    } = useForm({
        mode: "onChange",
        defaultValues: defaultValues
    });
    const nameValue = watch("name");
    const quantityValue = watch("quantity");
    const priceValue = watch("price");
    const weightValue = watch("weight");
    const categoryValue = watch("category_id");
    const descriptionValue = watch("description");

    useEffect(() => {
        register(
            { name: "name" },
            {
                required: true,
                minLength: { value: 3, message: "minLength is 3" }
            }
        );
        register(
            { name: "quantity" },
            {
                required: true,
                pattern: {
                    value: /^[0-9]+$/i,
                    message: "quantity is numberOnly"
                }
            }
        );
        register(
            { name: "price" },
            {
                required: true
            }
        );
        register(
            { name: "category_id" },
            {
                required: true
            }
        );
        register(
            { name: "weight" },
            {
                required: true
            }
        );
        register({ name: "description" });
    }, []);

    const FireFormHandler = (data: any) => {
        FormHandler(
            data,
            setError,
            getAllCategory,
            history,
            interactor,
            addProduct
        );
    };
    const handleChange = async (e: any, name: productFormNameType) => {
        const { value } = e.target;
        setValue(name, value);

        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };
    return (
        <ProductFormContainer>
            <ProductFormTitle>ProductForm</ProductFormTitle>
            <Form onSubmit={handleSubmit(FireFormHandler)}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label="name"
                        placeholder="name"
                        name="name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "name")
                        }
                        value={nameValue}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                    <Form.Input
                        fluid
                        label="quantity"
                        placeholder="quantity"
                        name="quantity"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "quantity")
                        }
                        value={quantityValue}
                    />
                    {errors.quantity && <p>{errors.quantity.message}</p>}
                    <Form.Input
                        fluid
                        label="price"
                        placeholder="price"
                        name="price"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "price")
                        }
                        value={priceValue}
                    />
                    {errors.price && <p>{errors.price.message}</p>}
                    <Form.Input
                        fluid
                        label="weight"
                        placeholder="weight"
                        name="weight"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "weight")
                        }
                        value={weightValue}
                    />
                    {errors.weight && <p>{errors.weight.message}</p>}
                    <div className="field">
                        <label>category</label>
                        <select
                            onChange={(e: any) =>
                                handleChange(e, "category_id")
                            }
                            name="category_id"
                            value={categoryValue}
                        >
                            <option hidden>Select Category</option>
                            {processCategoryList(categoryList).map(category => (
                                <option
                                    key={category.key}
                                    value={category.value}
                                >
                                    {category.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.category_id && <p>{errors.category_id.message}</p>}
                </Form.Group>
                <Form.TextArea
                    label="description"
                    placeholder="About Product..."
                    name="description"
                    value={descriptionValue}
                />
                <Form.Button disabled={isDisabled()}>Submit</Form.Button>
            </Form>
        </ProductFormContainer>
    );
};
const ProductFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const ProductFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
