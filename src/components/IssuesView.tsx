import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import ItemsContainer from 'components/ItemsContainer';
import { fetchIssuesByOwnerAndRepo } from 'actions/issues.actions';
import NewIssueButton from 'components/NewIssueButton';
import { State } from 'types/redux.types';
import { values } from 'lodash/fp';
import IssueItem from 'components/IssueItem';

const IssuesView = ({
  fetchIssuesByOwnerAndRepo: fetchIssues,
  router,
  currentUser,
  issues
}: any) => {
  const repoName = router.match.params['repo_name'];
  const userName = currentUser ? currentUser.login : '';
  const issuesList = useMemo(
    () =>
      values(issues).sort((a, b) => {
        const numberA = a.number;
        const numberB = b.number;

        return numberB - numberA;
      }),
    [issues]
  );

  useEffect(() => {
    fetchIssues({ user: userName, repo: repoName });
  }, []);

  return (
    <>
      <FlexBetween>
        <Flex>
          <div>todo: filter</div>
          <SearchInput />
          <ActionButtonPrimary>Labels</ActionButtonPrimary>
          <ActionButtonPrimary>Milestones</ActionButtonPrimary>
        </Flex>
        <NewIssueButton repoName={repoName} />
      </FlexBetween>
      <ItemsContainer>
        <ItemsHeaderContainer>
          <div>containerA</div>
          <div>ContainerB</div>
        </ItemsHeaderContainer>
        {issuesList.length
          ? issuesList.map((issue: any) => (
              <IssueItem
                key={issue.id.toString()}
                id={issue.id}
                title={issue.title}
                number={issue.number}
                created_at={issue.created_at}
                comments={issue.comments}
              />
            ))
          : 'No issues yet'}
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

const mapStateToProps = (state: State) => ({
  currentUser: state.currentUser,
  issues: state.issues
});

export default connect(
  mapStateToProps,
  {
    fetchIssuesByOwnerAndRepo
  }
)(IssuesView);
