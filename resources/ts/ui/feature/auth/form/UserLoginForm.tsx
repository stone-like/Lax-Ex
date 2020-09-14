import React from "react";
import {
    InputContainer,
    InputContent,
    LabelContent,
    CheckContainer
} from "../../../app/util/css/CustomInput";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useUser } from "../../../../util/hooks/useUser";
import { SignInLaravel } from "../../../../core/repository/signIn/SignInLaravel";
import { SignInInteractor } from "../../../../core/usecase/SignInInteractor";
import { SignInCredential } from "../../../../core/entity/SignInCredential";
import { errorHandler } from "../../../../util/ErrorHandler";
import { BorderButton } from "../../../app/util/css/BorderButton";
import { useAdmin } from "../../../../util/hooks/useAdmin";

type Props = {
    CloseModal: () => {
        type: string;
    };
};
export const UserLoginForm = (props: Props) => {
    const { CloseModal } = props;
    const history = useHistory();
    const { setUserHandler } = useUser();

    const signInRepository = new SignInLaravel();
    const signInInteractor = new SignInInteractor(signInRepository);

    const {
        handleSubmit,
        register,
        errors,
        formState,
        getValues,
        setValue,
        watch,
        setError
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange"
    });
    const emailValue = watch("email", "");
    const passwordValue = watch("password", "");

    const userSignInHandler = async (data: any) => {
        const res = await signInInteractor.signInUser(
            new SignInCredential(data.email, data.password)
        );

        if (res.isFailure()) {
            //error処理
            errorHandler(res.value, setError);
            return;
        }
        setUserHandler(res.value);
        CloseModal();
        return;
    };

    const isDisabled = () => {
        // return (
        //     emailValue === "" ||
        //     errors.email ||
        //     passwordValue === "" ||
        //     errors.password
        // );
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
        <LoginForm onSubmit={handleSubmit(userSignInHandler)}>
            <InputContainer>
                <InputContent
                    type="text"
                    id="email"
                    name="email"
                    ref={register({ required: true })}
                />
                <LabelContent htmlFor="email" value={emailValue} name="email">
                    Email
                </LabelContent>
                <CheckContainer>{displayIsChecked("email")}</CheckContainer>
            </InputContainer>
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
                <CheckContainer>{displayIsChecked("password")}</CheckContainer>
            </InputContainer>

            <BorderButton
                paddingX={1}
                paddingY={3}
                color="grey"
                style={{ justifySelf: "flex-end" }}
                disabled={isDisabled()}
            >
                {isDisabled() ? "Disabled" : "Login"}
            </BorderButton>
        </LoginForm>
    );
};

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`;
