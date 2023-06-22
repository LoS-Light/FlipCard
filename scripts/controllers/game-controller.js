import { ENUM_CARD_STATE } from "../const/card-const.js";
import { CHECK_WAIT_INTERVAL, GAME_OVER_WAIT_INTERVAL, SCORE_STEP, SCORE_TARGET } from "../const/game-const.js";
import Coroutine from "../utils/coroutine.js";

export default class GameController {

    selectedCards = [];
    score = 0;
    tryCount = 0;

    constructor(view, deck) {
        this.view = view;
        this.deck = deck;
    }

    init() {
        this.deck.init();
        this.deck.shuffle();
        this.view.init(this.deck.getCards(), this.onCardClick.bind(this));
    }

    onCardClick(id) {
        Coroutine.run(async () => {
            const card = this.deck.getCard(id);
            await this.setStateSelect(card);
        });
    }

    async setStateSelect(card) {
        if (card.state === ENUM_CARD_STATE.Hide) {
            card.state = ENUM_CARD_STATE.Show;
            this.selectedCards.push(card);
            this.view.refreshCard(card);

            if (this.selectedCards.length > 1) {
                this.view.refreshTryCount(++this.tryCount);
                await this.setStateCheck();
            }
        }
    }

    async setStateCheck() {
        const isMatch = this.selectedCards[0].getNumber() === this.selectedCards[1].getNumber();
        this.selectedCards.forEach((card) => this.view.showEffectMatchCard(card, isMatch));

        this.view.setIsBlockInput(true);
        await Coroutine.waitForSeconds(CHECK_WAIT_INTERVAL);

        this.selectedCards.forEach((card) => {
            card.state = isMatch ? ENUM_CARD_STATE.End : ENUM_CARD_STATE.Hide;
            this.view.refreshCard(card);
        });

        this.selectedCards = [];
        await this.setResultState(isMatch);
    }

    async setResultState(isMatch) {
        if (isMatch) {
            this.score += SCORE_STEP;
            this.view.refreshScore(this.score);
        }

        if (this.score === SCORE_TARGET) {
            await this.setStateGameOver();
        }
        else {
            this.view.setIsBlockInput(false);
        }
    }

    async setStateGameOver() {
        await Coroutine.waitForSeconds(GAME_OVER_WAIT_INTERVAL);
        this.view.setIsBlockInput(true);
        this.view.showGameOver(this.score, this.tryCount);
    }
}