import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Form, DropdownItemProps } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory } from "react-router";
import { NormalErrorHandler } from "../../../../../util/ErrorHandler";
import { Order } from "../../../../../core/entity/Order";
import { orderEntityList } from "../../../../../core/repository/order/OrderType";
import { OrderLaravel } from "../../../../../core/repository/order/OrderLaravel";
import { OrderInteractor } from "../../../../../core/usecase/OrderInteractor";
import Select, { OptionsType, OptionTypeBase, ValueType } from "react-select";
import {
    FormMenuContainer,
    FormMenuList
} from "../../../../app/util/css/MenuContainer";
import { OrderStatusLaravel } from "../../../../../core/repository/orderStatus/OrderStatusLaravel";
import { OrderStatusInteractor } from "../../../../../core/usecase/OrderStatusInteractor";
import { orderStatusEntityList } from "../../../../../core/repository/orderStatus/OrderStatusType";
import { AddressInfo } from "../../../checkout/addressInfo/AddressInfo";
import { OrderStatus } from "../../../../../core/entity/OrderStatus";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
type LocationState = {
    order: Order;
};
export const AdminUpdateOrder = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const order = props.location.state.order;

    const { withNormalAuthErrorHandler } = useAuthError("admin");

    const history = useHistory();
    const orderRepository = new OrderLaravel();
    const orderInteractor = new OrderInteractor(orderRepository);
    const orderStatusRepository = new OrderStatusLaravel();
    const orderStatusInteractor = new OrderStatusInteractor(
        orderStatusRepository
    );
    const [orderStatusList, setOrderStatusList] = useState<
        orderStatusEntityList
    >([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [orderErrors, setOrderErrors] = useState<string>();
    const [statusValue, setStatusValue] = useState<number>(0);
    // const orderStatusRef = useRef(null);
    const processOrderStatusList = (orderStatusList: orderStatusEntityList) => {
        return orderStatusList.map(orderStatus => {
            return { label: orderStatus.name, value: orderStatus.id };
        });
    };
    const UpdateOrderHandler = async () => {
        if (statusValue === 0) {
            return;
        }
        const orderStatusId = statusValue;
        const res = await orderInteractor.updateOrder(order.id, orderStatusId);

        if (res.isFailure()) {
            withNormalAuthErrorHandler(
                res.value,
                NormalErrorHandler,
                setOrderErrors
            );
            // NormalErrorHandler(res.value, setOrderErrors);
            return;
        }

        return history.push({
            pathname: "/admin/order"
        });
    };

    const getAllOrderStatus = async () => {
        const res = await orderStatusInteractor.getAllOrderStatus();
        setOrderStatusList(res);
        setIsLoaded(true);
    };
    useEffect(() => {
        setIsLoaded(false);
        getAllOrderStatus();
    }, []);

    const changeHandler = (
        option: ValueType<{
            label: string;
            value: number;
        }>
    ) => {
        const confirmedOption = option as {
            label: string;
            value: number;
        };
        setStatusValue(confirmedOption.value);
    };
    const isDisabled = () => {
        return statusValue === 0;
    };
    return (
        <OrderFormContainer>
            <OrderFormTitle>OrderStatusUpdate</OrderFormTitle>
            <FormMenuContainer>
                <FormMenuList>
                    UpdateTarget:
                    <AddressInfo
                        defaultAddress={order.address}
                        titleName="Address"
                    />
                </FormMenuList>
            </FormMenuContainer>
            <Form>
                <Select
                    onChange={option => changeHandler(option)}
                    options={processOrderStatusList(orderStatusList)}
                    // ref={orderStatusRef}
                />
                {orderErrors && <p>{orderErrors}</p>}
                <Form.Button
                    style={{ marginTop: "2rem" }}
                    disabled={isDisabled()}
                    onClick={UpdateOrderHandler}
                >
                    Submit
                </Form.Button>
            </Form>
        </OrderFormContainer>
    );
};
const OrderFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const OrderFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
