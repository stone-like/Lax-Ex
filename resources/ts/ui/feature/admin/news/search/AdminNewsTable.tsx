import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NewsLaravel } from "../../../../../core/repository/news/NewsLaravel";
import { NewsInteractor } from "../../../../../core/usecase/NewsInteractor";
import { News } from "../../../../../core/entity/News";
import { Table, Button, Icon } from "semantic-ui-react";
import { newsEntityListType } from "../../../../../core/repository/news/NewsType";
import {
    FooterButtonContainer,
    ButtonContainer
} from "../../../../app/util/css/TableFooter";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type adminNewsTableType = {
    newsList: newsEntityListType;
    setNewsList: React.Dispatch<React.SetStateAction<newsEntityListType>>;
};
export const AdminNewsTable = (props: adminNewsTableType) => {
    const { newsList, setNewsList } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const repository = new NewsLaravel();
    const interactor = new NewsInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");
    const GoToUpdateNewsPage = (news: News) => {
        history.push({
            pathname: `/admin/news/${news.id}`,
            state: {
                news
            }
        });
    };

    const GoToCreateNewsPage = () => {
        history.push("/admin/createnews");
    };

    const DeleteFormReactState = (newsId: number) => {
        const newList = newsList.filter(news => {
            return news.id !== newsId;
        });

        setNewsList(newList);
    };
    const DeleteNewsHandler = async (newsId: number) => {
        const res = await interactor.deleteNews(newsId);
        if (res.isFailure()) {
            return (
                // <Redirect
                //     to={{
                //         pathname: "/admin/error",
                //         state: { error: res.value }
                //     }}
                // />
                withAbNormalAuthErrorHandler(res.value)
            );
        }
        DeleteFormReactState(newsId);
        return;
    };

    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Update</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {newsList &&
                    newsList.map(news => (
                        <Table.Row key={news.id}>
                            <Table.Cell>{news.title}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="green"
                                    data-testid="updateNewsButton"
                                    onClick={() => GoToUpdateNewsPage(news)}
                                >
                                    Update
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    size="small"
                                    color="red"
                                    onClick={() => DeleteNewsHandler(news.id)}
                                    data-testid="deleteNewsButton"
                                >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan="6">
                        <FooterButtonContainer>
                            <ButtonContainer>
                                <Button
                                    floated="right"
                                    icon
                                    labelPosition="left"
                                    primary
                                    size="small"
                                    onClick={GoToCreateNewsPage}
                                    data-testid="addNewsButton"
                                >
                                    <Icon name="shopping cart" /> Add News
                                </Button>
                            </ButtonContainer>
                        </FooterButtonContainer>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};
