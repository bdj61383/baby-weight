// TODO: figure out the proper interfaces for firebase and firestore
export interface AppState {
  firebase: any,
  firestore: any,
  user: User
}

export interface User {
  displayName: string | null,
  email: string | null,
  loaded: boolean,
  photoUrl: string | null,
  uid: string | null,
  dueDate: string | null,
  height: string | null,
  initialWeight: string | null,
}
