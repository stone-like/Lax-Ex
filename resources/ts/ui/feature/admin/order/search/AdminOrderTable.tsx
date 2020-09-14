import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Table, Button, Icon } from "semantic-ui-react";
import { OrderLaravel } from "../../../../../core/repository/order/OrderLaravel";
import { OrderInteractor } from "../../../../../core/usecase/OrderInteractor";
import { orderEntityList } from "../../../../../core/repository/order/OrderType";
import { Order } from "../../../../../core/entity/Order";

type adminOrderTableType = {
    orderList: orderEntityList;
    setOrderList: React.Dispatch<React.SetStateAction<orderEntityList>>;
};
export const AdminOrderTable = (props: adminOrderTableType) => {
    const { orderList, setOrderList } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const repository = new OrderLaravel();
    const interactor = new OrderInteractor(repository);

    const goToUpdateOrderPage = (order: Order) => {
        history.push({
            pathname: `/admin/order/${order.id}`,
            state: {
                order
            }
        });
    };

    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>UserName</Table.HeaderCell>
                    <Table.HeaderCell>Address1</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Update</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {orderList &&
                    orderList.map(order => (
                        <Table.Row key={order.id}>
                            <Table.Cell>{order.id}</Table.Cell>
                            <Table.Cell>{order.address.userName}</Table.Cell>
                            <Table.Cell>{order.address.address1}</Table.Cell>
                            <Table.Cell>{order.order_status}</Table.Cell>

                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="blue"
                                    onClick={() => goToUpdateOrderPage(order)}
                                    data-testid="updateOrderButton"
                                >
                                    Update
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table>
    );
};
