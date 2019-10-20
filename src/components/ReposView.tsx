import React, { useEffect } from 'react';
import { State } from 'types/redux.types';
import { fetchRepos } from 'actions/repos.actions';
import { connect } from 'react-redux';
import { values } from 'lodash/fp';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import WithAuth from 'components/WithAuth';
import ViewTitle from 'components/ViewTitle';

const ReposView = ({ repos, fetchRepos }: any) => {
  const reposList = values(repos);

  useEffect(() => {
    fetchRepos();
  }, []);

  if (!reposList.length) {
    return <h2>No repos yet</h2>;
  }

  return (
    <>
      <ViewTitle>Choose a Repo</ViewTitle>

      <ReposGrid>
        {reposList.map(repo => (
          <Link
            style={{ textDecoration: 'none' }}
            key={repo.id}
            to={`issues/${repo.name}`}>
            <Repo>
              <RepoName>{repo.name}</RepoName>
            </Repo>
          </Link>
        ))}
      </ReposGrid>
    </>
  );
};

const RepoName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Repo = styled.div`
  height: 150px;
  width: 150px;
  border: 1px #3c4146;
  box-shadow: 0 0 2px 2px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: #3c4146;
  font-weight: bold;
  padding: 5px;
  :hover {
    background-color: #3c4146;
    color: #a6afb9;
    box-shadow: 0 0 2px 2px #a6afb9;
  }
`;

const ReposGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const mapStateToProps = (state: State) => ({
  repos: state.repos
});

const connectedReposView = connect(
  mapStateToProps,
  {
    fetchRepos
  }
)(ReposView);

export default WithAuth(connectedReposView);
