import React, { useEffect } from 'react';
import { State } from 'types/redux.types';
import { fetchRepos, setRepos } from 'actions/repos.actions';
import { connect } from 'react-redux';
import { values } from 'lodash/fp';
import styled from '@emotion/styled';
import RouteWrapper from 'components/RouteWrapper';

const ReposView = ({ repos, fetchRepos, setRepos }: any) => {
  const reposList = values(repos);

  useEffect(() => {
    //fetchRepos();
    fetch(`https://api.github.com/user/repos`, {
      headers: {
        Authorization: `token ${window.sessionStorage.getItem('_token')}`
      }
    }).then(httpResponse => {
      httpResponse.json().then(jsonResponse => {
        setRepos(jsonResponse);
      });
    });
  }, []);

  if (!reposList.length) {
    return <h2>No repos yet</h2>;
  }

  return (
    <RouteWrapper>
      <ReposGrid>
        {reposList.map(repo => (
          <Repo key={repo.id}>
            <RepoName>{repo.name}</RepoName>
          </Repo>
        ))}
      </ReposGrid>
    </RouteWrapper>
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

export default connect(
  mapStateToProps,
  {
    fetchRepos,
    setRepos
  }
)(ReposView);
