import React, { Fragment, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../../../../core/entity/User";
import { Table, Button, Loader } from "semantic-ui-react";
import { UserLaravel } from "../../../../../core/repository/user/UserLaravel";
import { UserInteractor } from "../../../../../core/usecase/UserInteractor";
import { Admin } from "../../../../../core/entity/Admin";
import { adminEntityListType } from "../../../../../core/repository/admin/AdminType";
import { AdminLaravel } from "../../../../../core/repository/admin/AdminLaravel";
import { AdminInteractor } from "../../../../../core/usecase/AdminInteractor";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { Role } from "../../../../../core/entity/Role";

type adminPermissionToRoleTableType = {
    roleList: roleEntityListType;
    setRoleList: React.Dispatch<React.SetStateAction<roleEntityListType>>;
};
export const AdminPermissionToRoleTable = (
    props: adminPermissionToRoleTableType
) => {
    const { roleList, setRoleList } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const roleRepository = new RoleLaravel();
    const roleInteractor = new RoleInteractor(roleRepository);

    const AssignPermissionToRoleHandler = (role: Role) => {
        history.push({
            pathname: "/admin/assignPermissionToRole",
            state: {
                role
            }
        });
    };

    const RemovePermissionFromRoleHandler = (role: Role) => {
        history.push({
            pathname: "/admin/removePermissionToRole",
            state: {
                role
            }
        });
    };

    const SyncPermissionToRoleHandler = (role: Role) => {
        history.push({
            pathname: "/admin/syncPermissionToRole",
            state: {
                role
            }
        });
    };
    const permissionAssignedButtonContent = (role: Role) => {
        return (
            <Fragment>
                <Table.Cell>
                    <Button size="small" color="green" disabled={true}>
                        AlreadyAssigned
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button
                        size="small"
                        color="red"
                        onClick={() => RemovePermissionFromRoleHandler(role)}
                        data-testid="removePermissionToRoleButton"
                    >
                        Remove
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button
                        size="small"
                        color="blue"
                        onClick={() => SyncPermissionToRoleHandler(role)}
                        data-testid="syncPermissionToRoleButton"
                    >
                        Sync
                    </Button>
                </Table.Cell>
            </Fragment>
        );
    };
    const permissionNotAssignedButtonContent = (role: Role) => {
        return (
            <Fragment>
                <Table.Cell>
                    <Button
                        size="small"
                        color="green"
                        onClick={() => AssignPermissionToRoleHandler(role)}
                        data-testid="assignPermissionToRoleButton"
                    >
                        Assign
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button size="small" color="red" disabled={true}>
                        NotAssigned
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button size="small" color="blue" disabled={true}>
                        NotAssigned
                    </Button>
                </Table.Cell>
            </Fragment>
        );
    };
    const ButtonContent = (role: Role) => {
        return role.permissions.length !== 0
            ? permissionAssignedButtonContent(role)
            : permissionNotAssignedButtonContent(role);
    };
    return (
        <Fragment>
            <Table celled compact definition>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Attach</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                        <Table.HeaderCell>Sync</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {roleList &&
                        roleList.map(role => (
                            <Table.Row key={role.id}>
                                <Table.Cell>{role.name}</Table.Cell>
                                {ButtonContent(role)}
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </Fragment>
    );
};
