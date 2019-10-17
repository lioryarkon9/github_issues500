import React, { useState } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import moment from 'moment';
import WithAuth from 'components/WithAuth';
import CreateButton from 'components/CreateButton';
import { fetchIssuesByOwnerAndRepo, updateIssue } from 'actions/issues.actions';
import { Redirect } from 'react-router';

const SingleIssueView = ({
  router,
  issues,
  updateIssue,
  currentUser,
  fetchIssuesByOwnerAndRepo
}: any) => {
  const singleIssueId = parseInt(router.match.params.id);
  const repoName = router.match.params.repoName;
  const currentIssue = issues[singleIssueId];
  const title = currentIssue ? currentIssue.title : '';
  const body = currentIssue ? currentIssue.body : '';
  const [isEditable, setIsEditable] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [bodyValue, setBodyValue] = useState(body);

  if (!currentIssue) {
    return <Redirect to="/issues" />;
  }

  return (
    <>
      <TopContainer>
        <TitleAndNumberContainer>
          <div>
            {!isEditable ? (
              currentIssue.title
            ) : (
              <TitleInput
                value={titleValue}
                onChange={e => setTitleValue(e.currentTarget.value)}
              />
            )}
            <NumberSpan> #{currentIssue.number}</NumberSpan>
          </div>
        </TitleAndNumberContainer>

        <EditButton
          onClick={() => {
            setIsEditable(!isEditable);
            setTitleValue(currentIssue.title);
            setBodyValue(currentIssue.body);
          }}>
          {isEditable ? 'Cancel' : 'Edit'}
        </EditButton>
      </TopContainer>
      <MiddleContainer>
        <StateMockButton issueState={currentIssue.state}>
          {currentIssue.state}
        </StateMockButton>
        <IssueInfo>
          {currentIssue.user.login} opened this issue{' '}
          {moment(currentIssue.created_at).fromNow()} &#183;{' '}
          {currentIssue.comments}
        </IssueInfo>
      </MiddleContainer>

      <IssueBody>
        {isEditable ? (
          <TextArea
            value={bodyValue}
            onChange={e => setBodyValue(e.currentTarget.value)}
          />
        ) : (
          currentIssue.body
        )}
      </IssueBody>

      {isEditable ? (
        <FlexJustifiedCenter>
          <CreateButton
            onClick={() =>
              updateIssue({
                issueTitle: titleValue,
                issueBody: bodyValue,
                userName: currentUser.login,
                repoName,
                issueNumber: currentIssue.number,
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

const mapStateToProps = (state: any) => ({
  issues: state.issues,
  currentUser: state.currentUser
});

const connectedSingleIssueView = connect(
  mapStateToProps,
  {
    updateIssue,
    fetchIssuesByOwnerAndRepo
  }
)(SingleIssueView);

export default WithAuth(connectedSingleIssueView);
