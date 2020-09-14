import { CardRepositoryInterface } from "./CardRepositoryInterface";
import { Token } from "@stripe/stripe-js";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { Card } from "../../entity/Card";
import { cardErrorType } from "../../error/card/cardErrorType";
import { cardFromBackEndType } from "./CardType";
import axios from "axios";
import { Order } from "../../entity/Order";
import { orderFromBackEndType } from "../order/OrderType";
import { convertOrderToEntity } from "../../dto/order/orderDTO";

export class CardLaravel implements CardRepositoryInterface {
    async createCard(tokenId: string): Promise<Result<Card, cardErrorType>> {
        try {
            const res: cardFromBackEndType | null = await axios.post(
                "/api/payments",
                {
                    token: tokenId
                }
            );
            if (res.data === null) {
                return new Success(null);
            }
            const cardEntity = new Card(
                res.data.cardlast4,
                res.data.brand,
                res.data.exp_month,
                res.data.exp_year,
                res.data.name
            );

            return new Success(cardEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async updateCard(tokenId: string): Promise<Result<Card, cardErrorType>> {
        try {
            const res: cardFromBackEndType | null = await axios.patch(
                "/api/payments",
                {
                    token: tokenId
                }
            );
            if (res.data === null) {
                return new Success(null);
            }
            const cardEntity = new Card(
                res.data.cardlast4,
                res.data.brand,
                res.data.exp_month,
                res.data.exp_year,
                res.data.name
            );

            return new Success(cardEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async chargeAndOrder(
        currency: string
    ): Promise<Result<Order, cardErrorType>> {
        try {
            const res: orderFromBackEndType = await axios.post(
                "/api/chargeAndOrder",
                { currency }
            );
            const orderEntity = convertOrderToEntity(res.data);
            return new Success(orderEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async getDefaultCard(): Promise<Card | null> {
        const res: cardFromBackEndType | null = await axios.get(
            "/api/payments"
        );

        if (res.data === null) {
            return null;
        }

        const cardEntity = new Card(
            res.data.cardlast4,
            res.data.brand,
            res.data.exp_month,
            res.data.exp_year,
            res.data.name
        );

        return cardEntity;
    }
}
