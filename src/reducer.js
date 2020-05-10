import {
  LOGIN,
  REGISTER,
  LOGINPROCESSING,
  REGISTERING,
} from './actions/actionTypes';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: true };
      break;
    case REGISTER:
      return { ...state, registered: true };
      break;
    case LOGINPROCESSING:
      return { ...state, loginProcessing: true };
      break;
    case REGISTERING:
      return { ...state, registering: true };
      break;
    default:
      return state;
  }
};
