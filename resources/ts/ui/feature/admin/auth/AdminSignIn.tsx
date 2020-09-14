import React, { useEffect } from "react";
import { Admin } from "../../../../core/entity/Admin";
import { useForm } from "react-hook-form";
import { SignInLaravel } from "../../../../core/repository/signIn/signInLaravel";
import { SignInInteractor } from "../../../../core/usecase/SignInInteractor";
import { useDispatch } from "react-redux";
import { SignInCredential } from "../../../../core/entity/SignInCredential";
import { errorHandler } from "../../../../util/ErrorHandler";
import { LogoutLaravel } from "../../../../core/repository/logout/LogoutLaravel";
import { LogoutInteractor } from "../../../../core/usecase/LogoutInteractor";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Form } from "semantic-ui-react";
import { adminSignInFormType } from "./form/AdminSignInFormType";
import { useAdmin } from "../../../../util/hooks/useAdmin";
import { useUser } from "../../../../util/hooks/useUser";
import { PersistLocalStorage } from "../../../../core/repository/persist/PersistLocalStorage";
import { PersistInteractor } from "../../../../core/usecase/PersistInteractor";

export const AdminSignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const signInRepository = new SignInLaravel();
    const signInInteractor = new SignInInteractor(signInRepository);

    const { setAdminHandler } = useAdmin();
    const { userLogoutHandler } = useUser();

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
    const emailValue = watch("email");
    const passwordValue = watch("password");

    useEffect(() => {
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
    }, []);

    const signInFormHandler = async (data: any) => {
        // await logoutInteractor.logoutUser();
        // clearUser();
        // persistInteractor.removeLocalStorage("user")

        //awaiを付けないとUserLogoutとAdminSignInが混線してしまうので本島に注意
        await userLogoutHandler();
        //ここをuseUserをつかってlocalStorageからも削除

        const res = await signInInteractor.signInAdmin(
            new SignInCredential(data.email, data.password)
        );

        if (res.isFailure()) {
            //error処理
            errorHandler(res.value, setError);
            return;
        }
        //errorでなければadminをset
        setAdminHandler(res.value);
        history.push("/admin");
        return;
    };
    const handleChange = async (e: any, name: adminSignInFormType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };

    return (
        <SignInFormContainer>
            <SignInFormTitle>SignIn</SignInFormTitle>
            <Form onSubmit={handleSubmit(signInFormHandler)}>
                <Form.Group widths="equal">
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
                    {errors.password && <p>{errors.password.message}</p>}
                </Form.Group>
                <Form.Button disabled={isDisabled()}>Submit</Form.Button>
            </Form>
        </SignInFormContainer>
    );
};

const SignInFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const SignInFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
