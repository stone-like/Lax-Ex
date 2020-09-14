import { Result } from "../../../util/ErrorObject";
import { Token } from "@stripe/stripe-js";
import { Card } from "../../entity/Card";
import { cardErrorType } from "../../error/card/cardErrorType";
import { Order } from "../../entity/Order";

export interface CardRepositoryInterface {
    createCard(tokenId: string): Promise<Result<Card, cardErrorType>>;
    updateCard(tokenId: string): Promise<Result<Card, cardErrorType>>;
    chargeAndOrder(currency: string): Promise<Result<Order, cardErrorType>>;
    getDefaultCard(): Promise<Card | null>;
}
