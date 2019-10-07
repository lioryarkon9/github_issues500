import { Link } from 'react-router-dom';
import CreateButton from 'components/CreateButton';
import React from 'react';

const NewIssueButton = ({ repoName }: any) => (
  <Link to={`/new_issue/${repoName}`} style={{ textDecoration: 'none' }}>
    <CreateButton>New issue</CreateButton>
  </Link>
);

export default NewIssueButton;
