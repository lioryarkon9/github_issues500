import { Link } from 'react-router-dom';
import CreateButton from 'components/CreateButton';
import React from 'react';

type RepoName = {
  repoName: string;
};

const NewIssueButton = ({ repoName }: RepoName) => (
  <Link to={`/new_issue/${repoName}`} style={{ textDecoration: 'none' }}>
    <CreateButton>New issue</CreateButton>
  </Link>
);

export default NewIssueButton;
