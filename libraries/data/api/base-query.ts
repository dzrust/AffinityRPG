import { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  DocumentData,
  deleteDoc,
  updateDoc,
  query,
  CollectionReference,
  Query,
  DocumentSnapshot,
  QuerySnapshot,
  WhereFilterOp,
  FieldPath,
  where,
} from "firebase/firestore";
import { firestoreDB } from "../firebase";
import { COLLECTION_NAMES } from "@affinity-rpg/models/database";

export type FirebaseParams = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};

const urlRegex = new RegExp(
  `/(${COLLECTION_NAMES.HEROES}|${COLLECTION_NAMES.ITEMS}|${COLLECTION_NAMES.LEGENDS}|${COLLECTION_NAMES.MASTERIES}|${COLLECTION_NAMES.RULES})$`,
);

export const firebaseBaseQuery =
  <T>(
    {
      transformData,
    }: {
      transformData: (documentData: DocumentSnapshot<DocumentData> | QuerySnapshot<DocumentData>) => T;
    } = {
      transformData: (documentData: DocumentSnapshot<DocumentData> | QuerySnapshot<DocumentData>) => {
        return documentData as any;
      },
    },
  ): BaseQueryFn<
    {
      url: string;
      method: string;
      body?: DocumentData;
      params?: FirebaseParams[];
    },
    unknown,
    unknown
  > =>
  async (baseQueryStuff) => {
    const { url, method, body, params } = baseQueryStuff;
    const fullUrl = `/${url}`;
    switch (method.toLowerCase()) {
      case "post":
        return firebaseCreate(fullUrl, body);
      case "get":
        return firebaseRead<T>(fullUrl, transformData, params);
      case "put":
        return firebaseUpdate(fullUrl, body);
      case "delete":
        return firebaseDelete(fullUrl);
      default:
        return { error: "Route not found" };
    }
  };

const firebaseCreate = async (url: string, data?: DocumentData) => {
  try {
    await addDoc(collection(firestoreDB, url), data);
    return { data: "Success" };
  } catch (err) {
    return { error: JSON.stringify(err) };
  }
};

const firebaseRead = async <T>(
  url: string,
  transformData: (documentData: DocumentSnapshot<DocumentData> | QuerySnapshot<DocumentData>) => T,
  params?: FirebaseParams[],
) => {
  try {
    if (urlRegex.test(url)) {
      let collectionRef: Query<DocumentData> | CollectionReference<DocumentData> = collection(firestoreDB, url);
      if (params && params.length > 0) {
        collectionRef = query(
          collection(firestoreDB, url),
          ...params.map((param) => where(param.fieldPath, param.opStr, param.value)),
        );
      }
      const querySnapshot = await getDocs(collectionRef);
      const data = (querySnapshot.docs ?? []).map(transformData);
      return { data };
    } else {
      const docRef = await getDoc(doc(firestoreDB, url));
      if (!docRef.exists()) {
        return { error: "Not Found" };
      }
      const data = transformData(docRef);
      return { data };
    }
  } catch (err) {
    return { error: JSON.stringify(err) };
  }
};

const firebaseUpdate = async (url: string, data?: DocumentData) => {
  try {
    await updateDoc(doc(firestoreDB, url), data);
    return { data: "Success" };
  } catch (err) {
    return { error: JSON.stringify(err) };
  }
};

const firebaseDelete = async (url: string) => {
  try {
    await deleteDoc(doc(firestoreDB, url));
    return { data: "Success" };
  } catch (err) {
    return { error: JSON.stringify(err) };
  }
};
