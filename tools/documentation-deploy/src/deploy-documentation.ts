import { join } from "path";
import { readdir, readFile } from "fs/promises";
import { statSync } from "fs";
import { getDocs, collection, updateDoc, query, where } from "firebase/firestore";
import { firestoreDB } from "@affinity-rpg/data";
import { COLLECTION_NAMES } from "@affinity-rpg/models";

type Page = {
  path: string;
  document: string;
};

export const deployDocumentation = async () => {
  const pages: Page[] = [];
  const pathName: string[] = [];
  const promises = [];
  const version = "0.1";
  const rootPath = `documentation/${version}`;
  const rulesRef = getDocs(query(collection(firestoreDB, COLLECTION_NAMES.RULES), where("version", "==", version)));

  const directoryPath = join(__dirname, rootPath);

  const readDirectory = async (pathLocation: string): Promise<void> => {
    const promises: Promise<void>[] = [];
    const files = await readdir(pathLocation);
    for (let i = 0, { length } = files; i < length; i++) {
      const file = files[i];
      const fileLocation = join(pathLocation, file);
      if (statSync(fileLocation).isDirectory()) {
        promises.push(readDirectory(fileLocation));
      } else {
        promises.push(readFileIntoPage(fileLocation));
      }
    }
    await Promise.all(promises);
  };

  const readFileIntoPage = async (fileLocation: string) => {
    const data = await readFile(fileLocation);
    let document = data.toString("base64");
    let path = fileLocation.replace(directoryPath, "").replace(/\.md/gi, "").replace("/README", "").toLowerCase();
    if (path.length === 0) {
      path = "/";
    }
    if (pathName.includes(path)) {
      throw "Path already exists: " + path;
    }
    pathName.push(path);
    pages.push({
      path,
      document,
    });
  };

  promises.push(readDirectory(directoryPath));
  Promise.all(promises).then(async () => {
    const ruleRef = await rulesRef;
    await updateDoc(ruleRef.docs[0].ref, {
      version,
      pages,
    });
    console.log("Finished writing to the DB");
  });
};
