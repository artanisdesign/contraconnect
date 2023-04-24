import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
import Docxtemplater, { DXT } from "docxtemplater";
import angularParser from "./expressions";
import PizZip from "pizzip";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

if (!admin.apps.length) {
  admin.initializeApp();
  admin.firestore().settings({ ignoreUndefinedProperties: true });
}
//fix this
const fileBucket = "gs://doc-generator-dev.appspot.com";

//const db = admin.firestore();
const bucket = admin.storage().bucket(fileBucket);

export const docgen = async (
  snapshot: functions.firestore.QueryDocumentSnapshot
) => {
  // The Storage bucket that contains the file.
  const attempt = snapshot.data();
  const { documents = [] } = attempt;
  try {
    const outputZip = new PizZip();

    const promises = documents.map((doc: any) =>
      generateDoc(doc.url, snapshot, snapshot.id, outputZip)
    );
    await Promise.all(promises);

    const outputBlob = outputZip.generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    await bucket.file(snapshot.id + ".zip").save(outputBlob, {
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
      },
    });

    return snapshot.ref.update({
      status: "success",
      url: snapshot.id + ".zip",
    });
  } catch (e) {
    functions.logger.log(e);
    return snapshot.ref.update({
      status: "failed",
    });
  }
};

const generateDoc = async (
  docName: string,
  snapshot: functions.firestore.QueryDocumentSnapshot,
  id: string,
  outputZip: PizZip
) => {
  const attempt = snapshot.data();

  const filePath = "templates/" + docName;
  const fileName = path.basename(filePath);

  const tempFilePath = path.join(os.tmpdir(), fileName);

  try {
    functions.logger.log(filePath + " download start");
    console.time(docName + " download");
    //DOWNLOAD FILE FROM STORAGE
    await bucket.file(filePath).download({ destination: tempFilePath });
    console.timeEnd(docName + " download");
    functions.logger.log(filePath + " downloaded locally to", tempFilePath);
  } catch (e) {
    functions.logger.log(e);
  }
  const content = fs.readFileSync(tempFilePath, "binary");

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    parser: angularParser,
    nullGetter: nullGetter,
  });

  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  console.time(docName + " render");
  doc.render({
    ...attempt,
  });
  console.timeEnd(docName + " render");
  console.time(docName + " generate");
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });
  console.timeEnd(docName + " generate");
  outputZip.file(docName, buf);
  fs.unlinkSync(tempFilePath);
};

function nullGetter(part: DXT.Part) {
  /*
      If the template is {#users}{name}{/} and a value is undefined on the
      name property:

      - part.value will be the string "name"
      - scopeManager.scopePath will be ["users"] (for nested loops, you would have multiple values in this array, for example one could have ["companies", "users"])
      - scopeManager.scopePathItem will be equal to the array [2] if
        this happens for the third user in the array.
      - part.module would be empty in this case, but it could be "loop",
        "rawxml", or or any other module name that you use.
  */

  if (!part.module) {
    // part.value contains the content of the tag, eg "name" in our example
    // By returning '{' and part.value and '}', it will actually do no replacement in reality. You could also return the empty string if you prefered.
    //return "{" + part.value + "}";
    return "-";
  }
  if (part.module === "rawxml") {
    return "";
  }
  return "";
}
