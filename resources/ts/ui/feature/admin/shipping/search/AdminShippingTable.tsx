import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { Role } from "../../../../../core/entity/Role";
import { Table, Button, Icon } from "semantic-ui-react";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { Shipping } from "../../../../../core/entity/Shipping";
import { shippingEntityListType } from "../../../../../core/repository/shipping/ShippingType";
import { ShippingLaravel } from "../../../../../core/repository/shipping/ShippingLaravel";
import { ShippingInteractor } from "../../../../../core/usecase/ShippingInteractor";
import {
    FooterButtonContainer,
    ButtonContainer
} from "../../../../app/util/css/TableFooter";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type adminShippingTableType = {
    shippingList: shippingEntityListType;
    setShippingList: React.Dispatch<
        React.SetStateAction<shippingEntityListType>
    >;
};
export const AdminShippingTable = (props: adminShippingTableType) => {
    const { shippingList, setShippingList } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const repository = new ShippingLaravel();
    const interactor = new ShippingInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");

    const GoToUpdateShippingPage = (shipping: Shipping) => {
        history.push({
            pathname: `/admin/shipping/${shipping.id}`,
            state: {
                shipping
            }
        });
    };

    const GoToCreateShippingPage = () => {
        history.push("/admin/createshipping");
    };

    const DeleteFormReactState = (shippingId: number) => {
        const newList = shippingList.filter(shipping => {
            return shipping.id !== shippingId;
        });

        setShippingList(newList);
    };
    const DeleteShippingHandler = async (shippingId: number) => {
        const res = await interactor.deleteShipping(shippingId);
        if (res.isFailure()) {
            return (
                // <Redirect
                //     to={{
                //         pathname: "/admin/error",
                //         state: { error: res.value }
                //     }}
                // />
                withAbNormalAuthErrorHandler(res.value)
            );
        }
        DeleteFormReactState(shippingId);
        return;
    };

    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Update</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {shippingList &&
                    shippingList.map(shipping => (
                        <Table.Row key={shipping.id}>
                            <Table.Cell>{shipping.name}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="green"
                                    data-testid="updateShippingButton"
                                    onClick={() =>
                                        GoToUpdateShippingPage(shipping)
                                    }
                                >
                                    Update
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="red"
                                    onClick={() =>
                                        DeleteShippingHandler(shipping.id)
                                    }
                                    data-testid="deleteShippingButton"
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
                                    onClick={GoToCreateShippingPage}
                                    data-testid="addShippingButton"
                                >
                                    <Icon name="shopping cart" /> Add Shipping
                                </Button>
                            </ButtonContainer>
                        </FooterButtonContainer>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};
