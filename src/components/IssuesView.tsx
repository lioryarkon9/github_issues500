import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import RouteWrapper from 'components/RouteWrapper';
import IssuesList from 'components/IssuesList';
import ItemsContainer from 'components/ItemsContainer';
import { fetchIssuesByOwnerAndRepo } from 'actions/issues';
import NewIssueButton from 'components/NewIssueButton';

const IssuesView = () => {
  useEffect(() => {
    console.info('useEffect fired: uncomment the fetch method');
    //props.fetchIssuesByOwnerAndRepo();
  }, []);
  return (
    <RouteWrapper>
      <TopContainer>
        <SubContainerTop>
          <div>todo: filter</div>
          <SearchInput />
          <ActionButtonType1>Labels</ActionButtonType1>
          <ActionButtonType1>Milestones</ActionButtonType1>
        </SubContainerTop>
        <NewIssueButton />
      </TopContainer>
      <ItemsContainer>
        <ItemsHeaderContainer>
          <div>containerA</div>
          <div>ContainerB</div>
        </ItemsHeaderContainer>
        <IssuesList />
      </ItemsContainer>
    </RouteWrapper>
  );
};

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubContainerTop = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 320px;
  :hover {
    border: 0.5px solid #0366d6;
  }
  color: #586069;
  padding-left: 30px;
  margin-right: 1%;
  border: 1px solid #d1d5da;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 1.1em;
`;

const ActionButtonType1 = styled.div`
  min-width: 100px;
  height: 30px;
  color: #586069;
  font-weight: bold;
  border: 1px solid #e1e4e8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3px 0 3px;
  cursor: pointer;
  :hover {
    background-color: #f6f8fa;
  }
`;

const ItemsHeaderContainer = styled.div`
  height: 60px;
  padding: 0 12px 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f8fa;
  border-bottom: 1px solid #d1d5da;
`;

export default connect(
  null,
  { fetchIssuesByOwnerAndRepo }
)(IssuesView);
