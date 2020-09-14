import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Table, Button, Icon } from "semantic-ui-react";
import { OrderStatusLaravel } from "../../../../../core/repository/orderStatus/OrderStatusLaravel";
import { OrderStatusInteractor } from "../../../../../core/usecase/OrderStatusInteractor";
import { orderStatusEntityList } from "../../../../../core/repository/orderStatus/OrderStatusType";
import styled from "styled-components";
import {
    FooterButtonContainer,
    ButtonContainer
} from "../../../../app/util/css/TableFooter";

type adminOrderStatusTableType = {
    orderStatusList: orderStatusEntityList;
    setOrderStatusList: React.Dispatch<
        React.SetStateAction<orderStatusEntityList>
    >;
};
export const AdminOrderStatusTable = (props: adminOrderStatusTableType) => {
    const { orderStatusList, setOrderStatusList } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const repository = new OrderStatusLaravel();
    const interactor = new OrderStatusInteractor(repository);

    const GoToCreateOrderStatusPage = () => {
        history.push("/admin/createOrderStatus");
    };

    const DeleteFormReactState = (orderStatusId: number) => {
        const newList = orderStatusList.filter(orderStatus => {
            return orderStatus.id !== orderStatusId;
        });

        setOrderStatusList(newList);
    };
    const DeleteOrderStatusHandler = async (orderStatusId: number) => {
        const res = await interactor.deleteOrderStatus(orderStatusId);
        if (res.isFailure()) {
            return (
                <Redirect
                    to={{
                        pathname: "/admin/error",
                        state: { error: res.value }
                    }}
                />
            );
        }
        DeleteFormReactState(orderStatusId);
        return;
    };

    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>name</Table.HeaderCell>

                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {orderStatusList &&
                    orderStatusList.map(orderStatus => (
                        <Table.Row key={orderStatus.id}>
                            <Table.Cell>{orderStatus.name}</Table.Cell>

                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="red"
                                    onClick={() =>
                                        DeleteOrderStatusHandler(orderStatus.id)
                                    }
                                    data-testid="deleteOrderStatusButton"
                                >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan="6">
                        <FooterButtonContainer>
                            <ButtonContainer>
                                <Button
                                    floated="right"
                                    icon
                                    labelPosition="left"
                                    primary
                                    size="small"
                                    onClick={GoToCreateOrderStatusPage}
                                    data-testid="addOrderStatusButton"
                                >
                                    <Icon name="shopping cart" /> Add
                                    OrderStatus
                                </Button>
                            </ButtonContainer>
                        </FooterButtonContainer>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};
