import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Admin } from "../../../../core/entity/Admin";
import { useForm } from "react-hook-form";
import { SignUpInteractor } from "../../../../core/usecase/SignUpInteractor";
import { SignUpLaravel } from "../../../../core/repository/signUp/SignUpLaravel";
import { SignUpCredential } from "../../../../core/entity/SignUpCredential";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Form } from "semantic-ui-react";
import { adminSignUpFormType } from "./form/AdminSIgnUpFormType";
import { errorHandler } from "../../../../util/ErrorHandler";
import { useAuthError } from "../../../../util/hooks/useAuthError";

//AdminRegisterはsuperadminかadminしかできない
//superadminは最初DBに登録されているので、
//流れとしてsuperadminがsignUpでアカウントを作ってあげて、
//roleをそのアカウントに登録してあげる
//adminRoleを与えたとすると、そのアカウントからregisterとattachRoleができる

//permissionによってsignUpAdminにアクセスできないとか制限したい

//AdminRegisterではそもそもloginはしないのでuserLogoutをすることはない(adminLoginでsuperAdminかAdminがログインしていることが前提でもあるし)
export const AdminSignUp = () => {
    //toDo:genericsなどを駆使してsignUpAdminとsignUpUserをまとめてしまう

    const history = useHistory();
    const repository = new SignUpLaravel();
    const interactor = new SignUpInteractor(repository);

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

    const signUpFormHandler = async (data: any) => {
        const res = await interactor.signUpAdmin(
            new SignUpCredential(
                data.email,
                data.password,
                data.password_confirmation,
                data.name
            )
        );
        if (res.isFailure()) {
            //error処理
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }
        //ここでadminはsetしない、なぜならuserとは違いadminのregisterは自分自身の登録ではないから
        history.push("/admin/home");
        return;
    };
    const handleChange = async (e: any, name: adminSignUpFormType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };

    return (
        <SignUpFormContainer>
            <SignUpFormTitle>SignUp</SignUpFormTitle>
            <Form onSubmit={handleSubmit(signUpFormHandler)}>
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
                    {errors.namel && <p>{errors.namel.message}</p>}
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
        </SignUpFormContainer>
    );
};
const SignUpFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const SignUpFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
