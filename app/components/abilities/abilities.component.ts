import {Component, OnInit} from 'angular2/core';

import {AbilitiesRepository} from "../../services/abilities/abilities.repository";
import {Abilities} from "../../entities/abilities";
import {ModifierPipe} from "../../common/modifier.pipe";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'abilities',
    templateUrl: 'app/components/abilities/abilities.component.html',
    pipes: [ModifierPipe]
})
export class AbilitiesComponent implements OnInit{
    public abilities: Abilities;

    constructor(
        private _abilitiesRepository: AbilitiesRepository
    ) {
    }

    ngOnInit() {
        this.abilities = this._abilitiesRepository.currentAbilities;
        this._abilitiesRepository.observable.subscribe(abilities => {
            this.abilities = abilities;
            console.log("Updated abilities", abilities);
        });
        console.log("Initialised abilities component");
    }
}
