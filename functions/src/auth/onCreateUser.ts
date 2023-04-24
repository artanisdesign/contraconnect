import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export async function setupUser(user: admin.auth.UserRecord): Promise<any> {
  // ...
  //create user in the DB
  //save to users collection

  //create organisation for this user
  //unless the user is anyonymous or invited
  const { email = "", uid } = user;
  let customClaims: any = {
    dashboard: true,
  };
  //set up admins!
  if (
    email &&
    (email === "artanis99@gmail.com" || email === "artanis@artanis.hu")
  ) {
    customClaims = {
      admin: true,
    };
  }
  if (user.providerData && user.providerData.length > 0) {
    const { providerId } = user.providerData[0];
    if (providerId === "anonymous") {
      customClaims = {
        anonymous: true,
      };
      //do nothing with anon users - its disabled now, but maybe later
      return true;
    }
  }
  let isInvitedUser = false;
  let invitedUserData = null;
  try {
    const invitedUser = await admin
      .firestore()
      .collection("invited-users")
      .doc(uid)
      .get();
    if (invitedUser.exists) {
      isInvitedUser = true;
      invitedUserData = invitedUser.data();
    }
  } catch (e) {}

  // Set custom user claims on this newly created user.
  try {
    if (isInvitedUser && invitedUserData && invitedUserData.organisations) {
      customClaims["organisations"] = invitedUserData.organisations;
    } else {
      customClaims["organisations"] = [uid];
    }

    //set customclaims
    await admin.auth().setCustomUserClaims(uid, customClaims);

    const data = {
      uid,
      email,
      ...customClaims,
      createdAtFirebase: admin.firestore.FieldValue.serverTimestamp(),
      created: Date.now(),
      disabled: user.disabled,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified,
      providerData: user.providerData,
    };
    functions.logger.info("Creating user", data);

    await admin.firestore().collection("users").doc(uid).set(data);

    if (!isInvitedUser) {
      //create organisation for this user, because its not an invited user
      await admin.firestore().collection("organisations").doc(uid).set(
        {
          id: uid,
          name: "",
          createdBy: uid,
          createdAt: Date.now(),
          createdAtFirebase: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (e) {
    functions.logger.error("Error", e);
  }

  return true;
}
