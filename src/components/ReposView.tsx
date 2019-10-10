import React, { useEffect } from 'react';
import { State } from 'types/redux.types';
import { fetchRepos } from 'actions/repos.actions';
import { connect } from 'react-redux';
import { values } from 'lodash/fp';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import WithAuth from 'components/WithAuth';

const ReposView = ({ repos, fetchRepos: fetchUserRepos }: any) => {
  const reposList = values(repos);

  useEffect(() => {
    fetchUserRepos();
  }, []);

  if (!reposList.length) {
    return <h2>No repos yet</h2>;
  }

  return (
    <>
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
  border: 1px solid;
  border-radius: 5px;
  box-shadow: 0 0 2px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
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
