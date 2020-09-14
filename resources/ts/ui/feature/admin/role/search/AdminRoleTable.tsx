import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { Role } from "../../../../../core/entity/Role";
import { Table, Button, Icon } from "semantic-ui-react";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import {
    FooterButtonContainer,
    ButtonContainer
} from "../../../../app/util/css/TableFooter";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type adminRoleTableType = {
    roleList: roleEntityListType;
    setRoleList: React.Dispatch<React.SetStateAction<roleEntityListType>>;
};
export const AdminRoleTable = (props: adminRoleTableType) => {
    const { roleList, setRoleList } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const repository = new RoleLaravel();
    const interactor = new RoleInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");
    const GoToUpdateRolePage = (role: Role) => {
        history.push({
            pathname: `/admin/roles/${role.id}`,
            state: {
                role
            }
        });
    };

    const GoToCreateRolePage = () => {
        history.push("/admin/createrole");
    };

    const DeleteFormReactState = (roleId: number) => {
        const newList = roleList.filter(role => {
            return role.id !== roleId;
        });

        setRoleList(newList);
    };
    const DeleteRoleHandler = async (roleId: number) => {
        const res = await interactor.deleteRole(roleId);
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
        DeleteFormReactState(roleId);
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
                {roleList &&
                    roleList.map(role => (
                        <Table.Row key={role.id}>
                            <Table.Cell>{role.name}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="green"
                                    data-testid="updateRoleButton"
                                    onClick={() => GoToUpdateRolePage(role)}
                                >
                                    Update
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="red"
                                    onClick={() => DeleteRoleHandler(role.id)}
                                    data-testid="deleteRoleButton"
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
                                    onClick={GoToCreateRolePage}
                                    data-testid="addRoleButton"
                                >
                                    <Icon name="shopping cart" /> Add Role
                                </Button>
                            </ButtonContainer>
                        </FooterButtonContainer>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};
