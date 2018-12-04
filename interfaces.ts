// TODO: figure out the proper interfaces for firebase and firestore
export interface AppState {
  firebase: any,
  firestore: any,
  userProfile: UserProfile
}

export interface UserProfile {
  displayName: string | null,
  email: string | null,
  loaded: boolean,
  photoUrl: string | null,
  uid: string | null,
  dueDate: Date | null,
  height: number | null,
  initialWeight: number | null,
}
