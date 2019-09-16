import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import RouteWrapper from 'components/route-wrapper';
import ItemsContainer from 'components/items-container';

const TitleInputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1%;
`;

const TitleInput = styled.input`
  width: 80%;
  background-color: #fafbfc;
  border-radius: 3px;
  height: 3em;
  padding: 0 5px 0 5px;
  font-size: 1.1em;
`;

const NewIssueView = () => {
  return (
    <RouteWrapper>
      <ItemsContainer>
        <TitleInputContainer>
          <TitleInput placeholder="Title" id="issue-title" />
        </TitleInputContainer>
      </ItemsContainer>
    </RouteWrapper>
  );
};

export default NewIssueView;
