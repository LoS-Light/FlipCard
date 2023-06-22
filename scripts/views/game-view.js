import { URL_IMG_CARD_BACK, URL_IMG_CARD_TYPES } from "../const/asset-const.js";
import { ENUM_CARD_STATE } from "../const/card-const.js";

export default class GameView {

    constructor() {
        this.count = 0;
        this.nodeScore = document.querySelector("#score");
        this.nodeTryCount = document.querySelector("#try-count");
        this.nodeContainer = document.querySelector("#card-container");
        this.nodeGameOverContainer = document.querySelector("#game-over-container");
        this.nodeCardRows = document.querySelectorAll(".card-row");
    }

    init(cards, callbackOnCardClick) {
        const rowCount = this.nodeCardRows.length;
        const rowCardCount = cards.length / rowCount;
        cards.forEach((card, index) => {
            const rowIndex = Math.floor(index / rowCardCount);
            this.createCard(this.nodeCardRows[rowIndex], card);
        });

        this.initEvent(callbackOnCardClick);
    }

    initEvent(callbackOnCardClick) {
        this.nodeContainer.addEventListener("click", (event) => {
            const target = event.target.closest(".card");
            if (target) {
                const id = parseInt(target.getAttribute("data-card-id"));
                callbackOnCardClick(id);
            }
        });
    }

    createCard(row, card) {
        const btn = document.createElement("button");
        btn.classList.add("card");
        btn.setAttribute("data-card-id", card.getId());
        row.appendChild(btn);

        this.refreshCard(card);
    }

    refreshCard(card) {
        const viewCard = this.getCardView(card);
        const number = `<p class="card-number">${card.getNumber()}</p>`;
        const cardBack = `<img draggable="false" class="card-back" src="${URL_IMG_CARD_BACK}">`;
        const cardType = `<img draggable="false" class="card-type" src="${URL_IMG_CARD_TYPES[card.getType()]}">`

        if (card.state === ENUM_CARD_STATE.Hide) {
            viewCard.innerHTML = `${cardBack}`;
        }
        else {
            viewCard.innerHTML = `${number}${cardType}${number}`;
            if (card.state === ENUM_CARD_STATE.End) {
                viewCard.classList.add("card-end");
            }
        }
    }

    refreshScore(score) {
        this.nodeScore.innerHTML = `Score: ${score}`;
    }

    refreshTryCount(count) {
        this.nodeTryCount.innerHTML = `You've tried: ${count} times`;
    }

    showEffectMatchCard(card, isCorrect) {
        const cssEffect = isCorrect ? "card-match-correct" : "card-match-wrong";
        const viewCard = this.getCardView(card);
        viewCard.classList.add(cssEffect);
        viewCard.addEventListener('animationend', (event) => event.target.classList.remove(cssEffect), { once: true });
    }

    showGameOver(score, tryCount) {
        this.nodeGameOverContainer.style.display = "block";
        this.nodeGameOverContainer.innerHTML = `
            <p>Complete!</p>
            <p>Score: ${score}</p>
            <p>You've tried: ${tryCount} times</p>
        `;
    }

    getCardView(card) {
        const id = card.getId();
        return document.querySelector(`[data-card-id="${id}"]`);
    }

    setIsBlockInput(isBlock) {
        const cssBlock = "block-input";
        if (isBlock) {
            document.body.classList.add(cssBlock);
        }
        else {
            document.body.classList.remove(cssBlock);
        }
    }
}