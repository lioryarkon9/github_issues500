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
import NewIssueView from 'components/NewIssueView';
import SingleIssueView from 'components/SingleIssueView';
import LoginView from 'components/LoginView';
import ReposView from 'components/ReposView';
import IssuesView from 'components/IssuesView';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Route path="/login:code?" component={LoginView} />
            <Route path="/repos" component={ReposView} />
            <Route
              path="/issues/:repo_name"
              component={(router: any) => <IssuesView router={router} />}
            />

            <Route path="/new_issue" component={NewIssueView} />
            <Route
              path={'/single_issue/:id'}
              component={(router: any) => <SingleIssueView router={router} />}
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
