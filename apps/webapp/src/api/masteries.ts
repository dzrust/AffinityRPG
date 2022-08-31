import { createApi } from "@reduxjs/toolkit/query/react";
import { DocumentData } from "firebase/firestore";
import { createMastery } from "../helpers/mastery";
import { COLLECTION_NAMES } from "../models/database";
import { Mastery } from "../models/mastery";
import { firebaseBaseQuery } from "./base-query";

export const MASTERIES_TAG = "MASTERIES";

// Define a service using a base URL and expected endpoints
export const masteriesAPI = createApi({
  reducerPath: "masteriesAPI",
  tagTypes: [MASTERIES_TAG],
  baseQuery: firebaseBaseQuery<Mastery>({
    transformData: (documentData: DocumentData) => {
      return {
        ...createMastery(),
        ...documentData.data(),
        id: documentData.id,
      } as Mastery;
    },
  }),
  endpoints: (builder) => ({
    getMasteries: builder.query<Mastery[], string>({
      query: (heroId: string) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.MASTERIES}`,
        method: "GET",
      }),
      providesTags: [MASTERIES_TAG],
    }),
    getMastery: builder.query<Mastery, { heroId: string; masteryId: string }>({
      query: ({ heroId, masteryId }) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.MASTERIES}/${masteryId}`,
        method: "GET",
      }),
      providesTags: [MASTERIES_TAG],
    }),
    createMastery: builder.mutation<void, { mastery: Mastery; heroId: string }>({
      query: ({ mastery, heroId }) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.MASTERIES}`,
        method: "POST",
        body: mastery,
      }),
      invalidatesTags: [MASTERIES_TAG],
    }),
    updateMastery: builder.mutation<void, { mastery: Mastery; heroId: string }>({
      query: ({ mastery, heroId }) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.MASTERIES}/${mastery.id}`,
        method: "PUT",
        body: mastery,
      }),
      invalidatesTags: [MASTERIES_TAG],
    }),
    deleteMastery: builder.mutation<void, { heroId: string; masteryId: string }>({
      query: ({ heroId, masteryId }) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.MASTERIES}/${masteryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [MASTERIES_TAG],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMasteryQuery,
  useCreateMasteryMutation,
  useDeleteMasteryMutation,
  useGetMasteriesQuery,
  useUpdateMasteryMutation,
} = masteriesAPI;
