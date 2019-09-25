import { ON_CHANGE_FILTER_ISSUES_INPUT } from 'constants/actionNames.constants';

export const onChangeFilterInput = (value: string) => {
  return {
    type: ON_CHANGE_FILTER_ISSUES_INPUT,
    payload: { value }
  };
};
