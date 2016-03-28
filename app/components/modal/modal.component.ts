import {Component} from 'angular2/core';

/**
 * Wrapper for a Modal window
 */
@Component({
    selector: 'modal',
    // TODO move styles to stylesheet
    styles: [`
.modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal__content {
    display: block;
    background-color: white;
    border-radius: 4px;
    position: relative;
    min-width: 300px;
    max-width: 100%;
    min-height: 100px;
    max-height: 100%;
    overflow: auto;
}
`
    ],
    template: `
<div class="modal">
    <div class="modal__content">
        <div #content></div>
        <!-- Content goes here -->
    </div>
</div>`,
})
export class ModalComponent {

    constructor(
    ) {
    }
}