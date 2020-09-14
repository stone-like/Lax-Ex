import React, { useEffect } from "react";
import styled from "styled-components";
import { Form } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory } from "react-router";
import { Role } from "../../../../../core/entity/Role";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { useForm, Controller } from "react-hook-form";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { Shipping } from "../../../../../core/entity/Shipping";
import { shippingEntityListType } from "../../../../../core/repository/shipping/ShippingType";
import { ShippingLaravel } from "../../../../../core/repository/shipping/ShippingLaravel";
import { ShippingInteractor } from "../../../../../core/usecase/ShippingInteractor";
import { shippingUpdateFormNameType } from "../form/ShippingFormType";
import Select from "react-select/src/Select";
import {
    FormMenuContainer,
    FormMenuList,
    MenuSpan
} from "../../../../app/util/css/MenuContainer";
import { OrderStatusLaravel } from "../../../../../core/repository/orderStatus/OrderStatusLaravel";
import { OrderStatusInteractor } from "../../../../../core/usecase/OrderStatusInteractor";
import { shippingErrorType } from "../../../../../core/error/shipping/shippingErrorType";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
type LocationState = {
    shipping: Shipping;
};
export const AdminUpdateShipping = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const shipping = props.location.state.shipping;

    const {
        withNormalAuthErrorHandler,
        withAbNormalAuthErrorHandler
    } = useAuthError("admin");

    const history = useHistory();
    const repository = new ShippingLaravel();
    const interactor = new ShippingInteractor(repository);

    const {
        register,
        errors,
        handleSubmit,
        setError,
        trigger,
        setValue,
        watch,
        formState,
        control
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: shipping.name,
            price: shipping.price
        }
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
    const errorSwitchHandler = (error: shippingErrorType) => {
        if (error.shipping_id) {
            return withAbNormalAuthErrorHandler(error);
        }
        return withNormalAuthErrorHandler(error, errorHandler, setError);
    };
    const UpdateFormHandler = async (data: any) => {
        const res = await interactor.updateShipping(
            shipping.id,
            data.name,
            data.price
        );

        if (res.isFailure()) {
            //shipping_idのときはabNormal、そのほかはNormalError

            errorSwitchHandler(res.value);
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
    const handleChange = async (e: any, name: shippingUpdateFormNameType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };

    return (
        <ShippingFormContainer>
            <ShippingFormTitle>ShippingUpdateForm</ShippingFormTitle>
            <FormMenuContainer>
                <FormMenuList>
                    UpdateTarget: <MenuSpan>{shipping.name}</MenuSpan>
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
