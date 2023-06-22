import GameController from "./controllers/game-controller.js";
import CardDeck from "./models/card-deck.js";
import GameView from "./views/game-view.js";

function main() {
    const deck = new CardDeck();
    const view = new GameView();
    const controller = new GameController(view, deck);

    controller.init();
}

main();