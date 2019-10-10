import {
  ON_CHANGE_FILTER_ISSUES_INPUT,
  TOGGLE_LOADER_STATUS
} from 'constants/actionNames.constants';

export const onChangeFilterInput = (value: string) => ({
  type: ON_CHANGE_FILTER_ISSUES_INPUT,
  payload: { value }
});

export const toggleLoaderStatus = () => ({
  type: TOGGLE_LOADER_STATUS
});
