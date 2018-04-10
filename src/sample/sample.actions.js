// @flow
import { fetchPostsUrl } from 'constants/api.constants';

import type { Posts } from 'sample/sample.types';
import type {
  ActionCreator,
  ApiActionCreator,
  Dispatch
} from 'types/redux.types';

export const FETCH_POSTS = '[posts] Fetch Posts';
export const SET_POSTS = '[posts] Set Posts';

export const POSTS_LABEL = 'posts';

/* 
* Sample API action
*/
export const fetchPosts: ApiActionCreator = () => ({
  type: FETCH_POSTS,
  payload: {
    networkLabel: POSTS_LABEL,
    method: 'GET',
    url: fetchPostsUrl(),
    onSuccess: (posts, dispatch: Dispatch) => dispatch(setPosts(posts))
  },
  meta: {
    api: true
  }
});

export const setPosts: ActionCreator = (posts: Posts) => ({
  type: SET_POSTS,
  payload: {
    posts
  }
});
