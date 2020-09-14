import React, { useEffect } from "react";
import styled from "styled-components";
import { Form } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory } from "react-router";
import { Role } from "../../../../../core/entity/Role";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { useForm, Controller } from "react-hook-form";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { Permission } from "../../../../../core/entity/Permission";
import { permissionEntityListType } from "../../../../../core/repository/permission/PermissionType";
import { PermissionLaravel } from "../../../../../core/repository/permission/PermissionLaravel";
import { PermissionInteractor } from "../../../../../core/usecase/PermissionInteractor";
import { permissionUpdateFormNameType } from "../form/PermissionFormType";
import Select from "react-select/src/Select";
import {
    FormMenuContainer,
    FormMenuList,
    MenuSpan
} from "../../../../app/util/css/MenuContainer";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
type LocationState = {
    permission: Permission;
};
export const AdminUpdatePermission = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const permission = props.location.state.permission;

    const history = useHistory();
    const repository = new PermissionLaravel();
    const interactor = new PermissionInteractor(repository);

    const { withNormalAuthErrorHandler } = useAuthError("admin");

    const {
        register,
        errors,
        handleSubmit,
        setError,
        trigger,
        setValue,
        watch,
        formState,
        control
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: permission.name
        }
    });
    const nameValue = watch("name");

    useEffect(() => {
        register(
            { name: "name" },
            {
                required: true
            }
        );
    }, []);

    const UpdateFormHandler = async (data: any) => {
        const res = await interactor.updatePermission(data.name, permission.id);

        if (res.isFailure()) {
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }

        return history.push({
            pathname: "/admin/permissions",
            state: {
                searchObj: {
                    input: ""
                }
            }
        });
    };
    const handleChange = async (e: any, name: permissionUpdateFormNameType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };
    return (
        <PermissionFormContainer>
            <PermissionFormTitle>PermissionCreateForm</PermissionFormTitle>
            <FormMenuContainer>
                <FormMenuList>
                    UpdateTarget: <MenuSpan>{permission.name}</MenuSpan>
                </FormMenuList>
            </FormMenuContainer>
            <Form onSubmit={handleSubmit(UpdateFormHandler)}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label="name"
                        placeholder="name"
                        name="name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "name")
                        }
                        value={nameValue}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </Form.Group>

                <Form.Button disabled={isDisabled()}>Submit</Form.Button>
            </Form>
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
