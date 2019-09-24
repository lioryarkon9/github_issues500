import { State } from 'types/redux.types';
import { Issues } from 'reducers/issues.reducer';

const issuesSelector = (state: State): Issues => state.issues;

export default issuesSelector;
