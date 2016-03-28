import {Component} from 'angular2/core';

/**
 * Wrapper for a Modal window
 */
@Component({
    selector: 'modal',
    template: `<div class="modal"><div #content class="modal__content"></div></div>`,
})
export class ModalComponent {

    constructor(
    ) {
    }
}