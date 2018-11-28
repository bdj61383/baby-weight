export interface LoadUser {
  payload: firebase.User,
  type: 'LoadUser'
}

export const loadUserAction = (payload:firebase.User): LoadUser => (
  {
    payload,
    type: 'LoadUser',
  }
)
