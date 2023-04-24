import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../_firebase/firebaseApp";

export const subscribeToAttemptResult = (
  id: string,
  observer: (snapshot: DocumentSnapshot) => void
) => {
  const docRef = doc(firestore, "attempts", id);

  return onSnapshot(docRef, observer);
};

export const saveAttempt = async (attempt: any) => {
  console.log("attempt", attempt);
  const docRef = await addDoc(collection(firestore, "attempts"), {
    ...attempt,
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};
