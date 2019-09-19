import React from 'react';
import RouteWrapper from 'components/RouteWrapper';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

const SingleIssueView = (props: any) => {
  const currentIssue = props.issues[props.currentIssueId];
  return (
    <RouteWrapper>
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
        <StateMockButton>{currentIssue.state}</StateMockButton>
        <IssueInfo>
          {currentIssue.user.login} opened this issue (todo: prettyDate) &#183;{' '}
          {currentIssue.comments}
        </IssueInfo>
      </MiddleContainer>
    </RouteWrapper>
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

const StateMockButton = styled.div`
  background-color: red;
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

const mapStateToProps = (state: any) => ({
  issues: state.issues,
  currentIssueId: state.ui.currentIssueId
});

export default connect(mapStateToProps)(SingleIssueView);
