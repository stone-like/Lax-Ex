import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ui/store/configureStore";

export const useMenuHandler = (isAdmin: boolean) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentActivePage = useSelector((state: RootState) => {
        return state.page.page;
    });
    const setActivePageHandler = (page: string) => {
        dispatch({
            type: "SETACTIVEPAGE",
            payload: {
                page
            }
        });
    };

    //useMenuHandlerでadminとuserまとめているけど、正直処理が複雑化してくると共通化もそんなに良くないなと思えてしまう
    //コード量は減るけど、ロジックが読みづらくなってくるのは相当筋悪いと思う,下のMenuHandlerとかもうすでに読みづらい
    const MenuHandler = (to: string) => {
        if (to === "category") {
            return (
                isAdmin &&
                history.push({
                    pathname: `/admin/${to}`,
                    state: {
                        searchObj: {
                            input: ""
                        }
                    }
                })
            );
        }

        setActivePageHandler(to);
        if (to === "register" || to === "login" || to === "logout") {
            return isAdmin
                ? history.push(`/admin/${to}`)
                : history.push(`/${to}`);
        }

        if (to === "news") {
            return history.push({
                pathname: `/admin/${to}`,
                state: {
                    method: "All"
                }
            });
        }

        return isAdmin
            ? history.push({
                  pathname: `/admin/${to}`,
                  state: {
                      searchObj: {
                          input: ""
                      }
                  }
              })
            : history.push({
                  pathname: `/${to}`,
                  state: {
                      searchObj: {
                          input: ""
                      }
                  }
              });
    };

    return { currentActivePage, MenuHandler, setActivePageHandler };
};
