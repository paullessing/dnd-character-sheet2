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

    public open<T>(component: Type, injectBindings: ResolvedBinding[] = []): Promise<T> {
        if (Modal.currentWindow) {
            return;
        }
        return new Promise((resolve, reject) => {
            this.loader.loadIntoLocation(ModalComponent, this.appElementRef, 'modal')
                .then((componentRef: ComponentRef) => {
                    this.toggleModalState(true);
                    let closeModal = (result?: T) => {
                        setTimeout(() => {
                            componentRef.dispose();
                            Modal.currentWindow = null;
                            this.toggleModalState(false);
                            resolve(result);
                        }, 10);
                    };
                    let modalWindow = new ModalWindow(closeModal);
                    Modal.currentWindow = modalWindow;
                    let bindings = Injector.resolve([provide(ModalWindow, { useValue: modalWindow })]).concat(injectBindings);

                    this.loader.loadIntoLocation(component, componentRef.location, 'content', bindings);
                });
        });
    }
}

export class ModalWindow<T> {
    constructor(
        private dispose: (result?: T) => void
    ) {
    }

    public close(result?: T) {
        this.dispose(result);
    }
}