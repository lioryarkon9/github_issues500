import { Link } from 'react-router-dom';
import { NEW_ISSUE_URL } from 'constants/custom.constants';
import CreateButton from 'components/CreateButton';
import React from 'react';

const NewIssueButton = () => (
  <Link to={NEW_ISSUE_URL} style={{ textDecoration: 'none' }}>
    <CreateButton>New issue</CreateButton>
  </Link>
);

export default NewIssueButton;
