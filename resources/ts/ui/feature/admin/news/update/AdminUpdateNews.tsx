import React, { useEffect } from "react";
import styled from "styled-components";
import { Form } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory } from "react-router";
import { News } from "../../../../../core/entity/News";
import { newsEntityListType } from "../../../../../core/repository/news/NewsType";
import { NewsLaravel } from "../../../../../core/repository/news/NewsLaravel";
import { NewsInteractor } from "../../../../../core/usecase/NewsInteractor";
import { useForm } from "react-hook-form";
import { newsUpdateFormType } from "../form/NewsFormType";
import { errorHandler } from "../../../../../util/ErrorHandler";
import {
    FormMenuContainer,
    FormMenuList,
    MenuSpan
} from "../../../../app/util/css/MenuContainer";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
type LocationState = {
    news: News;
};
export const AdminUpdateNews = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const news = props.location.state.news;

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
        mode: "onChange",
        defaultValues: {
            title: news.title,
            content: news.content
        }
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

    const UpdateFormHandler = async (data: any) => {
        const res = await interactor.updateNews(
            news.id,
            data.title,
            data.content
        );

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
    const handleChange = async (e: any, name: newsUpdateFormType) => {
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
            <FormMenuContainer>
                <FormMenuList>
                    UpdateTarget: <MenuSpan>{news.title}</MenuSpan>
                </FormMenuList>
            </FormMenuContainer>
            <Form onSubmit={handleSubmit(UpdateFormHandler)}>
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
