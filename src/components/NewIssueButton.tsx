import { Link } from 'react-router-dom';
import CreateButton from 'components/CreateButton';
import React from 'react';

const NewIssueButton = () => (
  <Link to="new_issue" style={{ textDecoration: 'none' }}>
    <CreateButton>New issue</CreateButton>
  </Link>
);

export default NewIssueButton;
