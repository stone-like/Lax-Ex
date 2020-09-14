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
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type adminTableType = {
    adminList: adminEntityListType;
    setAdminList: React.Dispatch<React.SetStateAction<adminEntityListType>>;
};
export const AdminTable = (props: adminTableType) => {
    const { adminList, setAdminList } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const adminRepository = new AdminLaravel();
    const adminInteractor = new AdminInteractor(adminRepository);
    const { withAbNormalAuthErrorHandler } = useAuthError("admin");

    const AssignRoleToAdminHandler = (admin: Admin) => {
        history.push({
            pathname: "/admin/assignRoleToAdmin",
            state: {
                admin
            }
        });
    };

    const RemoveRoleFromAdminList = (admin: Admin) => {
        const filteredAdminList = adminList.filter(ad => {
            return ad.id !== admin.id;
        });
        const newAdmin = new Admin(
            admin.id,
            admin.email.email,
            admin.name,
            [],
            "undefined",
            null,
            false
        );
        const newAdminList = filteredAdminList.concat(newAdmin);
        setAdminList(newAdminList);
    };
    const RemoveRoleToAdminHandler = async (admin: Admin) => {
        //removeの場合、adminの状態を変えてListにまた突っ込まなくてはいけない
        const res = await adminInteractor.removeRole(admin.id, admin.role_id);
        //reactState
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

        RemoveRoleFromAdminList(admin);
    };

    const SyncRoleToAdminHandler = (admin: Admin) => {
        history.push({
            pathname: "/admin/syncRoleToAdmin",
            state: {
                admin
            }
        });
    };
    const roleAssignedButtonContent = (admin: Admin) => {
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
                        onClick={() => RemoveRoleToAdminHandler(admin)}
                        data-testid="removeRoleToAdminButton"
                    >
                        Remove
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button
                        size="small"
                        color="blue"
                        onClick={() => SyncRoleToAdminHandler(admin)}
                        data-testid="syncRoleToAdminButton"
                    >
                        Sync
                    </Button>
                </Table.Cell>
            </Fragment>
        );
    };
    const roleNotAssignedButtonContent = (admin: Admin) => {
        return (
            <Fragment>
                <Table.Cell>
                    <Button
                        size="small"
                        color="green"
                        onClick={() => AssignRoleToAdminHandler(admin)}
                        data-testid="assignRoleToAdminButton"
                    >
                        Assign
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button
                        size="small"
                        color="red"
                        disabled={true}
                        data-testid="removeRoleToAdminButton"
                    >
                        NotAssigned
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button
                        size="small"
                        color="blue"
                        disabled={true}
                        data-testid="syncRoleToAdminButton"
                    >
                        NotAssigned
                    </Button>
                </Table.Cell>
            </Fragment>
        );
    };
    const ButtonContent = (admin: Admin) => {
        return admin.role !== "undefined"
            ? roleAssignedButtonContent(admin)
            : roleNotAssignedButtonContent(admin);
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
                    {adminList &&
                        adminList.map(admin => (
                            <Table.Row key={admin.id}>
                                <Table.Cell>{admin.name}</Table.Cell>
                                {ButtonContent(admin)}
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </Fragment>
    );
};
