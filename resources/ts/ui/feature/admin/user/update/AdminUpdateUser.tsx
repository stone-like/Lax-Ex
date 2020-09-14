import React, { useEffect } from "react";
import styled from "styled-components";
import { User } from "../../../../../core/entity/User";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { UserInteractor } from "../../../../../core/usecase/UserInteractor";
import { UserLaravel } from "../../../../../core/repository/user/UserLaravel";
import { useForm } from "react-hook-form";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { Form } from "semantic-ui-react";
import { userUpdateFormNameType } from "../form/UserFormType";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
import { userErrorType } from "../../../../../core/error/user/userErrorType";
type LocationState = {
    user: User;
};
export const AdminUpdateUser = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const user = props.location.state.user;

    const history = useHistory();
    const repository = new UserLaravel();
    const interactor = new UserInteractor(repository);

    const {
        withNormalAuthErrorHandler,
        withAbNormalAuthErrorHandler
    } = useAuthError("admin");

    const {
        register,
        errors,
        handleSubmit,
        setError,
        trigger,
        setValue,
        watch,
        formState,
        clearErrors
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: user.name,
            email: user.email.email,
            password: "",
            password_confirmation: ""
        }
    });
    const nameValue = watch("name");
    const emailValue = watch("email");
    const passwordValue = watch("password");
    const password_confirmationValue = watch("password_confirmation");

    useEffect(() => {
        register(
            { name: "name" },
            {
                required: true
            }
        );
        register(
            { name: "email" },
            {
                required: true
            }
        );
        register(
            { name: "password" },
            {
                required: true
            }
        );
        register(
            { name: "password_confirmation" },
            {
                required: true
            }
        );
    }, []);

    const errorSwitchHandler = (error: userErrorType) => {
        if (error.user_id) {
            return withAbNormalAuthErrorHandler(error);
        }
        return withNormalAuthErrorHandler(error, errorHandler, setError);
    };
    const UpdateFormHandler = async (data: any) => {
        const res = await interactor.updateUserFromAdmin(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            },
            user.id
        );

        if (res.isFailure()) {
            errorSwitchHandler(res.value);
            // errorHandler(res.value, setError);
            return;
        }

        return history.push({
            pathname: "/admin/users",
            state: {
                searchObj: {
                    input: ""
                }
            }
        });
    };
    const handleChange = async (e: any, name: userUpdateFormNameType) => {
        clearErrors();

        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };
    return (
        //バグ、passconrimatiponエラーが出た時formStateがvalidにならない・・・？
        <UserFormContainer>
            <UserFormTitle>UserUpdateForm</UserFormTitle>
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
                    <Form.Input
                        fluid
                        label="email"
                        placeholder="email"
                        name="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "email")
                        }
                        value={emailValue}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    <Form.Input
                        fluid
                        label="password"
                        placeholder="password"
                        name="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "password")
                        }
                        value={passwordValue}
                    />
                    <Form.Input
                        fluid
                        label="password_confirmation"
                        placeholder="password_confirmation"
                        name="password_confirmation"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "password_confirmation")
                        }
                        value={password_confirmationValue}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </Form.Group>

                <Form.Button disabled={isDisabled()}>Submit</Form.Button>
            </Form>
        </UserFormContainer>
    );
};
const UserFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const UserFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
