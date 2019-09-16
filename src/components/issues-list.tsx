import React from 'react';
import { connect } from 'react-redux';
import { SingleIssue } from 'reducers/issues.reducer';
import IssueItem from 'components/issue-item';
import { sortIssuesFunction } from 'utils/prettify';

const mapStateToProps = (state: any) => ({
  issues: state.issues
});

const IssuesList = (props: any) => {
  const issuesList = Object.keys(props.issues)
    .map(issueId => props.issues[issueId])
    .sort(sortIssuesFunction);
  if (!issuesList.length) {
    return <div>No issues yet</div>;
  }
  return (
    <div>
      {issuesList.map(item => (
        <IssueItem
          key={item.id.toString()}
          url={item.url}
          repository_url={item.repository_url}
          labels_url={item.labels_url}
          comments_url={item.comments_url}
          events_url={item.events_url}
          html_url={item.html_url}
          id={item.id}
          node_id={item.node_id}
          number={item.number}
          title={item.title}
          user={item.user}
          labels={item.labels}
          state={item.state}
          locked={item.locked}
          assignee={item.assignee}
          assignees={item.assignees}
          milestone={item.milestone}
          comments={item.comments}
          created_at={item.created_at}
          updated_at={item.updated_at}
          closed_at={item.closed_at}
          author_association={item.author_association}
          body={item.body}
        />
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(IssuesList);
