import * as functions from "firebase-functions";
import { setupUser } from "./auth/onCreateUser";
import { beforeSignIn } from "./auth/beforeSignIn";
import { docgen } from "./docgen/docgen";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const attemptToGenerateDoc = functions
  .region("europe-west3").runWith({
    //memory: "1GB",
    timeoutSeconds: 360,    
  })
  .firestore.document("attempts/{id}")
  .onCreate(async (snapshot) => docgen(snapshot));
//********************************************************************/
// AUTH FUNCTIONS
//********************************************************************/
export const authUserOnCreate = functions
  .region("europe-west3")
  .auth.user()
  .onCreate((user) => setupUser(user));
//********************************************************************/
// BLOCKING FUNCTION
//********************************************************************/
export const blockingBeforeSignIn = functions
  .region("europe-west3")
  .auth.user()
  .beforeSignIn(beforeSignIn);