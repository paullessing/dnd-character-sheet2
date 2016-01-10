import {Component, OnInit} from 'angular2/core';
import {Personality, IPersonality} from "../../entities/personality";
import {PersonalityActions} from "../../services/personality/personalityActions.service";
import {PersonalityRepository} from "../../services/personality/personality.repository";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'personality',
    templateUrl: 'app/components/personality/personality.component.html'
})
export class PersonalityComponent implements OnInit {
    public personality: IPersonality;
    public editPersonality: IPersonality;
    public isEditing: boolean;

    constructor(private _personalityActions: PersonalityActions, private _personalityRepository: PersonalityRepository) {
    }

    ngOnInit() {
        this.personality = this._personalityRepository.currentPersonality;

        this._personalityRepository.observable.subscribe(personality => {
            this.personality = personality;
            console.log("Updated personality", personality);
        });
    }

    public edit() {
        this.editPersonality = {
            traits: this.personality.traits,
            ideals: this.personality.ideals,
            bonds: this.personality.bonds,
            flaws: this.personality.flaws
        };
        this.isEditing = true;
    }

    public save() {
        this._personalityActions.update(this.editPersonality);
        this.isEditing = false;
    }

    public cancel() {
        this.isEditing = false;
    }
}
