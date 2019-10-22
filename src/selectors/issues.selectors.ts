import { State } from 'types/redux.types';
import { createSelector } from 'reselect';

export const issuesSelector = (state: State): any => state.issues;

export const filterInputSelector = (state: State): string =>
  state.ui.filterInputValue;

export const issuesFilteredByInputChangeSelector = createSelector(
  issuesSelector,
  filterInputSelector,
  (issues: Record<number, any>, valueToFilterBy: string): any => {
    return Object.values(issues).filter((issue: any) => {
      const issueTitle = issue.title;

      if (valueToFilterBy) {
        const paramRegex = new RegExp(`${valueToFilterBy.toLowerCase()}`);

        return paramRegex.test(issueTitle.toLowerCase());
      }

      return false;
    });
  }
);
