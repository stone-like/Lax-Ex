import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../../../../core/entity/User";
import { Table, Button } from "semantic-ui-react";
import { UserLaravel } from "../../../../../core/repository/user/UserLaravel";
import { UserInteractor } from "../../../../../core/usecase/UserInteractor";
import { userEntityListType } from "../../../../../core/repository/user/userType";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type adminUserTableType = {
    userList: userEntityListType;
    setUserList: React.Dispatch<React.SetStateAction<userEntityListType>>;
};
export const AdminUserTable = (props: adminUserTableType) => {
    const { userList, setUserList } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const repository = new UserLaravel();
    const interactor = new UserInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");

    const GoToUpdateUserPage = (user: User) => {
        history.push({
            pathname: `/admin/users/${user.id}`,
            state: {
                user,
                userList
            }
        });
    };

    const DeleteFormReactState = (userId: number) => {
        const newList = userList.filter(user => {
            return user.id !== userId;
        });

        setUserList(newList);
    };
    const DeleteUserHandler = async (userId: number) => {
        const res = await interactor.deleteUserFromAdmin(userId);
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
        DeleteFormReactState(userId);
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
                {userList &&
                    userList.map(user => (
                        <Table.Row key={user.id}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="green"
                                    data-testid="updateUserButton"
                                    onClick={() => GoToUpdateUserPage(user)}
                                >
                                    Update
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="red"
                                    onClick={() => DeleteUserHandler(user.id)}
                                    data-testid="deleteUserButton"
                                >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table>
    );
};
