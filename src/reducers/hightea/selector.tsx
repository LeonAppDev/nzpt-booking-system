import { createSelector } from 'reselect';
import { Map } from 'immutable';

const postSelector = (state: any) => state['hightea'];
export const highTeaInfoSelector = createSelector(postSelector, (hightea:any) => hightea.get('hightea'));

