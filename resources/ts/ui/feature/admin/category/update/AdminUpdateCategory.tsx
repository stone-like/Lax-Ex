import React, { useEffect } from "react";
import { Category } from "../../../../../core/entity/Category";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory } from "react-router";
import { categoryUpdateFormNameType } from "../form/CategoryFormType";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { useForm } from "react-hook-form";
import { CategoryLaravel } from "../../../../../core/repository/category/CategoryLaravel";
import { CategoryInteractor } from "../../../../../core/usecase/CategoryInteractor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { categoryEntityListType } from "../../../../../core/repository/category/CategoryType";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import {
    FormMenuContainer,
    FormMenuList,
    MenuSpan
} from "../../../../app/util/css/MenuContainer";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type LocationState = {
    category: Category;
};
export const AdminUpdateCategory = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const category = props.location.state.category;
    const dispatch = useDispatch();
    const updateCategory = (category: Category) => {
        dispatch({
            type: "UPDATECATEGORY",
            payload: {
                category
            }
        });
    };

    const { withNormalAuthErrorHandler } = useAuthError("admin");

    const history = useHistory();
    const repository = new CategoryLaravel();
    const interactor = new CategoryInteractor(repository);

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
        defaultValues: {
            name: category.name
        }
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

    const UpdateFormHandler = async (data: any) => {
        const res = await interactor.updateCategory(
            { name: data.name },
            category.id
        );

        if (res.isFailure()) {
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }
        //redux
        updateCategory(res.value);
        return history.push({
            pathname: "/admin/category",
            state: {
                searchObj: {
                    input: ""
                }
            }
        });
    };
    const handleChange = async (e: any, name: categoryUpdateFormNameType) => {
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
            <FormMenuContainer>
                <FormMenuList>
                    UpdateTarget: <MenuSpan>{category.name}</MenuSpan>
                </FormMenuList>
            </FormMenuContainer>
            <Form onSubmit={handleSubmit(UpdateFormHandler)}>
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
