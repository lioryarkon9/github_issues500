import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import moment from 'moment';

const SingleIssueView = ({ router, issues }: any) => {
  const singleIssueId = parseInt(router.match.params.id);
  const currentIssue = issues[singleIssueId];

  return (
    <>
      <TopContainer>
        <TitleAndNumberContainer>
          <div>
            {currentIssue.title}
            <NumberSpan> #{currentIssue.number}</NumberSpan>
          </div>
        </TitleAndNumberContainer>
        <div>Todo:Buttons</div>
      </TopContainer>
      <MiddleContainer>
        <StateMockButton issueState={currentIssue.state}>
          {currentIssue.state}
        </StateMockButton>
        <IssueInfo>
          guest opened this issue {moment(currentIssue.created_at).fromNow()}{' '}
          &#183; {currentIssue.comments}
        </IssueInfo>
      </MiddleContainer>
      <IssueBody>{currentIssue.body}</IssueBody>
    </>
  );
};

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleAndNumberContainer = styled.div`
  display: flex;
  font-size: 2em;
  max-width: 50vw;
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
  issues: state.issues
});

export default connect(mapStateToProps)(SingleIssueView);
