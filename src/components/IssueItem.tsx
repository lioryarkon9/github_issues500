import React from 'react';
import styled from '@emotion/styled';
import { getPrettyOpenedOn } from 'utils/prettify';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const IssueItem = ({ id, title, number, created_at, comments }: any) => (
  <StyledIssue>
    <LeftContainer>
      <Flex>
        <IssueStateIcon>
          <Icon type="solution" />
        </IssueStateIcon>
        <Link to={`/single_issue/${id}`}>
          <IssueLinkSpan>{title}</IssueLinkSpan>
        </Link>
      </Flex>
      <SmallText>
        {number} {getPrettyOpenedOn(created_at)}
      </SmallText>
    </LeftContainer>
    <RightContainer>{comments}</RightContainer>
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

const Flex = styled.div`
  display: flex;
`;

const IssueStateIcon = styled.div`
  margin-right: 5px;
`;

const IssueLinkSpan = styled.span`
  color: black;
  :hover {
    color: dodgerblue;
  }
`;

const SmallText = styled.div`
  color: #586069;
  font-size: small;
  ::before {
    content: '#';
  }
`;

export default IssueItem;
