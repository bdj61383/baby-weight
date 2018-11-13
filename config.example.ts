// TODO: Move this into ENV during build
const config = {
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    messagingSenderId: "",
    projectId: "",
    storageBucket: ""  
  },
  oauth: {
    google: {
      ios: '',
      projectId: ''
    }
  }
}

export const AppConfig = config;
