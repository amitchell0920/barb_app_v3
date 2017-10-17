import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  SAVE_APPOINTMENT,
  SAVE_PROFILE
} from './types';
import * as types from './types';
const ROOT_URL = 'http://localhost:8080/api/v1';

export function signinUser({ email, password }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - Save the JWT token
        localStorage.setItem('token', response.data.token)
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'))
      })
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
      })
      .catch(response => dispatch(authError('Email Address already Signed Up')))
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  return { type: UNAUTH_USER };
};

export function fetchMessage() {
  return function (dispatch) {
    axios.get('http://localhost:8080/', {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  };
};



// export const handleClick = () => ({type:types.HANDLE_CLICK});
export const saveAppointment = (appointment) => ({ type: SAVE_APPOINTMENT, appointment });
export const saveProfile = (profile) => ({ type: SAVE_PROFILE, profile });

