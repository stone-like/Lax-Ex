import React, { useEffect } from "react";
import styled from "styled-components";
import { Form } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory } from "react-router";
import { Role } from "../../../../../core/entity/Role";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { useForm } from "react-hook-form";
import { roleUpdateFormNameType } from "../form/RoleFormType";
import { errorHandler } from "../../../../../util/ErrorHandler";
import {
    FormMenuContainer,
    FormMenuList,
    MenuSpan
} from "../../../../app/util/css/MenuContainer";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
type LocationState = {
    role: Role;
};
export const AdminUpdateRole = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const role = props.location.state.role;

    const history = useHistory();
    const repository = new RoleLaravel();
    const interactor = new RoleInteractor(repository);

    const { withNormalAuthErrorHandler } = useAuthError("admin");

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
        mode: "onChange",
        defaultValues: {
            name: role.name
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
        const res = await interactor.updateRole(data.name, role.id);

        if (res.isFailure()) {
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }

        return history.push({
            pathname: "/admin/roles",
            state: {
                searchObj: {
                    input: ""
                }
            }
        });
    };
    const handleChange = async (e: any, name: roleUpdateFormNameType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };
    return (
        <RoleFormContainer>
            <RoleFormTitle>RoleCreateForm</RoleFormTitle>
            <FormMenuContainer>
                <FormMenuList>
                    UpdateTarget: <MenuSpan>{role.name}</MenuSpan>
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
