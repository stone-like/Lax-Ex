import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NewsLaravel } from "../../../../../core/repository/news/NewsLaravel";
import { NewsInteractor } from "../../../../../core/usecase/NewsInteractor";
import { useForm } from "react-hook-form";
import { errorHandler } from "../../../../../util/ErrorHandler";
import { newsCreateFormType } from "../form/NewsFormType";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

export const AdminCreateNews = () => {
    const history = useHistory();
    const repository = new NewsLaravel();
    const interactor = new NewsInteractor(repository);

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
    const titleValue = watch("title");
    const contentValue = watch("content");

    useEffect(() => {
        register(
            { name: "title" },
            {
                required: true
            }
        );
        register(
            { name: "content" },
            {
                required: true
            }
        );
    }, []);

    const CreateFormHandler = async (data: any) => {
        const res = await interactor.createNews(data.title, data.content);

        if (res.isFailure()) {
            withNormalAuthErrorHandler(res.value, errorHandler, setError);
            // errorHandler(res.value, setError);
            return;
        }
        return history.push({
            pathname: "/admin/news",
            state: {
                method: "All"
            }
        });
    };
    const handleChange = async (e: any, name: newsCreateFormType) => {
        const { value } = e.target;
        setValue(name, value);
        await trigger(name);
    };
    const isDisabled = () => {
        return !formState.isValid;
    };
    return (
        <NewsFormContainer>
            <NewsFormTitle>NewsCreateForm</NewsFormTitle>
            <Form onSubmit={handleSubmit(CreateFormHandler)}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label="title"
                        placeholder="title"
                        name="title"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "title")
                        }
                        value={titleValue}
                    />
                    <Form.Input
                        fluid
                        label="content"
                        placeholder="content"
                        name="content"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, "content")
                        }
                        value={contentValue}
                    />
                </Form.Group>

                <Form.Button disabled={isDisabled()}>Submit</Form.Button>
            </Form>
        </NewsFormContainer>
    );
};
const NewsFormContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const NewsFormTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
