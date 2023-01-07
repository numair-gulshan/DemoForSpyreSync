import auth from '@react-native-firebase/auth';
import moment from 'moment';
import Toast from 'react-native-simple-toast';

export const register = async (name, email, pass) => {
  return auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(cred => {
      const {uid} = cred.user;
      auth().currentUser.updateProfile({
        displayName: name,
      });

      return uid;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Toast.show('That email address is already in use', Toast.SHORT);
      } else if (error.code === 'auth/invalid-email') {
        Toast.show('That email address is invalid', Toast.SHORT);
      } else {
        Toast.show(JSON.stringify(error), Toast.SHORT);
      }
    });
};

export const login = async (email, pass) => {
  return auth()
    .signInWithEmailAndPassword(email, pass)
    .then(() => {})
    .catch(error => {
      Toast.show(JSON.stringify(error), Toast.SHORT);
    });
};

export const logout = () => {
  return auth()
    .signOut()
    .then(() => Toast.show('User signed out', Toast.SHORT));
};
