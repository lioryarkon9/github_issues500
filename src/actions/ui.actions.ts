import { SET_CURRENT_ISSUE_ID } from 'constants/actionNames.constants';

export function setCurrentIssueId(issueId: number) {
  return {
    type: SET_CURRENT_ISSUE_ID,
    payload: issueId
  };
}
