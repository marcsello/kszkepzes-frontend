import { } from '../actions/types';

const INITIAL_STATE = {
  can_submit: [],
  no_submit: [],
  wait_correction: [],
  no_accept: [],
  accepted: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
