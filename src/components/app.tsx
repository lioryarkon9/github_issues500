import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Router } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';

import history from 'utils/history.utils';
// TODO: remove if no need for Lazy load routes:
import lazyLoad from 'utils/lazy-load.utils';

import store from 'store';
import theme from 'constants/themes.constants';

import IssuesView from 'components/IssuesView';
import { NEW_ISSUE_URL, SINGLE_ISSUE_URL } from 'constants/custom.constants';
import NewIssueView from 'components/NewIssueView';
import SingleIssueView from 'components/SingleIssueView';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Route exact path="/" name="sample" component={IssuesView} />
            <Route
              path={'/' + NEW_ISSUE_URL}
              name="new-issue"
              component={NewIssueView}
            />
            <Route path={'/' + SINGLE_ISSUE_URL} component={SingleIssueView} />
            <Route
              path="/lazy"
              name="lazy"
              component={lazyLoad(() => import('sample/lazy'))}
            />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
