import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { useForm } from "react-hook-form";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import { PermissionLaravel } from "../../../../../core/repository/permission/PermissionLaravel";
import { PermissionInteractor } from "../../../../../core/usecase/PermissionInteractor";
import { permissionCreateFormNameType } from "../form/PermissionFormType";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

export const AdminCreatePermission = () => {
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
        formState
    } = useForm({
        mode: "onChange"
    });
    const nameValue = watch("name");
    const roleValue = watch("role_id");

    useEffect(() => {
        register(
            { name: "name" },
            {
                required: true
            }
        );
    }, []);

    const CreateFormHandler = async (data: any) => {
        const res = await interactor.createPermission(data.name);

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
    const handleChange = async (e: any, name: permissionCreateFormNameType) => {
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
            <Form onSubmit={handleSubmit(CreateFormHandler)}>
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
