import { GET_ERRORS } from "../actions/types";
const initialState = {error: ''};
export default function(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case GET_ERRORS:
      return { error: action.payload };
    default:
      return state;
  }
}