import React from 'react';
import styled from '@emotion/styled';
import { SingleIssue } from 'reducers/issues.reducer';
import { getEnglishMonthNameByInt } from 'utils/prettify';

interface UiSingleIssue extends SingleIssue {
  key: string;
}

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
    content: 'C';
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

const SubLeftContainer2 = styled.div`
  color: #586069;
  font-size: small;
  ::before {
    content: '#';
  }
`;

const getPrettyOpenedOn = (strDate: string): string => {
  let result = 'opened on';
  const dateObject = new Date(strDate);
  const dd = dateObject.getDate(),
    mm = dateObject.getMonth(),
    yyyy = dateObject.getFullYear();
  result += ' ' + getEnglishMonthNameByInt(mm) + ' ' + dd + ', ' + yyyy;

  return result;
};

const IssueItem = (props: UiSingleIssue) => (
  <StyledIssue>
    <LeftContainer>
      <SubLeftContainer1>
        <IssueStateIcon />
        <div>{props.title}</div>
      </SubLeftContainer1>
      <SubLeftContainer2>
        {props.number} {getPrettyOpenedOn(props.created_at)}
      </SubLeftContainer2>
    </LeftContainer>
    <RightContainer>{props.comments}</RightContainer>
  </StyledIssue>
);

export default IssueItem;
