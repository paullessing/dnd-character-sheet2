export const LOAD = 'system/LOAD';

export const UNDO = 'user/UNDO';
export const REDO = 'user/REDO';
export const HISTORY_ADD_GROUP = 'user/HISTORY_ADD_GROUP';
export const HISTORY_RENAME_GROUP = 'user/HISTORY_RENAME_GROUP';

export const UPDATE_PERSONALITY = 'user/UPDATE_PERSONALITY';

export const ADD_XP = 'user/ADD_XP';
export const UPDATE_ABILITIES = 'user/UPDATE_ABILITIES';

export const UPDATE_CHARACTER = 'user/UPDATE_CHARACTER';

export const CREATE_ITEM = 'user/CREATE_ITEM';
export const UPDATE_ITEM = 'user/UPDATE_ITEM';
export const BUY_ITEM = 'user/BUY_ITEM';
export const ADD_ITEM = 'user/ADD_ITEM';
export const REMOVE_ITEM = 'user/REMOVE_ITEM';

export const ADD_TO_WALLET = 'user/ADD_TO_WALLET';
export const REMOVE_FROM_WALLET = 'user/REMOVE_FROM_WALLET';

export function isUserAction(type: string): boolean {
    return type.indexOf('user/') === 0;
}