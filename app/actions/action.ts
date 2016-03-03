export interface Action {
    type: string;
    payload?: any;
    error?: any;
    meta?: any;
}