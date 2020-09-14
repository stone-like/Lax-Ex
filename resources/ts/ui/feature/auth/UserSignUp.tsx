import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SignUpLaravel } from "../../../core/repository/signUp/SignUpLaravel";
import { SignUpInteractor } from "../../../core/usecase/SignUpInteractor";
import { signUpErrorType } from "../../../core/error/signUp/signUpErrorType";
import { errorType } from "../../../util/ErrorType";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/configureStore";
import { User } from "../../../core/entity/User";
import { errorHandler } from "../../../util/ErrorHandler";
import { SignUpCredential } from "../../../core/entity/SignUpCredential";
import { userSignUpFormType } from "./form/authFormType";
import { useHistory } from "react-router-dom";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import { useUser } from "../../../util/hooks/useUser";
import { useAdmin } from "../../../util/hooks/useAdmin";
import { BorderButton } from "../../app/util/css/BorderButton";
import {
    InputContainer,
    InputContent,
    LabelContent,
    CheckContainer
} from "../../app/util/css/CustomInput";
import { ErrorP } from "../../app/util/css/ErrorComponent";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { userUpdateFormNameType } from "../admin/user/form/UserFormType";

export const UserSignUp = () => {
    // const dispatch = useDispatch();
    const history = useHistory();

    const repository = new SignUpLaravel();
    const interactor = new SignUpInteractor(repository);
    const { setUserHandler } = useUser();
    const { adminLogoutHandler } = useAdmin();

    // const setUser = (user: User) =>
    //     dispatch({ type: "SETUSER", payload: { user } });
    const {
        register,
        errors,
        handleSubmit,
        setError,
        trigger,
        setValue,
        watch,
        clearErrors,
        formState
    } = useForm({
        mode: "onChange"
    });

    const nameValue = watch("name", "");
    const emailValue = watch("email", "");
    const passwordValue = watch("password", "");
    const password_confirmationValue = watch("password_confirmation", "");

    const signUpFormHandler = async (data: any) => {
        //userSignUp
        //toDo:use DI
        //adminLogoutタイミングをユーザーページに来た時にする、userlogin時にしてしまうとsessionがかわってcartの管理が難しくなってしまう
        // await adminLogoutHandler();

        const res = await interactor.signUpUser(
            new SignUpCredential(
                data.email,
                data.password,
                data.password_confirmation,
                data.name
            )
        );
        if (res.isFailure()) {
            //error処理
            errorHandler(res.value, setError);
            return;
        }
        //errorでなければuser登録

        setUserHandler(res.value);
        history.push("/");
        return;
    };
    const changeHandler = async (
        e: React.ChangeEvent<HTMLInputElement>,
        name: userSignUpFormType
    ) => {
        clearErrors();
        const value = e.target.value;
        setValue(name, value);
    };
    const displayIsChecked = (inputName: string) => {
        // console.log("prefecture", getValues("Prefecture"));
        switch (inputName) {
            case "name":
                return nameValue === "" || errors.name ? (
                    ""
                ) : (
                    <AiOutlineCheckSquare />
                );
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
            case "password_confirmation":
                return password_confirmationValue === "" ||
                    errors.password_confirmation ? (
                    ""
                ) : (
                    <AiOutlineCheckSquare />
                );
        }
    };

    const hasError = (): boolean => {
        return (errors.name || errors.email || errors.password) && true;
    };
    const isDisabled = (): boolean => {
        return (
            nameValue === "" ||
            emailValue === "" ||
            passwordValue === "" ||
            password_confirmationValue === "" ||
            hasError()
        );
    };
    return (
        <SignUpFormContainer>
            <SignUpFormWrapper>
                <SignUpFormTitle>SignUp</SignUpFormTitle>
                <RegisterForm onSubmit={handleSubmit(signUpFormHandler)}>
                    <InputContainer>
                        <InputContent
                            type="text"
                            id="name"
                            name="name"
                            ref={register}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => changeHandler(e, "name")}
                        />
                        <LabelContent
                            htmlFor="name"
                            value={nameValue}
                            name="name"
                        >
                            Name
                        </LabelContent>
                        <CheckContainer>
                            {displayIsChecked("name")}
                        </CheckContainer>
                    </InputContainer>
                    {errors.name && <ErrorP>{errors.name.message}</ErrorP>}
                    <InputContainer>
                        <InputContent
                            type="text"
                            id="email"
                            name="email"
                            ref={register}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => changeHandler(e, "email")}
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
                    <InputContainer>
                        <InputContent
                            type="text"
                            id="password"
                            name="password"
                            ref={register}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => changeHandler(e, "password")}
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
                    <InputContainer>
                        <InputContent
                            type="text"
                            id="password_confirmation"
                            name="password_confirmation"
                            ref={register}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => changeHandler(e, "password_confirmation")}
                        />
                        <LabelContent
                            htmlFor="password_confirmation"
                            value={password_confirmationValue}
                            name="password_confirmation"
                        >
                            Password_confirmation
                        </LabelContent>
                        <CheckContainer>
                            {displayIsChecked("password_confirmation")}
                        </CheckContainer>
                    </InputContainer>
                    <BorderButton
                        paddingX={1}
                        paddingY={3}
                        color="grey"
                        style={{ justifySelf: "flex-end", marginTop: "5rem" }}
                        disabled={isDisabled()}
                    >
                        {isDisabled() ? "Disabled" : "Register"}
                    </BorderButton>
                </RegisterForm>
            </SignUpFormWrapper>
        </SignUpFormContainer>
        // <SignUpFormContainer>
        //     <SignUpFormTitle>SignUp</SignUpFormTitle>
        //     <Form onSubmit={handleSubmit(signUpFormHandler)}>
        //         <Form.Group widths="equal">
        //             <Form.Input
        //                 fluid
        //                 label="name"
        //                 placeholder="name"
        //                 name="name"
        //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //                     handleChange(e, "name")
        //                 }
        //                 value={nameValue}
        //             />
        //             {errors.name && <p>{errors.name.message}</p>}
        //             <Form.Input
        //                 fluid
        //                 label="email"
        //                 placeholder="email"
        //                 name="email"
        //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //                     handleChange(e, "email")
        //                 }
        //                 value={emailValue}
        //             />
        //             {errors.email && <p>{errors.email.message}</p>}
        //             <Form.Input
        //                 fluid
        //                 label="password"
        //                 placeholder="password"
        //                 name="password"
        //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //                     handleChange(e, "password")
        //                 }
        //                 value={passwordValue}
        //             />
        //             <Form.Input
        //                 fluid
        //                 label="password_confirmation"
        //                 placeholder="password_confirmation"
        //                 name="password_confirmation"
        //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //                     handleChange(e, "password_confirmation")
        //                 }
        //                 value={password_confirmationValue}
        //             />
        //             {errors.password && <p>{errors.password.message}</p>}
        //         </Form.Group>
        //         <Form.Button disabled={isDisabled()}>Submit</Form.Button>
        //     </Form>
        // </SignUpFormContainer>
    );
};

const SignUpFormContainer = styled.div`
    padding: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SignUpFormWrapper = styled.div`
    width: 65%;
    display: flex;
    flex-direction: column;
`;
const SignUpFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;

const RegisterForm = styled.form`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
`;
