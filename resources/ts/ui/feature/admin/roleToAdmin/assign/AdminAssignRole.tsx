import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { Form, Loader } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory } from "react-router";
import { Role } from "../../../../../core/entity/Role";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { AdminInteractor } from "../../../../../core/usecase/AdminInteractor";
import { useForm } from "react-hook-form";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { Admin } from "../../../../../core/entity/Admin";
import { AdminLaravel } from "../../../../../core/repository/admin/AdminLaravel";
import { assignRoleFormType } from "../form/roleToAdminFormType";
import {
    FormMenuContainer,
    FormMenuList,
    MenuSpan
} from "../../../../app/util/css/MenuContainer";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
type LocationState = {
    admin: Admin;
};
export const AdminAssignRole = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const admin = props.location.state.admin;

    const [roleList, setRoleList] = useState<roleEntityListType>([]);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const roleRepository = new RoleLaravel();
    const roleInteractor = new RoleInteractor(roleRepository);
    const processRoleList = (roleList: roleEntityListType) => {
        return roleList.map(role => {
            return {
                key: role.id,
                text: role.name,
                value: role.id
            };
        });
    };

    const history = useHistory();
    const adminRepository = new AdminLaravel();
    const adminInteractor = new AdminInteractor(adminRepository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");
    const {
        register,
        errors,
        handleSubmit,
        setError,
        trigger,
        setValue,
        watch,
        formState
    } = useForm({
        mode: "onChange"
    });
    const roleValue = watch("role_id");

    useEffect(() => {
        register(
            { name: "role_id" },
            {
                required: true
            }
        );
    }, []);

    const AssignRoleHandler = async (data: any) => {
        const res = await adminInteractor.assignRole(admin.id, data.role_id);
        if (res.isFailure()) {
            withAbNormalAuthErrorHandler(res.value);
            // errorHandler(res.value, setError);
            return;
        }
        return history.push({
            pathname: "/admin/roleToAdmin",
            state: {
                searchObj: {
                    input: ""
                }
            }
        });
    };
    const handleChange = async (e: any, name: assignRoleFormType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };

    const getAllRole = async () => {
        const res = await roleInteractor.getAllRole();
        setRoleList(res);
    };
    useEffect(() => {
        setIsLoad(false);
        getAllRole();
    }, []);
    useEffect(() => {
        setIsLoad(true);
    }, [roleList]);
    return (
        <RoleFormContainer>
            {isLoad ? (
                <Fragment>
                    <RoleFormTitle>AssignRoleForm</RoleFormTitle>
                    <FormMenuContainer>
                        <FormMenuList>
                            UpdateTarget:
                            <MenuSpan>{admin.name}</MenuSpan>
                        </FormMenuList>
                    </FormMenuContainer>
                    <Form onSubmit={handleSubmit(AssignRoleHandler)}>
                        <Form.Group widths="equal">
                            <div className="field">
                                <label>role</label>
                                <select
                                    onChange={(e: any) =>
                                        handleChange(e, "role_id")
                                    }
                                    name="role_id"
                                    value={roleValue}
                                    data-testid="role_id"
                                >
                                    <option hidden>Select Role</option>

                                    {processRoleList(roleList).map(role => (
                                        <option
                                            key={role.key}
                                            value={role.value}
                                        >
                                            {role.text}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Form.Group>

                        <Form.Button disabled={isDisabled()}>
                            Submit
                        </Form.Button>
                    </Form>
                </Fragment>
            ) : (
                <Loader />
            )}
        </RoleFormContainer>
    );
};
const RoleFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const RoleFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
