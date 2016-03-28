import {
    Injectable,
    DynamicComponentLoader,
    ComponentRef,
    ElementRef,
    Injector,
    provide
} from "angular2/core";
import {Type} from 'angular2/src/facade/lang';
import {ModalComponent} from "./modal.component";
import {ResolvedBinding} from "angular2/core";

@Injectable()
export class Modal {
    private appElementRef: ElementRef;
    private toggleModalState: (newValue: boolean) => void;
    static currentWindow: ModalWindow;

    constructor(
        private loader: DynamicComponentLoader
    ) {
    }

    public init(appElementRef: ElementRef, toggleModalState) {
        this.appElementRef = appElementRef;
        this.toggleModalState = toggleModalState;
    }

    public open(component: Type, injectBindings: ResolvedBinding[] = []) {
        if (Modal.currentWindow) {
            return;
        }
        this.loader.loadIntoLocation(ModalComponent, this.appElementRef, 'modal')
        .then((componentRef: ComponentRef) => {
            this.toggleModalState(true);
            let modalWindow = new ModalWindow(() => {
                componentRef.dispose();
                Modal.currentWindow = null;
            });
            Modal.currentWindow = modalWindow;
            let bindings = Injector.resolve([provide(ModalWindow, { useValue: modalWindow })]).concat(injectBindings);

            this.loader.loadIntoLocation(component, componentRef.location, 'content', bindings);
        });
    }
}

export class ModalWindow {
    constructor(
        private dispose: () => void
    ) {
    }

    public close() {
        this.dispose();
    }
}