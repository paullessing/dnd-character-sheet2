import {Component, OnDestroy} from "angular2/core";
import {ReduxConnector} from "../../common/connector";
import {State, CombatStats} from "../../entities/state";

/**
 * Component showing basic character details.
 */
@Component({
	selector: 'combat',
	templateUrl: 'app/components/combat/combat.component.html',
})
export class CombatComponent implements OnDestroy {

	public combatStats: CombatStats;
	private unsubscribe: () => void;

	constructor(
		private redux: ReduxConnector
	) {
		this.unsubscribe = redux.connect((state: State) => this.onStateUpdate(state));
	}

	ngOnDestroy(): void {
		this.unsubscribe();
	}

	private onStateUpdate(state: State) {
		this.combatStats = state.combat;
	}
}
