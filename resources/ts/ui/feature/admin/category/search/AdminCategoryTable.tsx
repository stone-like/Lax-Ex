import React, { useEffect } from "react";
import { categoryEntityListType } from "../../../../../core/repository/category/CategoryType";
import { useDispatch } from "react-redux";
import { Category } from "../../../../../core/entity/Category";
import { useHistory, Redirect } from "react-router-dom";
import { CategoryInteractor } from "../../../../../core/usecase/CategoryInteractor";
import { CategoryLaravel } from "../../../../../core/repository/category/CategoryLaravel";
import { Table, Button, Icon } from "semantic-ui-react";
import {
    FooterButtonContainer,
    ButtonContainer
} from "../../../../app/util/css/TableFooter";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
type adminCategoryTableType = {
    categoryList: categoryEntityListType;
    setCategoryList: React.Dispatch<
        React.SetStateAction<categoryEntityListType>
    >;
};
export const AdminCategoryTable = (props: adminCategoryTableType) => {
    const { categoryList, setCategoryList } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const repository = new CategoryLaravel();
    const interactor = new CategoryInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");
    const deleteCategory = (categoryId: number) => {
        dispatch({
            type: "DELETECATEGORY",
            payload: {
                categoryId
            }
        });
    };
    const GoToUpdateCategoryPage = (category: Category) => {
        history.push({
            pathname: `/admin/category/${category.id}`,
            state: {
                category
            }
        });
    };

    const DeleteFormReactState = (categoryId: number) => {
        const newList = categoryList.filter(category => {
            return category.id !== categoryId;
        });

        setCategoryList(newList);
    };
    const DeleteCategoryHandler = async (categoryId: number) => {
        const res = await interactor.deleteCategory(categoryId);
        if (res.isFailure()) {
            return withAbNormalAuthErrorHandler(res.value);
            // <Redirect
            //     to={{
            //         pathname: "/admin/error",
            //         state: { error: res.value }
            //     }}
            // />
        }
        //成功したら、後はredux操作,core部分の操作とは分離している
        deleteCategory(categoryId);
        //reduxとは別に検索用に使っているcategoryListからも削除
        DeleteFormReactState(categoryId);
    };

    const GoToCreateCategoryPage = () => {
        history.push("/admin/createcategory");
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
                {categoryList &&
                    categoryList.map(category => (
                        <Table.Row key={category.id}>
                            <Table.Cell>{category.name}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="green"
                                    data-testid="updateCategoryButton"
                                    onClick={() =>
                                        GoToUpdateCategoryPage(category)
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
                                        DeleteCategoryHandler(category.id)
                                    }
                                    data-testid="deleteCategoryButton"
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
                                    onClick={GoToCreateCategoryPage}
                                    data-testid="addCategoryButton"
                                >
                                    <Icon name="shopping cart" /> Add Category
                                </Button>
                            </ButtonContainer>
                        </FooterButtonContainer>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};
