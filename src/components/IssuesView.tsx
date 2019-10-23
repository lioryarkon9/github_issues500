import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { values } from 'lodash/fp';
import { List } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';

import { fetchIssuesByOwnerAndRepo, UserAndRepo } from 'actions/issues.actions';
import { onChangeFilterInput } from 'actions/ui.actions';
import { State } from 'types/redux.types';

import {
  filterInputSelector,
  issuesFilteredByInputChangeSelector
} from 'selectors/issues.selectors';

import { BaseAction } from 'types/base-redux.types';
import { CurrentUserState } from 'reducers/currentUser.reducer';

import IssueItem from 'components/IssueItem';
import WithAuth from 'components/WithAuth';
import NewIssueButton from 'components/NewIssueButton';
import ItemsContainer from 'components/ItemsContainer';
import { Issue, IssuesState } from 'reducers/issues.reducer';

type Props = {
  onChangeFilterInput(value: string): BaseAction;
  fetchIssuesByOwnerAndRepo(param: UserAndRepo): BaseAction;
  router: RouteComponentProps<any>;
  currentUser: CurrentUserState;
  issues: IssuesState;
  issuesListByOnChange: Issue[];
  filterInputValue: string;
};

const IssuesView = ({
  onChangeFilterInput,
  fetchIssuesByOwnerAndRepo,
  router,
  currentUser,
  issues,
  issuesListByOnChange,
  filterInputValue
}: Props) => {
  const repoName = router.match.params['repo_name'];
  const userName = currentUser ? currentUser.login : '';

  const [emptyMessage, setEmptyMessage] = useState('No issues yet');
  const issuesList = useMemo(() => values(issues).sort(sortIssuesAscending), [
    issues
  ]);

  const issuesToRender = filterInputValue
    ? issuesListByOnChange.sort(sortIssuesAscending)
    : issuesList;

  useEffect(() => {
    if (userName) {
      fetchIssuesByOwnerAndRepo({ user: userName, repo: repoName });
    }
  }, [userName]);

  return (
    <>
      <FlexBetween>
        <Flex>
          <SearchInput
            value={filterInputValue}
            placeholder="Search issue..."
            onChange={e => {
              onChangeFilterInput(e.currentTarget.value);

              if (issuesListByOnChange.length) {
                setEmptyMessage('No matching results');
              } else {
                setEmptyMessage('No issues yet');
              }
            }}
          />
        </Flex>
        <NewIssueButton repoName={repoName} />
      </FlexBetween>
      <ItemsContainer>
        <ItemsHeaderContainer>
          <div>{issuesToRender.length} issues</div>
          <div />
        </ItemsHeaderContainer>
        <List
          locale={{ emptyText: emptyMessage }}
          dataSource={issuesToRender}
          renderItem={(issue: any) => (
            <Link
              key={issue.id.toString()}
              to={`/single_issue/${issue.id}/${repoName}`}>
              <IssueItem
                title={issue.title}
                number={issue.number}
                created_at={issue.created_at}
                comments={issue.comments}
              />
            </Link>
          )}
        />
      </ItemsContainer>
    </>
  );
};

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 320px;
  :hover {
    border: 0.5px solid #0366d6;
  }
  color: #586069;
  padding-left: 30px;
  margin-right: 1%;
  border: 1px solid #d1d5da;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 1.1em;
  @media only screen and (max-width: 600px) {
    width: 180px;
  }
`;

const ActionButtonPrimary = styled.div`
  min-width: 100px;
  height: 30px;
  color: #586069;
  font-weight: bold;
  border: 1px solid #e1e4e8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3px 0 3px;
  cursor: pointer;
  :hover {
    background-color: #f6f8fa;
  }
`;

const ItemsHeaderContainer = styled.div`
  height: 60px;
  padding: 0 12px 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f8fa;
  border-bottom: 1px solid #d1d5da;
`;

const sortIssuesAscending = (a: any, b: any) => {
  const numberA = a.number;
  const numberB = b.number;

  return numberB - numberA;
};

const mapStateToProps = (state: State) => ({
  currentUser: state.currentUser,
  issues: state.issues,
  issuesListByOnChange: issuesFilteredByInputChangeSelector(state),
  filterInputValue: filterInputSelector(state)
});

const connectedIssuesView = connect(
  mapStateToProps,
  {
    fetchIssuesByOwnerAndRepo,
    onChangeFilterInput
  }
)(IssuesView);

export default WithAuth(connectedIssuesView);
