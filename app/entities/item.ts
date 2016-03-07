export interface IItem {
    id?: number;
    name: string;
    quantity: number;
    weight?: number; // In lbs
    cost?: number; // In cp
    description?: string;
    modifiers?: any[];
    modifications?: string;
}

export class Item {
    public id: number;
    public name: string;
    public quantity: number;
    public weight: number;
    public cost: number;
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
        this.cost = data.cost || null;
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
            cost: this.cost,
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

export class Inventory extends Array<Item> {
    public weight: number;
    public byId: { [itemId: number]: Item };

    constructor(...items: Item[]) {
        super();
        this.push(...items);
        console.log(items);

        this.weight = items.reduce((total: number, item: Item) => total + item.weight ? item.weight * item.quantity : 0, 0);
        this.byId = {};
        items.map((item: Item) => this.byId[item.id] = item);
    }

    public remove(itemId: number, count: number) {
        let currentCount = this.getCount(itemId);
        if (currentCount === 0) {
            throw new Error(`Item '${itemId}' does not exist`);
        }
        let newCount = currentCount - count;
        if (newCount < 0) {
            throw new Error(`Cannot remove ${count} items of ID '${itemId}' as it only has ${currentCount}`);
        }
        if (newCount === 0) {
            return new Inventory(...(this.filter((item: Item) => item.id !== itemId)));
        } else {
            let newItems = this
                .map((item: Item) => item.id === itemId ? item.changeQuantity(newCount) : item);
            return new Inventory(...newItems);
        }
    }

    public getCount(itemId: number) {
        let item = this.byId[itemId];
        return item ? item.quantity : 0;
    }

    public getData(): IItem[] {
        return this.map((item: Item) => item.getData());
    }
}

export interface Weapon extends IItem {
    type: any;
    damage: DamageDice[];
}

interface DamageDice {
    count: number;
    size: number;
}