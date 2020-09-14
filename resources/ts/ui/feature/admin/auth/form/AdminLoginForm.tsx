import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Admin } from "../../../../../core/entity/Admin";
import { SignInLaravel } from "../../../../../core/repository/signIn/SignInLaravel";
import { SignInInteractor } from "../../../../../core/usecase/SignInInteractor";
import { useAdmin } from "../../../../../util/hooks/useAdmin";
import { useUser } from "../../../../../util/hooks/useUser";
import { useForm } from "react-hook-form";
import { SignInCredential } from "../../../../../core/entity/SignInCredential";
import { adminSignInFormType } from "./AdminSignInFormType";
import { Form } from "semantic-ui-react";
import { errorHandler } from "../../../../../util/ErrorHandler";

type Props = {
    CloseModal: () => {
        type: string;
    };
};
export const AdminLoginForm = (props: Props) => {
    const { CloseModal } = props;
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

        //ここはauth処理がないので普通のerrorHandler
        if (res.isFailure()) {
            //error処理
            errorHandler(res.value, setError);
            return;
        }
        //errorでなければadminをset
        setAdminHandler(res.value);
        CloseModal();
        // history.push("/admin");
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
        <div>
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
        </div>
    );
};
