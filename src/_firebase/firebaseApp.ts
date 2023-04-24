import { getApp, initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import "firebase/database";
import { getAnalytics } from "firebase/analytics";
import {
  /*getAuth,*/
  initializeAuth,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  browserPopupRedirectResolver,
} from "firebase/auth";
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEAUREMENT_ID,
  captchaKey: process.env.REACT_APP_CAPTCHAKEY,
};

const app = initializeApp(config);
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
  experimentalAutoDetectLongPolling: true,
});

const authentication = initializeAuth(getApp(), {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
  popupRedirectResolver: browserPopupRedirectResolver,
});
// eslint-disable-next-line no-restricted-globals
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  // eslint-disable-next-line no-restricted-globals
  (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = "a78b8789-eee5-49b3-ac06-803440d5262c";
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(config.captchaKey || ""),
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

authentication.languageCode = "hu";
//const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const storage = getStorage();
export const auth = authentication;

export const fanalytics = getAnalytics(getApp());
