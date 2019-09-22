import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addNewIssue } from 'actions/issues.actions';
import styled from '@emotion/styled';
import RouteWrapper from 'components/RouteWrapper';
import ItemsContainer from 'components/ItemsContainer';
import CreateButton from 'components/CreateButton';
import { Link } from 'react-router-dom';

const NewIssueView = ({ addNewIssue }: any) => {
  const [issueTitle, setIssueTitle] = useState('');
  return (
    <RouteWrapper>
      <ItemsContainer>
        <FromItemContainer>
          <TitleInput
            placeholder="Title"
            id="issue-title"
            value={issueTitle}
            onChange={e => setIssueTitle(e.currentTarget.value)}
          />
        </FromItemContainer>
        <FromItemContainer>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <CreateButton onClick={e => addNewIssue(issueTitle)}>
              SAVE
            </CreateButton>
          </Link>
        </FromItemContainer>
      </ItemsContainer>
    </RouteWrapper>
  );
};

const FromItemContainer = styled.div`
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

export default connect(
  null,
  { addNewIssue }
)(NewIssueView);
