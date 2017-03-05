import {Router as NgRouter} from "angular2/router";
import {Injectable} from "angular2/core";

/**
 * Wrapper class to work around https://github.com/angular/angular/issues/6786
 */
@Injectable()
export class Router {
    constructor(
        public ngRouter: NgRouter
    ) {
    }

    public navigate(path: string | any[]) {
        let params: any[];
        if (_.isArray(path)) {
            params = path as any[];
        } else {
            path = [path];
        }
        setTimeout(() => {
            // See https://github.com/angular/angular/issues/6786#issuecomment-192369341
            this.ngRouter.navigate(params);
        }, 10);
    }
}