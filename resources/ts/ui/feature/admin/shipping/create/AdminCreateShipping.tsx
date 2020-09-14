import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { useForm } from "react-hook-form";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import { ShippingLaravel } from "../../../../../core/repository/shipping/ShippingLaravel";
import { ShippingInteractor } from "../../../../../core/usecase/ShippingInteractor";
import { shippingCreateFormNameType } from "../form/ShippingFormType";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

export const AdminCreateShipping = () => {
    const history = useHistory();
    const repository = new ShippingLaravel();
    const interactor = new ShippingInteractor(repository);

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
    const priceValue = watch("price");

    useEffect(() => {
        register(
            { name: "name" },
            {
                required: true
            }
        );
        register(
            { name: "price" },
            {
                required: true
            }
        );
    }, []);

    const CreateFormHandler = async (data: any) => {
        const res = await interactor.createShipping(data.name, data.price);

        if (res.isFailure()) {
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }
        return history.push({
            pathname: "/admin/shipping",
            state: {
                searchObj: {
                    input: ""
                }
            }
        });
    };
    const handleChange = async (e: any, name: shippingCreateFormNameType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };
    return (
        <ShippingFormContainer>
            <ShippingFormTitle>ShippingCreateForm</ShippingFormTitle>
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
                </Form.Group>

                <Form.Button disabled={isDisabled()}>Submit</Form.Button>
            </Form>
        </ShippingFormContainer>
    );
};
const ShippingFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const ShippingFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
