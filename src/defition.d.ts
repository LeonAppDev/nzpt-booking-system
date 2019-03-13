declare module 'redux-actions' {
    export function createAction(action: string): object;
    export function createAction(action: string, payload: object): object;
    export function handleAction(action: objet, state: object): void;
    export function handleActions(actions: object, state: object): void;
}

declare module 'react-redux';

declare module 'redux-immutable';

declare module 'react-immutable-proptypes';