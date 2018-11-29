import { getFirebase } from 'react-redux-firebase';
import { User } from './interfaces';

export interface LoadUser {
  payload: firebase.User,
  type: 'LoadUser'
}

export interface SignOffUser {
  payload: User,
  type: 'SignOffUser'
}

export const loadUserAction = (payload:firebase.User): LoadUser => (
  {
    payload,
    type: 'LoadUser',
  }
)

export function signOffUserAction(user: User) {
  return (dispatch) => {
    getFirebase().logout().then(() => dispatch(unloadUserAction(user)));
  }
}

export const unloadUserAction = (payload: User): SignOffUser => (
  {
    payload,
    type: 'SignOffUser'
  }
)

export type UserAction =
  LoadUser |
  SignOffUser