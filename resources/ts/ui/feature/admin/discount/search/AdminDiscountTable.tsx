import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Table, Button, Icon } from "semantic-ui-react";
import { DiscountLaravel } from "../../../../../core/repository/discount/DiscountLaravel";
import { DiscountInteractor } from "../../../../../core/usecase/DiscountInteractor";
import { discountEntityListType } from "../../../../../core/repository/discount/DiscountType";
import {
    FooterButtonContainer,
    ButtonContainer
} from "../../../../app/util/css/TableFooter";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type adminDiscountTableType = {
    discountList: discountEntityListType;
    setDiscountList: React.Dispatch<
        React.SetStateAction<discountEntityListType>
    >;
};
export const AdminDiscountTable = (props: adminDiscountTableType) => {
    const { discountList, setDiscountList } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const repository = new DiscountLaravel();
    const interactor = new DiscountInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");

    const GoToCreateDiscountPage = () => {
        history.push("/admin/creatediscount");
    };

    const DeleteFormReactState = (discountId: number) => {
        const newList = discountList.filter(discount => {
            return discount.id !== discountId;
        });

        setDiscountList(newList);
    };
    const DeleteDiscountHandler = async (discountId: number) => {
        const res = await interactor.deleteDiscount(discountId);
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
        DeleteFormReactState(discountId);
        return;
    };

    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>

                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {discountList &&
                    discountList.map(discount => (
                        <Table.Row key={discount.id}>
                            <Table.Cell>{discount.discountCode}</Table.Cell>
                            <Table.Cell>{discount.discountPrice}</Table.Cell>

                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="red"
                                    onClick={() =>
                                        DeleteDiscountHandler(discount.id)
                                    }
                                    data-testid="deleteDiscountButton"
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
                                    onClick={GoToCreateDiscountPage}
                                    data-testid="addDiscountButton"
                                >
                                    <Icon name="shopping cart" /> Add Discount
                                </Button>
                            </ButtonContainer>
                        </FooterButtonContainer>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};
