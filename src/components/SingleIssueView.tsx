import React, { useState } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import moment from 'moment';
import WithAuth from 'components/WithAuth';
import CreateButton from 'components/CreateButton';
import {
  AddNewIssueProps,
  fetchIssuesByOwnerAndRepo,
  updateIssue
} from 'actions/issues.actions';
import { get } from 'lodash';
import { State } from 'types/redux.types';
import { RouteComponentProps } from 'react-router';
import { BaseAction } from 'types/base-redux.types';
import { CurrentUserState } from 'reducers/currentUser.reducer';
import { Issue } from 'reducers/issues.reducer';

type Props = {
  router: RouteComponentProps<any>;
  updateIssue(param: AddNewIssueProps & { issueNumber: number }): BaseAction;
  currentUser: CurrentUserState | null;
  currentIssue: Issue;
  fetchIssuesByOwnerAndRepo(param: { user: string; repo: string }): BaseAction;
};

const SingleIssueView = ({
  router,
  updateIssue,
  currentUser,
  currentIssue,
  fetchIssuesByOwnerAndRepo
}: Props) => {
  const { repoName } = router.match.params;

  const [isEditable, setIsEditable] = useState(false);
  const [issueTitle, setIssueTitle] = useState(get(currentIssue, 'title'));
  const [issueBody, setIssueBody] = useState(get(currentIssue, 'body'));

  if (!currentIssue) {
    if (currentUser) {
      fetchIssuesByOwnerAndRepo({ user: currentUser.login, repo: repoName });
    }

    return null;
  }

  const {
    title: originalTitle,
    body: originalBody,
    state: issueState,
    number: issueNumber
  } = currentIssue;

  return (
    <>
      <TopContainer>
        <TitleAndNumberContainer>
          <div>
            {!isEditable ? (
              originalTitle
            ) : (
              <TitleInput
                value={issueTitle}
                onChange={e => setIssueTitle(e.currentTarget.value)}
              />
            )}
            <NumberSpan> #{issueNumber}</NumberSpan>
          </div>
        </TitleAndNumberContainer>

        <EditButton
          onClick={() => {
            setIsEditable(!isEditable);
            setIssueTitle(originalTitle);
            setIssueBody(originalBody);
          }}>
          {isEditable ? 'Cancel' : 'Edit'}
        </EditButton>
      </TopContainer>
      <MiddleContainer>
        <StateMockButton issueState={issueState}>{issueState}</StateMockButton>
        <IssueInfo>
          {currentIssue.user ? currentIssue.user.login : null} opened this issue
          &middot;&nbsp;
          {moment(currentIssue.created_at).fromNow()} &middot;&nbsp;
          {currentIssue.comments}
        </IssueInfo>
      </MiddleContainer>

      <IssueBody>
        {isEditable ? (
          <TextArea
            value={issueBody}
            onChange={e => setIssueBody(e.currentTarget.value)}
          />
        ) : (
          originalBody
        )}
      </IssueBody>

      {isEditable ? (
        <FlexJustifiedCenter>
          <CreateButton
            onClick={() =>
              updateIssue({
                issueTitle,
                issueBody,
                userName: currentUser ? currentUser.login : '',
                repoName,
                issueNumber,
                router
              })
            }>
            SAVE
          </CreateButton>
        </FlexJustifiedCenter>
      ) : null}
    </>
  );
};

const EditButton = styled.div`
  background-color: #fafbfc;
  border: 1px solid gray;
  color: gray;
  width: 140px;
  height: 40px;
  :hover {
    background-color: gray;
    color: #fff;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    width: 100vw;
    margin-bottom: 5px;
  }
`;

const FlexJustifiedCenter = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  background-color: #fafbfc;
  border-radius: 3px;
  height: 6em;
  padding: 0 5px 0 5px;
  font-size: 1.1em;
  resize: none;
`;

const TitleInput = styled.input`
  background-color: #fafbfc;
  border-radius: 3px;
  padding: 5px;
  width: 40vw;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TitleAndNumberContainer = styled.div`
  display: flex;
  font-size: 2em;
  max-width: 50vw;
  flex-wrap: wrap;
`;

const NumberSpan = styled.span`
  color: gray;
`;

const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StateMockButton = styled.div<any>`
  background-color: ${({ issueState }: any): any =>
    issueState === 'open' ? 'green' : 'red'};
  color: #fff;
  width: 70px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-right: 5px;
`;

const IssueInfo = styled.div`
  color: gray;
`;

const IssueBody = styled.div`
  min-height: 5vh;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 0 2px 0 gray;
  margin-top: 10px;
`;

const mapStateToProps = (state: State, ownProps: any) => {
  const currentIssueId = parseInt(ownProps.router.match.params.id);

  return {
    currentIssue: state.issues[currentIssueId],
    currentUser: state.currentUser
  };
};

const connectedSingleIssueView = connect(
  mapStateToProps,
  {
    updateIssue,
    fetchIssuesByOwnerAndRepo
  }
)(SingleIssueView);

export default WithAuth(connectedSingleIssueView);
