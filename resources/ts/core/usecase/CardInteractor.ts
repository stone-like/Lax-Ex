import { Token } from "@stripe/stripe-js";
import { CardRepositoryInterface } from "../repository/card/CardRepositoryInterface";
import { Result } from "../../util/ErrorObject";
import { Card } from "../entity/Card";
import { cardErrorType } from "../error/card/cardErrorType";
import { Order } from "../entity/Order";

export class CardInteractor {
    private CardRepository: CardRepositoryInterface;

    constructor(CardRepository: CardRepositoryInterface) {
        this.CardRepository = CardRepository;
    }

    async createCard(tokenId: string): Promise<Result<Card, cardErrorType>> {
        const res = await this.CardRepository.createCard(tokenId);
        return res;
    }
    async updateCard(tokenId: string): Promise<Result<Card, cardErrorType>> {
        const res = await this.CardRepository.updateCard(tokenId);
        return res;
    }
    async chargeAndOrder(
        currency: string
    ): Promise<Result<Order, cardErrorType>> {
        const res = await this.CardRepository.chargeAndOrder(currency);
        return res;
    }
    async getDefaultCard(): Promise<Card | null> {
        const res = await this.CardRepository.getDefaultCard();
        return res;
    }
}
