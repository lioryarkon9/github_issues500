import React from 'react';
import styled from '@emotion/styled';
import { SingleIssue } from 'reducers/issues.reducer';
import { getPrettyOpenedOn } from 'utils/prettify';
import { Link } from 'react-router-dom';
import { SINGLE_ISSUE_URL } from 'constants/custom.constants';
import { setCurrentIssueId } from 'actions/ui.actions';
import { connect } from 'react-redux';

interface UiSingleIssue extends SingleIssue {
  key: string;
  setCurrentIssueId: any;
}

const IssueItem = (props: UiSingleIssue) => (
  <StyledIssue>
    <LeftContainer>
      <SubLeftContainer1>
        <IssueStateIcon />
        <Link
          to={SINGLE_ISSUE_URL}
          onClick={() => props.setCurrentIssueId(props.id)}>
          <IssueLinkSpan>{props.title}</IssueLinkSpan>
        </Link>
      </SubLeftContainer1>
      <SubLeftContainer2>
        {props.number} {getPrettyOpenedOn(props.created_at)}
      </SubLeftContainer2>
    </LeftContainer>
    <RightContainer>{props.comments}</RightContainer>
  </StyledIssue>
);

const StyledIssue = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  min-height: 2vh;
  padding: 12px;
  :hover {
    background-color: #f6f8fa;
  }
`;

const LeftContainer = styled.div`
  font-size: 1em;
`;

const RightContainer = styled.div`
  ::before {
    // todo: replace with proper img
    content: '';
  }
`;

const SubLeftContainer1 = styled.div`
  display: flex;
`;

//todo: replace with img tag and set src
const IssueStateIcon = styled.div`
  height: 1em;
  width: 1em;
  background-color: purple;
  margin-right: 5px;
`;

const IssueLinkSpan = styled.span`
  color: black;
  :hover {
    color: dodgerblue;
  }
`;

const SubLeftContainer2 = styled.div`
  color: #586069;
  font-size: small;
  ::before {
    content: '#';
  }
`;

export default connect(
  null,
  { setCurrentIssueId }
)(IssueItem);
