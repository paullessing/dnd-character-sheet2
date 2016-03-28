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

@Injectable()
export class Modal {
    private appElementRef: ElementRef;
    static currentWindow: ModalWindow;

    constructor(
        private loader: DynamicComponentLoader
    ) {
    }

    public init(appElementRef: ElementRef) {
        this.appElementRef = appElementRef;
    }

    public open(component: Type) {
        this.loader.loadIntoLocation(ModalComponent, this.appElementRef, 'modal')
        .then((componentRef: ComponentRef) => {
            let modalWindow = new ModalWindow(() => componentRef.dispose());
            let bindings = Injector.resolve([provide(ModalWindow, { useValue: modalWindow })]);

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