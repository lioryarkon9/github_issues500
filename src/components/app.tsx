import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps
} from 'react-router-dom';
import { Provider } from 'react-redux';

// TODO: remove if no need for Lazy load routes:
import lazyLoad from 'utils/lazy-load.utils';
import store from 'store';
import theme from 'constants/themes.constants';

import RouteWrapper from 'components/RouteWrapper';
import NewIssueView from 'components/NewIssueView';
import SingleIssueView from 'components/SingleIssueView';
import LoginView from 'components/LoginView';
import ReposView from 'components/ReposView';
import IssuesView from 'components/IssuesView';

import 'antd/dist/antd.css';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouteWrapper>
            <Router>
              <Switch>
                <Route path="/login:code?" component={LoginView} />
                <Route path="/repos" component={ReposView} />
                <Route
                  path="/issues/:repo_name"
                  component={(router: RouteComponentProps) => (
                    <IssuesView router={router} />
                  )}
                />
                <Route
                  path={'/single_issue/:id/:repoName'}
                  component={(router: RouteComponentProps) => (
                    <SingleIssueView router={router} />
                  )}
                />
                <Route
                  path="/new_issue/:repo_name"
                  component={(router: RouteComponentProps) => (
                    <NewIssueView router={router} />
                  )}
                />
                <Route
                  path="/lazy"
                  component={lazyLoad(() => import('sample/lazy'))}
                />
                <Redirect from="/" to="/login" />
                <Route path="*" component={() => <h2>404: NOT FOUND</h2>} />
              </Switch>
            </Router>
          </RouteWrapper>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
