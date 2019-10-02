import { handleActions } from 'redux-actions';
import { LOGIN } from 'constants/actionNames.constants';

const currentUserReducer = handleActions<any>(
  {
    LOGIN: (state, action) => {
      const { user } = action.payload;

      return { user };
    }
  },

  null
);

export default currentUserReducer;
