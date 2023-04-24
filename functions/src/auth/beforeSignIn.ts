import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
  AuthEventContext,
  AuthUserRecord,
} from "firebase-functions/lib/common/providers/identity";

if (!admin.apps.length) {
  admin.initializeApp();
  admin.firestore().settings({ ignoreUndefinedProperties: true });
}
const db = admin.firestore();

export async function beforeSignIn(
  user: AuthUserRecord,
  context: AuthEventContext
): Promise<any> {
  functions.logger.info("beforeSignIn", user, context);
  try {
    const userSnap = await db.collection("users").doc(user.uid).get();

    if (userSnap.exists) {
      //let userdata = userSnap.data();

      await userSnap.ref.update({
        lastLoginAt: Date.now(),
        lastLoginAtFirebase: admin.firestore.FieldValue.serverTimestamp(),
        lastLoginIp: context.ipAddress,
      });

      return {
        sessionClaims: {
          signInIpAddress: context.ipAddress,
        },
      };
    } else {
      return {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        customClaims: {
          organisations: [user.uid],
          dashboard: true,
        },
        sessionClaims: {
          signInIpAddress: context.ipAddress,
        },
      };
    }
  } catch (e) {
    functions.logger.error("Error in beforeSignInFunc", e);
    return {
      sessionClaims: {
        signInIpAddress: context.ipAddress,
      },
    };
  }
}
