import { CARD_NUMBERS, CARD_TYPES } from "../const/card-const.js";
import Card from "./card.js";

export default class CardDeck {

    constructor() {
        this.cards = null;
    }

    init() {
        let id = 0;
        this.cards = [];
        CARD_TYPES.forEach((type) => {
            CARD_NUMBERS.forEach((number) => {
                const card = new Card(id, type, number);
                this.cards.push(card);
                id++;
            });
        });
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let rdmIndex = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[rdmIndex]] = [this.cards[rdmIndex], this.cards[i]];
        }
    }

    getCount() {
        return this.cards.length;
    }

    getCards() {
        return this.cards;
    }

    getCard(id) {
        return this.cards.find((card) => card.id === id);
    }
}