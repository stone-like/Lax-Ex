import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { SignInLaravel } from "../../../core/repository/signIn/SignInLaravel";
import { SignInInteractor } from "../../../core/usecase/SignInInteractor";
import { useForm } from "react-hook-form";
import { SignInCredential } from "../../../core/entity/SignInCredential";
import { errorHandler } from "../../../util/ErrorHandler";
import { userSignInFormType } from "./form/authFormType";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import { User } from "../../../core/entity/User";
import { useUser } from "../../../util/hooks/useUser";
import { StaticContext } from "react-router";
import { useAdmin } from "../../../util/hooks/useAdmin";
import {
    InputContainer,
    InputContent,
    LabelContent,
    CheckContainer
} from "../../app/util/css/CustomInput";
import { BorderButton } from "../../app/util/css/BorderButton";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { ErrorP } from "../../app/util/css/ErrorComponent";

type LocationState = {
    returnURL?: string;
};

type Props = RouteComponentProps<{}, StaticContext, LocationState>;

export const UserSignIn = (props: Props) => {
    const returnURL = props.location.state
        ? props.location.state.returnURL
        : "/";
    const history = useHistory();

    const { setUserHandler } = useUser();
    const { adminLogoutHandler } = useAdmin();
    const signInRepository = new SignInLaravel();
    const signInInteractor = new SignInInteractor(signInRepository);

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

    const signInFormHandler = async (data: any) => {
        //adminLogoutタイミングをユーザーページに来た時にする、userlogin時にしてしまうとsessionがかわってcartの管理が難しくなってしまう
        // await adminLogoutHandler();

        const res = await signInInteractor.signInUser(
            new SignInCredential(data.email, data.password)
        );

        if (res.isFailure()) {
            //error処理
            errorHandler(res.value, setError);
            return;
        }
        // setUser(res.value);
        setUserHandler(res.value);

        history.push(returnURL);
        return;
    };
    const handleChange = async (e: any, name: userSignInFormType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };
    const displayIsChecked = (inputName: string) => {
        // console.log("prefecture", getValues("Prefecture"));
        switch (inputName) {
            case "email":
                return emailValue === "" || errors.email ? (
                    ""
                ) : (
                    <AiOutlineCheckSquare />
                );
            case "password":
                return passwordValue === "" || errors.password ? (
                    ""
                ) : (
                    <AiOutlineCheckSquare />
                );
        }
    };

    return (
        <SignInFormContainer>
            <SignInFormWrapper>
                <SignInFormTitle>SignIn</SignInFormTitle>
                <LoginForm onSubmit={handleSubmit(signInFormHandler)}>
                    <InputContainer>
                        <InputContent
                            type="text"
                            id="email"
                            name="email"
                            ref={register({ required: true })}
                        />
                        <LabelContent
                            htmlFor="email"
                            value={emailValue}
                            name="email"
                        >
                            Email
                        </LabelContent>
                        <CheckContainer>
                            {displayIsChecked("email")}
                        </CheckContainer>
                    </InputContainer>
                    {errors.email && <ErrorP>{errors.email.message}</ErrorP>}
                    <InputContainer style={{ marginTop: "1rem" }}>
                        <InputContent
                            type="text"
                            id="password"
                            name="password"
                            ref={register({ required: true })}
                        />
                        <LabelContent
                            htmlFor="password"
                            value={passwordValue}
                            name="password"
                        >
                            Password
                        </LabelContent>
                        <CheckContainer>
                            {displayIsChecked("password")}
                        </CheckContainer>
                    </InputContainer>
                    {errors.password && (
                        <ErrorP>{errors.password.message}</ErrorP>
                    )}

                    <BorderButton
                        paddingX={1}
                        paddingY={3}
                        color="grey"
                        style={{ justifySelf: "flex-end", marginTop: "4rem" }}
                        disabled={isDisabled()}
                    >
                        {isDisabled() ? "Disabled" : "Login"}
                    </BorderButton>
                </LoginForm>
            </SignInFormWrapper>
        </SignInFormContainer>
    );
};

const SignInFormContainer = styled.div`
    padding: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SignInFormWrapper = styled.div`
    width: 65%;
    display: flex;
    flex-direction: column;
`;
const SignInFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;

const LoginForm = styled.form`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
`;
