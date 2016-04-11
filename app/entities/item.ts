import {Amount} from "./currency";
export interface IItem {
    id?: number;
    name: string;
    quantity: number;
    weight?: number; // In lbs
    cost?: string;
    description?: string;
    modifiers?: any[];
    modifications?: string;
}

export class Item {
    public id: number;
    public name: string;
    public quantity: number;
    public weight: number;
    public cost: Amount;
    public description: string;
    public modifiers: any[];
    public modifications: string;

    constructor(data: IItem) {
        if (!data.id) {
            throw new Error('Item must have an ID!');
        }
        if (!data.name) {
            throw new Error('Item must have a name!');
        }
        this.id = data.id;
        this.name = data.name;
        this.quantity = data.quantity || 1;
        this.weight = data.weight || null;
        this.cost = new Amount(data.cost || {});
        this.description = data.description;
        this.modifiers = data.modifiers || [];
        this.modifications = data.modifications;
        Object.freeze(this.modifiers);
        Object.freeze(this);
    }

    public getData(): IItem {
        return {
            id: this.id,
            name: this.name,
            quantity: this.quantity,
            weight: this.weight,
            cost: this.cost.toString(),
            description: this.description,
            modifiers: this.modifiers,
            modifications: this.modifications
        };
    }

    public changeQuantity(newCount: number): Item {
        let data = this.getData();
        data.quantity = newCount;
        return new Item(data);
    }
}

export class Inventory {
    // TODO move out to separate file, add wallet
    public weight: number;
    public byId: { [itemId: number]: Item };
    public items: Item[] = [];

    constructor(...items: Item[]) {
        this.items.push(...items);

        this.weight = items.reduce((total: number, item: Item) => total + (item.weight ? item.weight * item.quantity : 0), 0);
        this.byId = {};
        items.map((item: Item) => this.byId[item.id] = item);
        Object.freeze(this.items);
    }

    public remove(itemId: number, count: number): Inventory {
        return this.changeQuantity(itemId, -count);
    }

    public add(itemId: number, count: number): Inventory {
        return this.changeQuantity(itemId, count);
    }

    public find(predicate: (item: Item, index: number, array: Item[]) => boolean): Item {
        return this.items.find(predicate);
    }

    public push(data: IItem, getNewId: () => number) {
        let existingItem = this.items.find((item: Item) =>
            item.name === data.name &&
            !item.modifications &&
            item.cost.equals(data.cost) &&
            optionalEquals(item.description, data.description) &&
            optionalEquals(item.weight, data.weight));
        if (existingItem) {
            return this.add(existingItem.id, data.quantity);
        } else {
            let newData = Object.assign({}, data);
            newData.id = getNewId();
            return new Inventory(...(this.items.concat(new Item(newData))));
        }
    }

    private changeQuantity(itemId: number, count: number): Inventory {
        let currentCount = this.getCount(itemId);
        if (currentCount === 0) {
            throw new Error(`Item '${itemId}' does not exist`);
        }
        let newCount = currentCount + count;
        if (newCount < 0) {
            throw new Error(`Cannot remove ${count} items of ID '${itemId}' as it only has ${currentCount}`);
        }
        if (newCount === 0) {
            return new Inventory(...(this.items.filter((item: Item) => item.id !== itemId)));
        } else {
            let newItems = this.items
                .map((item: Item) => item.id === itemId ? item.changeQuantity(newCount) : item);
            return new Inventory(...newItems);
        }
    }

    public getCount(itemId: number) {
        let item = this.byId[itemId];
        return item ? item.quantity : 0;
    }

    public containsId(itemId: number) {
        return !!this.byId[itemId];
    }

    public getData(): IItem[] {
        return this.items.map((item: Item) => item.getData());
    }
}

export function optionalEquals(a: any, b: any): boolean {
    if (typeof a === "undefined" || a === null) {
        return typeof b === "undefined" || b === null;
    }
    return a === b;
}

export interface Weapon extends IItem {
    type: any;
    damage: DamageDice[];
}

interface DamageDice {
    count: number;
    size: number;
}