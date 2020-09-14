import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { Form, Loader } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory, Redirect } from "react-router";
import { Role } from "../../../../../core/entity/Role";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { AdminInteractor } from "../../../../../core/usecase/AdminInteractor";
import { useForm, Controller } from "react-hook-form";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { Admin } from "../../../../../core/entity/Admin";
import { AdminLaravel } from "../../../../../core/repository/admin/AdminLaravel";
import Select from "react-select";
import { permissionEntityListType } from "../../../../../core/repository/permission/PermissionType";
import { PermissionLaravel } from "../../../../../core/repository/permission/PermissionLaravel";
import { PermissionInteractor } from "../../../../../core/usecase/PermissionInteractor";
import { extractIdsFromSelectData } from "../ReactSelectConvertor";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
type LocationState = {
    role: Role;
};
export const AdminAssignPermission = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const role = props.location.state.role;

    const [permissionList, setPermissionList] = useState<
        permissionEntityListType
    >([]);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const permissionRepository = new PermissionLaravel();
    const permissionInteractor = new PermissionInteractor(permissionRepository);
    const processPermissionList = (
        permissionList: permissionEntityListType
    ) => {
        return permissionList.map(permission => {
            return {
                label: permission.name,
                value: permission.id
            };
        });
    };

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");

    const history = useHistory();
    const roleRepository = new RoleLaravel();
    const roleInteractor = new RoleInteractor(roleRepository);

    const {
        register,
        errors,
        handleSubmit,
        setError,
        trigger,
        setValue,
        watch,
        control,
        formState
    } = useForm({
        mode: "onChange"
    });

    const AssignPermissionHandler = async (data: any) => {
        const permissionIds = extractIdsFromSelectData(data.select);
        const res = await roleInteractor.assignPermissions(
            role.id,
            permissionIds
        );
        if (res.isFailure()) {
            // <Redirect
            //     to={{
            //         pathname: "/admin/error",
            //         state: { error: res.value }
            //     }}
            // />;
            withAbNormalAuthErrorHandler(res.value);
            return;
        }
        return history.push({
            pathname: "/admin/permissionToRole",
            state: {
                searchObj: {
                    input: ""
                }
            }
        });
    };

    const isDisabled = () => {
        return !formState.isValid;
    };

    const getAllPermission = async () => {
        const res = await permissionInteractor.getAllPermission();
        setPermissionList(res);
    };
    useEffect(() => {
        setIsLoad(false);
        getAllPermission();
    }, []);
    useEffect(() => {
        setIsLoad(true);
    }, [permissionList]);
    return (
        <PermissionFormContainer>
            {isLoad ? (
                <Fragment>
                    <PermissionFormTitle>
                        AssignPermissionForm
                    </PermissionFormTitle>
                    <Form onSubmit={handleSubmit(AssignPermissionHandler)}>
                        <Controller
                            name="select"
                            as={Select}
                            isMulti
                            control={control}
                            options={processPermissionList(permissionList)}
                            rules={{ required: true }}
                        />
                        <Form.Button disabled={isDisabled()}>
                            Submit
                        </Form.Button>
                    </Form>
                </Fragment>
            ) : (
                <Loader />
            )}
        </PermissionFormContainer>
    );
};
const PermissionFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const PermissionFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
