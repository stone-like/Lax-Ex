import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { Role } from "../../../../../core/entity/Role";
import { Table, Button, Icon } from "semantic-ui-react";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { Permission } from "../../../../../core/entity/Permission";
import { permissionEntityListType } from "../../../../../core/repository/permission/PermissionType";
import { PermissionLaravel } from "../../../../../core/repository/permission/PermissionLaravel";
import { PermissionInteractor } from "../../../../../core/usecase/PermissionInteractor";
import {
    FooterButtonContainer,
    ButtonContainer
} from "../../../../app/util/css/TableFooter";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type adminPermissionTableType = {
    permissionList: permissionEntityListType;
    setPermissionList: React.Dispatch<
        React.SetStateAction<permissionEntityListType>
    >;
};
export const AdminPermissionTable = (props: adminPermissionTableType) => {
    const { permissionList, setPermissionList } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const repository = new PermissionLaravel();
    const interactor = new PermissionInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");
    const GoToUpdatePermissionPage = (permission: Permission) => {
        history.push({
            pathname: `/admin/permissions/${permission.id}`,
            state: {
                permission
            }
        });
    };

    const GoToCreatePermissionPage = () => {
        history.push("/admin/createpermission");
    };

    const DeleteFormReactState = (permissionId: number) => {
        const newList = permissionList.filter(permission => {
            return permission.id !== permissionId;
        });

        setPermissionList(newList);
    };
    const DeletePermissionHandler = async (permissionId: number) => {
        const res = await interactor.deletePermission(permissionId);
        if (res.isFailure()) {
            return withAbNormalAuthErrorHandler(res.value);
            // <Redirect
            //     to={{
            //         pathname: "/admin/error",
            //         state: { error: res.value }
            //     }}
            // />
        }
        DeleteFormReactState(permissionId);
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
                {permissionList &&
                    permissionList.map(permission => (
                        <Table.Row key={permission.id}>
                            <Table.Cell>{permission.name}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="green"
                                    data-testid="updatePermissionButton"
                                    onClick={() =>
                                        GoToUpdatePermissionPage(permission)
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
                                        DeletePermissionHandler(permission.id)
                                    }
                                    data-testid="deletePermissionButton"
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
                                    onClick={GoToCreatePermissionPage}
                                    data-testid="addPermissionButton"
                                >
                                    <Icon name="shopping cart" /> Add Permission
                                </Button>
                            </ButtonContainer>
                        </FooterButtonContainer>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};
