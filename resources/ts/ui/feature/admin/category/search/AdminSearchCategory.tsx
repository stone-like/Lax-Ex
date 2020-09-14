import React, { useState, useEffect } from "react";
import { StaticContext, Redirect, RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import styled from "styled-components";
import { InputCategory } from "./InputCategory";
import { Loader } from "semantic-ui-react";
import {
    categorySearchType,
    searchCategoryObjType
} from "./categorySearchType";
import { CategoryLaravel } from "../../../../../core/repository/category/CategoryLaravel";
import { CategoryInteractor } from "../../../../../core/usecase/CategoryInteractor";
import { AdminCategoryTable } from "./AdminCategoryTable";
import { categoryEntityListType } from "../../../../../core/repository/category/CategoryType";

export const AdminSearchCategory = (
    props: RouteComponentProps<{}, StaticContext, categorySearchType>
) => {
    const searchObj = props.location.state.searchObj;
    const reduxCategoryList = useSelector((state: RootState) => {
        return state.category.categoryList;
    });
    const [categoryList, setCategoryList] = useState<categoryEntityListType>();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);
    const SearchFromBackend = async (searchObj: searchCategoryObjType) => {
        const repository = new CategoryLaravel();
        const interactor = new CategoryInteractor(repository);
        return await interactor.searchBySlug(searchObj.input);
    };
    const SetAllCategoryFromRedux = async () => {
        const newList = reduxCategoryList.filter(category => {
            return category;
        }); //filterは新しいarrayを作るので、今回の目的にあってる
        setCategoryList(newList);
    };

    const SearchCategory = async () => {
        if (searchObj === undefined) {
            return;
        }
        if (searchObj.input === "") {
            await SetAllCategoryFromRedux();

            return;
        }

        const res = await SearchFromBackend(searchObj);
        if (res.isFailure()) {
            //通常発生しないvalidationErrorが起こった時
            return (
                <Redirect
                    to={{
                        pathname: "/admin/error",
                        state: { error: { errors: res.value } }
                    }}
                />
            );
        }
        setCategoryList(res.value); //useStateがすぐには反映されない問題
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchCategory();
    }, [searchObj]);

    useEffect(() => {
        setIsLoaded(true);
        //useEffectのdefaultの比較はshallow？
        //ここのcategoryListはで比較しないとerrorになる
        //例えば二回連続categoryButtonを押してinput:""が走るとsearchObj自体は内容が同じでもobjectが違うから変化した判定になるが、categorylistは同じ内容がsetされれば変わらない判定になる
        //そもそもこれが起こっている原因は毎回同じreduxの値からsetするからダメなのであって、例えばAPIでとってくれば毎回再生成するのでおｋ
        //なので回避方法は３パターンあって
        //1.APIで毎回新しくALLCategoryをとってくる
        //2.reduxからとってきて、加工して新しい判定にしてあげる
        //3.useEffectに対し、useDepsみたいなカスタム比較hookを作る
        //今回の状況だと2で簡単かつ早く回避できそうなので2を使う
    }, [categoryList]);
    return (
        <SearchCategoryContainer>
            <InputCategory />
            {isSearchObjLoaded ? (
                <AdminCategoryTable
                    categoryList={categoryList}
                    setCategoryList={setCategoryList}
                />
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchCategoryContainer>
    );
};
const SearchCategoryContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
