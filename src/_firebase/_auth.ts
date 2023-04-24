import { auth } from "./firebaseApp";
//import { MAGIC } from "../constants/routes";
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
  reauthenticateWithCredential,
  sendEmailVerification,
  updatePassword,
  ActionCodeSettings,
  EmailAuthProvider,
  signInAnonymously,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";

// Sign Up
export const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string
) => createUserWithEmailAndPassword(auth, email, password);

export const doSendSignInLinkToEmail = (email: string) => {
  var actionCodeSettings: ActionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: window.location.origin /*+ MAGIC*/,
    // This must be true.
    handleCodeInApp: true,
    // iOS: {
    //   bundleId: 'com.example.ios'
    // },
    //android: {
    //  packageName: 'com.example.android',
    //  installApp: true,
    //  minimumVersion: '12'
    //},
    //dynamicLinkDomain: 'example.page.link'
  };
  window.localStorage.setItem("emailForSignIn", email);

  return sendSignInLinkToEmail(auth, email, actionCodeSettings);
};

export const isItSignInWithEmailLink = (location: string) => {
  return isSignInWithEmailLink(auth, location);
};

export const trySignInWithEmailLink = (email: string, location: string) => {
  return signInWithEmailLink(auth, email, location);
};

// Sign In
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// Sign out
export const doSignOut = () => auth.signOut();

// Sign In anonymously
export const doSignInAnonymously = () => signInAnonymously(auth);

export const doFetchSignInMethodsForEmail = (email: string) =>
  fetchSignInMethodsForEmail(auth, email);

// Password Change
export const doLinkAnonUser = async (email: string, password: string) => {
  if (auth.currentUser !== null) {
    const credential = EmailAuthProvider.credential(email, password);
    return await linkWithCredential(auth.currentUser, credential);
  } else {
    throw Error("No auth.currentUser!");
  }
};

// Password Reset
export const doPasswordReset = (email: string) =>
  sendPasswordResetEmail(auth, email, { url: window.location.href });

// Password Change
export const doPasswordUpdate = async (newPassword: string) => {
  if (auth.currentUser !== null) {
    return await updatePassword(auth.currentUser, newPassword);
  } else {
    throw Error("No auth.currentUser!");
  }
};

export const verifyEmailCode = (code: string) => applyActionCode(auth, code);

export const doVerifyPasswordResetCode = (code: string) =>
  verifyPasswordResetCode(auth, code);

export const doConfirmPasswordReset = (code: string, newPassword: string) =>
  confirmPasswordReset(auth, code, newPassword);

export const reAuthenticate = async (currentPassword: string) => {
  if (auth.currentUser && auth.currentUser.email) {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    return await reauthenticateWithCredential(auth.currentUser, credential);
  } else {
    throw Error("No auth.currentUser!");
  }
};

export const currentUser = () => {
  return auth.currentUser;
};

export const doSendEmailVerification = async () => {
  return auth.currentUser && sendEmailVerification(auth.currentUser);
};

export const doUpdateProfileName = async (name: string) => {
  if (auth.currentUser) {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  } else {
    throw Error("No auth.currentUser!");
  }
};
