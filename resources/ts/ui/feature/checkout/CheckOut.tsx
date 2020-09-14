import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch, Route, useHistory } from "react-router-dom";
import { CheckOutAddressAndCard } from "./checkOutAddressAndCard/CheckOutAddressAndCard";
import { CheckOutCart } from "./checkOutCart/CheckOutCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Card } from "../../../core/entity/Card";
import { CardLaravel } from "../../../core/repository/card/CardLaravel";
import { CardInteractor } from "../../../core/usecase/CardInteractor";
import { StepIndicator } from "./stepIndicator/StepIndicator";
import { UserAuthErrorRoute } from "../admin/authenticatedRoute/UserAuthErrorRoute";
import { CheckOutConfirm } from "./checkOutConfirm/CheckOutConfirm";

//dotenvがError: Cannot find module 'fs'で使えない
//toDo:dotenvを使えるようにする
// const stripePublishKey =
//     "pk_test_51HGhVbDGU052pg9lHFzIUSTv8kuFSgjcw8ttQtYnaLamHSARmNJs4OJKtGHRNzSskMMwoskiHhWJ7nCG3QM9yp8f001OfEzV3L";
// const stripePromise = loadStripe(stripePublishKey);
export const CheckOut = () => {
    const stepArray = [
        { title1: "Address", title2: "and", title3: "Card" },
        { title1: "Shipping", title2: "and", title3: "Cart" },
        { title1: "Confirm", title2: "", title3: "" }
    ];
    const [currentStep, setCurrentStep] = useState<number>(1);

    const history = useHistory();

    const changeCurrentStepHandler = () => {
        switch (location.pathname) {
            case "/checkout":
                return setCurrentStep(1);
            case "/checkout/addressAndCard":
                return setCurrentStep(1);
            case "/checkout/cart":
                return setCurrentStep(2);
            case "/checkout/confirm":
                return setCurrentStep(3);
        }
    };
    // const toAddressAndCardHandler = () => {
    //     history.push("/checkout/addressAndCard");
    // };
    useEffect(() => {
        changeCurrentStepHandler();
        // if (location.pathname === "/checkout") {
        //     toAddressAndCardHandler();
        // } else {
        //     history.push(location.pathname);
        // }
    }, [location.pathname]);

    return (
        <CheckOutContainer>
            {/* <Elements stripe={stripePromise}> */}
            <StepIndicator
                stepArray={stepArray}
                currentStep={currentStep}
                arrayLength={stepArray.length}
            />
            <Switch>
                <UserAuthErrorRoute
                    path="/checkout/confirm"
                    component={CheckOutConfirm}
                />
                {/* <Route path="/checkout/cart" component={CheckOutCart} /> */}
                <UserAuthErrorRoute
                    path="/checkout/cart"
                    component={CheckOutCart}
                />
                {/* <Route
                        path="/checkout/confirm"
                        component={CheckOutConfirm}
                    /> */}

                <UserAuthErrorRoute
                    path={["/checkout", "/checkout/AddressAndCard"]}
                    component={CheckOutAddressAndCard}
                />
                {/* <Route
                        path={["/checkout/addressAndCard", "/checkout"]}
                        component={CheckOutAddressAndCard}
                    /> */}
            </Switch>
            {/* </Elements> */}
        </CheckOutContainer>
    );
};

const CheckOutContainer = styled.div`
    width: 100%;
    height: 100%;
`;
