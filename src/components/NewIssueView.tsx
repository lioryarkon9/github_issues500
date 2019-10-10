import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import ItemsContainer from 'components/ItemsContainer';
import CreateButton from 'components/CreateButton';
import { State } from 'types/redux.types';
import { addNewIssue } from 'actions/issues.actions';
import WithAuth from 'components/WithAuth';

const NewIssueView = ({ router, currentUser, addNewIssue }: any) => {
  const { login: userName } = currentUser;
  const repoName = router.match.params['repo_name'];
  const [issueTitle, setIssueTitle] = useState('');
  const [issueBody, setIssueBody] = useState('');

  return (
    <>
      <FormItemContainer>
        <TitleSpan>Create New Issue</TitleSpan>
      </FormItemContainer>
      <ItemsContainer>
        <FormItemContainer>
          <TitleInput
            placeholder="Title"
            id="issue-title"
            value={issueTitle}
            onChange={e => setIssueTitle(e.currentTarget.value)}
          />
        </FormItemContainer>
        <FormItemContainer>
          <TextArea
            onChange={e => setIssueBody(e.currentTarget.value)}
            value={issueBody}
            placeholder="Leave a comment..."
          />
        </FormItemContainer>
        <FormItemContainer>
          <CreateButton
            onClick={() =>
              addNewIssue({ issueTitle, issueBody, userName, repoName })
            }>
            SAVE
          </CreateButton>
        </FormItemContainer>
      </ItemsContainer>
    </>
  );
};

const TextArea = styled.textarea`
  width: 80%;
  background-color: #fafbfc;
  border-radius: 3px;
  height: 6em;
  padding: 0 5px 0 5px;
  font-size: 1.1em;
  resize: none;
`;

const TitleSpan = styled.span`
  font-size: 1.2em;
`;

const FormItemContainer = styled.div`
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

const mapStateToProps = (state: State) => ({
  currentUser: state.currentUser
});

const connectedNewIssueView = connect(
  mapStateToProps,
  { addNewIssue }
)(NewIssueView);

export default WithAuth(connectedNewIssueView);
