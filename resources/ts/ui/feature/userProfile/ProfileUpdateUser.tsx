import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import {
    InputContainer,
    InputContent,
    LabelContent,
    CheckContainer
} from "../../app/util/css/CustomInput";
import { useForm } from "react-hook-form";
import { userUpdateFormNameType } from "../admin/user/form/UserFormType";
import { UserLaravel } from "../../../core/repository/user/UserLaravel";
import { UserInteractor } from "../../../core/usecase/UserInteractor";
import { useHistory } from "react-router-dom";
import { useAuthError } from "../../../util/hooks/useAuthError";
import { userErrorType } from "../../../core/error/user/userErrorType";
import { errorHandler } from "../../../util/ErrorHandler";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { BorderButton } from "../../app/util/css/BorderButton";
import styled from "styled-components";
import { CustomLoader } from "../../app/util/loader/CustomLoader";
import { ErrorP } from "../../app/util/css/ErrorComponent";
import { useUser } from "../../../util/hooks/useUser";

export const ProfileUpdateUser = () => {
    const user = useSelector((state: RootState) => {
        return state.user.user;
    });

    const history = useHistory();
    const repository = new UserLaravel();
    const interactor = new UserInteractor(repository);

    const {
        withNormalAuthErrorHandler,
        withAbNormalAuthErrorHandler
    } = useAuthError("user");

    const { setUserHandler } = useUser();
    const {
        handleSubmit,
        register,
        errors,
        formState,
        getValues,
        setValue,
        clearErrors,
        setError,
        watch
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            name: user.name,
            email: user.email.email,
            password: "",
            password_confirmation: ""
        }
    });

    const nameValue = watch("name");
    const emailValue = watch("email");
    const passwordValue = watch("password", "");
    const password_confirmationValue = watch("password_confirmation", "");

    const errorSwitchHandler = (error: userErrorType) => {
        if (error.user_id) {
            return withAbNormalAuthErrorHandler(error);
        }
        return withNormalAuthErrorHandler(error, errorHandler, setError);
    };
    const updateUserHandler = async (data: any) => {
        const res = await interactor.updateUser(
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
            return;
        }

        //reduxとlocalStorageのuserを更新
        setUserHandler(res.value);

        return history.push("/userProfile");
    };

    const changeHandler = async (
        e: React.ChangeEvent<HTMLInputElement>,
        name: userUpdateFormNameType
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
        <UpdateUserFormContainer>
            {!user ? (
                <CustomLoader />
            ) : (
                <UpdateUserForm onSubmit={handleSubmit(updateUserHandler)}>
                    <UpdateUserFormTitle>UpdateUser</UpdateUserFormTitle>
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
                        {isDisabled() ? "Disabled" : "Update"}
                    </BorderButton>
                </UpdateUserForm>
            )}
        </UpdateUserFormContainer>
    );
};

const UpdateUserForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 65%;
`;
const UpdateUserFormContainer = styled.div`
    width: 100%;
    padding: 5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UpdateUserFormTitle = styled.div`
    font-size: 2rem;
    margin-bottom: 5rem;
`;
