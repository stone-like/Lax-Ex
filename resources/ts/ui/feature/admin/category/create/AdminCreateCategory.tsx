import React, { useEffect } from "react";
import { setCategoryErrorType } from "../setErrorCategory";
import * as H from "history";
import { Category } from "../../../../../core/entity/Category";
import { CategoryInteractor } from "../../../../../core/usecase/CategoryInteractor";
import styled from "styled-components";
import { Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { CategoryLaravel } from "../../../../../core/repository/category/CategoryLaravel";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { categoryCreateFormNameType } from "../form/CategoryFormType";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
export const AdminCreateCategory = () => {
    const dispatch = useDispatch();
    const addCategory = (category: Category) => {
        dispatch({
            type: "ADDCATEGORY",
            payload: {
                category
            }
        });
    };
    const history = useHistory();
    const repository = new CategoryLaravel();
    const interactor = new CategoryInteractor(repository);

    const { withNormalAuthErrorHandler } = useAuthError("admin");
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
        mode: "onChange"
    });
    const nameValue = watch("name");

    useEffect(() => {
        register(
            { name: "name" },
            {
                required: true
            }
        );
    }, []);

    const CreateFormHandler = async (data: any) => {
        const res = await interactor.createCategory({
            name: data.name
        });

        if (res.isFailure()) {
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }
        //redux
        addCategory(res.value);
        return history.push({
            pathname: "/admin/category",
            state: {
                searchObj: {
                    input: ""
                }
            }
        });
    };
    const handleChange = async (e: any, name: categoryCreateFormNameType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };
    return (
        <CategoryFormContainer>
            <CategoryFormTitle>CategoryCreateForm</CategoryFormTitle>
            <Form onSubmit={handleSubmit(CreateFormHandler)}>
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
                </Form.Group>

                <Form.Button disabled={isDisabled()}>Submit</Form.Button>
            </Form>
        </CategoryFormContainer>
    );
};
const CategoryFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const CategoryFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
