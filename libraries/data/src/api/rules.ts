import { createApi } from "@reduxjs/toolkit/query/react";
import { DocumentData } from "firebase/firestore";
import { COLLECTION_NAMES } from "@affinity-rpg/models";
import { Rule } from "@affinity-rpg/models";
import { firebaseBaseQuery } from "./base-query";

export const RULE_TAG = "RULE";

// Define a service using a base URL and expected endpoints
export const rulesAPI = createApi({
  reducerPath: "rulesAPI",
  tagTypes: [RULE_TAG],
  baseQuery: firebaseBaseQuery<Rule>({
    transformData: (documentData: DocumentData) => {
      return {
        ...documentData.data(),
        id: documentData.id,
      } as Rule;
    },
  }),
  endpoints: (builder) => ({
    getRules: builder.query<Rule[], string>({
      query: (version: string) => ({
        url: `${COLLECTION_NAMES.RULES}`,
        params: [{ fieldPath: "version", opStr: "==", value: version }],
        method: "GET",
      }),
      providesTags: [RULE_TAG],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRulesQuery } = rulesAPI;
