import { State } from 'types/redux.types';

const issuesSelector = (state: State): any => state.issues;

export default issuesSelector;
