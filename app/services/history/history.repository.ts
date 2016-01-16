import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject} from "rxjs/Rx";
import * as _ from 'underscore';

import {Dispatcher, Event} from "../../common/dispatcher";
import {moment} from "../../common/moment";

export interface HistoricalCategory {
    name: string;
    id: number;
}

export interface HistoricalEvent {
    categoryId: number;
    time: Date;
    event: Event<any>;
}

@Injectable()
export class HistoryRepository {
    private categories: HistoricalCategory[] = [];
    private events: HistoricalEvent[] = [];

    constructor(private _dispatcher: Dispatcher) {
        console.log("Constructing HistoryRepo");

        this._dispatcher.observable.subscribe(event => this.addEvent(event));

        this.loadEvents().then(events => {
            // Events might have come in between construction and this load finishing
            // So add the new ones at the end
            if (this.events.length) {
                this.events = events.concat(this.events);
            }
        });
        this.loadCategories().then(categories => {
            this.categories = categories;
            var currentCategoryId = this.currentCategory.id;
            this.events.forEach(event => {
                // Events that have come in before the category load will have a negative ID,
                // so assign the current category's ID instead
                if (event.categoryId < 0) {
                    event.categoryId = currentCategoryId;
                }
            });
        });
    }

    private addEvent(event: Event<any>) {
        const currentCategory = this.currentCategory;
        // If we haven't loaded categories at this point, assign an ID of -1 so we can add the category later
        let categoryId = currentCategory ? currentCategory.id : -1;
        this.events.push({
            categoryId: categoryId,
            time: moment().toDate(),
            event: event
        });

        console.log("History", this.events);
    }

    private loadEvents(): Promise<HistoricalEvent[]> {
        return Promise.resolve([]);
    }

    private loadCategories(): Promise<HistoricalCategory[]> {
        return Promise.resolve([{
            name: 'Some Adventure',
            id: 2
        }]);
    }

    private getEvents(categoryId: number) {
        return this.events.filter(event => event.categoryId === categoryId);
    }

    public get currentCategory(): HistoricalCategory {
        return this.categories && this.categories.length ? this.categories[this.categories.length - 1] : null;
    }
}