import { ENUM_CARD_STATE } from "../const/card-const.js";

export default class Card {

    constructor(id, type, number) {
        this.id = id;
        this.type = type;
        this.number = number;
        this.state = ENUM_CARD_STATE.Hide;
    }

    getId() { return this.id; }
    getType() { return this.type; }
    getNumber() { return this.number; }
}