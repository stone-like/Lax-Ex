import React from "react";
import { Table, Checkbox, Button, Icon } from "semantic-ui-react";
import { productEntityListType } from "../../../../../core/repository/product/ProductType";
import { useHistory, Redirect } from "react-router-dom";
import { Product } from "../../../../../core/entity/Product";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { useDispatch } from "react-redux";
import { categoryEntityListType } from "../../../../../core/repository/category/CategoryType";
import { useCategory } from "../../../../../util/hooks/useCategory";
import {
    FooterButtonContainer,
    ButtonContainer
} from "../../../../app/util/css/TableFooter";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type adminProductTableType = {
    productList: productEntityListType;
};
export const AdminProductTable = (props: adminProductTableType) => {
    const { productList } = props;
    const [, getAllCategory] = useCategory();
    const history = useHistory();
    const repository = new ProductLaravel();
    const interactor = new ProductInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");

    const dispatch = useDispatch();
    const deleteProduct = (productId: number) => {
        dispatch({
            type: "DELETEPRODUCT",
            payload: {
                productId
            }
        });
    };

    const GoToUpdateProductPage = (product: Product) => {
        history.push({
            pathname: `/admin/products/${product.id}`,
            state: {
                product
            }
        });
        //pushで個別のproductに移るときidのみを渡して移動先でproduct情報をapiでとるのがいいのか、
        //もうreduxにあるのですべて情報を渡してしまうのがいいのか迷う
        //今回はすべて渡してしまうことにする
    };
    const DeleteProductHandler = async (productId: number) => {
        const res = await interactor.deleteProduct(productId);
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
        //成功したら、後はredux操作,core部分の操作とは分離している
        deleteProduct(productId);
        //categoryのproductCountの更新
        getAllCategory();
    };
    const GoToCreateProductPage = () => {
        history.push("/admin/createproduct");
    };
    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Update</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {productList &&
                    productList.map(product => (
                        <Table.Row key={product.id}>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell>{product.quantity}</Table.Cell>
                            <Table.Cell>{product.price}</Table.Cell>
                            <Table.Cell>{product.weight}</Table.Cell>
                            <Table.Cell>{product.description}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="green"
                                    onClick={() =>
                                        GoToUpdateProductPage(product)
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
                                        DeleteProductHandler(product.id)
                                    }
                                    data-testid="deleteProductButton"
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
                                    onClick={GoToCreateProductPage}
                                    data-testid="addProductButton"
                                >
                                    <Icon name="shopping cart" /> Add Product
                                </Button>
                            </ButtonContainer>
                        </FooterButtonContainer>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};
