import { GET_ERRORS } from "../actions/types";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
const initialState = {error: ''};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return { error: action.payload };
    default:
      return state;
  }
}