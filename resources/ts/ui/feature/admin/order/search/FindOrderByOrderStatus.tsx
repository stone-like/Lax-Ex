import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Input, DropdownItemProps } from "semantic-ui-react";
import Select from "react-select";
import { orderStatusEntityList } from "../../../../../core/repository/orderStatus/OrderStatusType";
import { BorderButton } from "../../../../app/util/css/BorderButton";
import { OrderStatusLaravel } from "../../../../../core/repository/orderStatus/OrderStatusLaravel";
import { OrderStatusInteractor } from "../../../../../core/usecase/OrderStatusInteractor";

export const FindOrderByOrderStatus = () => {
    const history = useHistory();

    const [orderStatusList, setOrderStatusList] = useState<
        orderStatusEntityList
    >([]);
    const processOrderStatusList = (
        orderStatusList: orderStatusEntityList
    ): DropdownItemProps[] => {
        return orderStatusList.map(orderStatus => {
            return { label: orderStatus.name, value: orderStatus.id };
        });
    };

    const orderStatusRef = useRef(null);
    const repository = new OrderStatusLaravel();
    const interactor = new OrderStatusInteractor(repository);
    const getAllOrderStatus = async () => {
        const res = await interactor.getAllOrderStatus();
        setOrderStatusList(res);
    };
    useEffect(() => {
        getAllOrderStatus();
    }, []);

    const findOrderByOrderStatusHandler = () => {
        const orderStatusId = orderStatusRef.current.state.value.value ?? "";
        history.push({
            pathname: "/admin/order",
            state: {
                searchObj: {
                    orderStatusId
                }
            }
        });
    };
    return (
        <AllContainer>
            <SelectContainer>
                <SelectLabelTitle>selectOrderStatus</SelectLabelTitle>
                <Select
                    options={processOrderStatusList(orderStatusList)}
                    ref={orderStatusRef}
                />
            </SelectContainer>
            <BorderButton
                paddingY={1}
                paddingX={0.3}
                color="grey"
                onClick={findOrderByOrderStatusHandler}
                style={{ marginLeft: "auto" }}
            >
                Search
            </BorderButton>
        </AllContainer>
    );
};

const AllContainer = styled.div`
    display: flex;
    width: 100%;
`;
const SelectContainer = styled.div`
    width: 70%;
`;
const SelectLabelTitle = styled.div`
    margin-bottom: 1rem;
`;
