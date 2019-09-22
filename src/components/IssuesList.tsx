import React from 'react';
import { connect } from 'react-redux';
import IssueItem from 'components/IssueItem';
import { sortIssuesFunction } from 'utils/prettify';
import IssuesSelector from 'selectors/issues.selectors';

const IssuesList = (props: any) => {
  console.info(props);
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

const mapStateToProps = (state: any) => ({
  issues: IssuesSelector(state)
});

export default connect(mapStateToProps)(IssuesList);
