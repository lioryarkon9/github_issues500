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
import { NEW_ISSUE_URL } from 'constants/custom';
import NewIssueView from 'components/NewIssueView';

class App extends React.Component<{}> {
  render() {
    console.info('state: ', store.getState());
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
