import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { useForm } from "react-hook-form";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import { DiscountLaravel } from "../../../../../core/repository/discount/DiscountLaravel";
import { DiscountInteractor } from "../../../../../core/usecase/DiscountInteractor";
import { discountCreateFormNameType } from "../form/DiscountFormType";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

export const AdminCreateDiscount = () => {
    const history = useHistory();
    const repository = new DiscountLaravel();
    const interactor = new DiscountInteractor(repository);

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
    const codeValue = watch("discountCode");
    const priceValue = watch("discountPrice");

    useEffect(() => {
        register(
            { name: "discountCode" },
            {
                required: true
            }
        );
        register(
            { name: "discountPrice" },
            {
                required: true
            }
        );
    }, []);

    const CreateFormHandler = async (data: any) => {
        const res = await interactor.createDiscount(
            data.discountCode,
            data.discountPrice
        );

        if (res.isFailure()) {
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }
        return history.push({
            pathname: "/admin/discounts",
            state: {
                searchObj: {
                    input: ""
                }
            }
        });
    };
    const handleChange = async (e: any, name: discountCreateFormNameType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };
    return (
        <DiscountFormContainer>
            <DiscountFormTitle>DiscountCreateForm</DiscountFormTitle>
            <Form onSubmit={handleSubmit(CreateFormHandler)}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label="discountCode"
                        placeholder="discountCode"
                        name="discountCode"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "discountCode")
                        }
                        value={codeValue}
                    />
                    <Form.Input
                        fluid
                        label="discountPrice"
                        placeholder="discountPrice"
                        name="discountPrice"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "discountPrice")
                        }
                        value={priceValue}
                    />
                </Form.Group>

                <Form.Button disabled={isDisabled()}>Submit</Form.Button>
            </Form>
        </DiscountFormContainer>
    );
};
const DiscountFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const DiscountFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
