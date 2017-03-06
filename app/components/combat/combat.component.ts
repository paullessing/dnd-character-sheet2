import {Component, OnDestroy} from "angular2/core";
import {ReduxConnector} from "../../common/connector";
import {State, CombatStats} from "../../entities/state";
import {Modal} from "../modal/modal.service";
import {GainHealthModalComponent, STATS_KEY} from "./gain-health.modal.component";
import {IAction} from "../../entities/redux";

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
		private redux: ReduxConnector,
		private modal: Modal
	) {
		this.unsubscribe = redux.connect((state: State) => this.onStateUpdate(state));
	}

	ngOnDestroy(): void {
		this.unsubscribe();
	}

	public heal(): void {
		this.modal.open(GainHealthModalComponent, { [STATS_KEY]: this.combatStats })
			.then((action: IAction) => {
				if (action) {
					this.redux.dispatch(action);
				}
			});
	}

	public takeDamage(): void {

	}

	private onStateUpdate(state: State) {
		this.combatStats = state.combat;
	}
}
