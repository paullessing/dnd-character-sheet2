import {Component, Inject} from "angular2/core";
import {ModalWindow} from "./modal.service";

export interface NotificationModalSettings {
    text: string;
    isTextHtml?: boolean;
    primaryButtonText: string;
    secondaryButtonText?: string;
    preClose?: (click: ButtonClick) => Promise<void>;
}

export enum ButtonClick {
    PRIMARY,
    SECONDARY,
    CLOSE
}

export const SETTINGS_KEY = 'notificationSettings';

@Component({
    selector: 'notification-modal',
    template: `
<a href="javascript:void(0)" (click)="clickClose()">Close</a>
<div *ngIf="settings.isTextHtml" [innerHtml]="settings.text"></div>
<div *ngIf="!settings.isTextHtml">{{ settings.text }}</div>
<div>
    <button
        (click)="clickSecondaryButton()"
        *ngIf="settings.secondaryButtonText"
    >{{ settings.secondaryButtonText }}</button>
    <button
        (click)="clickPrimaryButton()"
    >{{ settings.primaryButtonText }}</button>
</div>
`
})
export class NotificationModal {

    constructor(
        private modalWindow: ModalWindow<ButtonClick>,
        @Inject(SETTINGS_KEY) public settings: NotificationModalSettings
    ) {
    }

    public clickPrimaryButton() {
        this.close(ButtonClick.PRIMARY);
    }

    public clickSecondaryButton() {
        this.close(ButtonClick.SECONDARY);
    }

    public clickClose() {
        this.close(ButtonClick.CLOSE);
    }

    private close(click: ButtonClick) {
        if (this.settings.preClose) {
            this.settings.preClose(click).then(() => {
                this.modalWindow.close(click);
            })
        } else {
            this.modalWindow.close(null);
        }
    }
}