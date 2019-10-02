import React from 'react';
import { connect } from 'react-redux';
//import IssueItem from 'components/IssueItem';
import { sortIssuesFunction } from 'utils/prettify';
// import IssuesSelector, {
//   issuesFilteredByInputChangeSelector
// } from 'selectors/issues.selectors';
//import issuesSelector from 'selectors/issues.selectors';

const IssuesList = (props: any) => {
  const issuesList = Object.values(props.issues).sort(sortIssuesFunction);
  // const filteredIssuesList = Object.values(props.filteredIssues).sort(
  //   sortIssuesFunction
  // );
  // const relevantIssues = filteredIssuesList.length
  //   ? filteredIssuesList
  //   : issuesList;

  if (!issuesList.length) {
    return <div>No issues yet</div>;
  }

  return (
    <div>
      {issuesList.map((item: any) => (
        <div>item</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  issues: state.issues
});

export default connect(mapStateToProps)(IssuesList);
