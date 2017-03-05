import {Amount} from "./currency";
export class ItemNotAffordableError extends Error {

    constructor(
        public cost: Amount,
        public wallet: Amount
    ) {
        super('Item is not affordable');
    }
}