import { createApi } from "@reduxjs/toolkit/query/react";
import { DocumentData } from "firebase/firestore";
import { COLLECTION_NAMES } from "@affinity-rpg/models//database";
import { Legend } from "@affinity-rpg/models//legend";
import { firebaseBaseQuery } from "./base-query";

export const LEGEND_TAG = "LEGEND";

// Define a service using a base URL and expected endpoints
export const legendsAPI = createApi({
  reducerPath: "legendsAPI",
  tagTypes: [LEGEND_TAG],
  baseQuery: firebaseBaseQuery<Legend>({
    transformData: (documentData: DocumentData) => {
      return {
        ...documentData.data(),
        id: documentData.id,
        heroIds: documentData.data().heroIds.map((heroId: any) => heroId.id),
      } as Legend & { heroIds: string[] };
    },
  }),
  endpoints: (builder) => ({
    getGGLegends: builder.query<Legend[], string>({
      query: (userId) => ({
        url: `${COLLECTION_NAMES.LEGENDS}`,
        params: [{ fieldPath: "gameGuideUserId", opStr: "==", value: userId }],
        method: "GET",
      }),
      providesTags: [LEGEND_TAG],
    }),
    getLegends: builder.query<Legend[], string>({
      query: (userId) => ({
        url: `${COLLECTION_NAMES.LEGENDS}`,
        params: [{ fieldPath: "playerUserIds", opStr: "array-contains", value: userId }],
        method: "GET",
      }),
      providesTags: [LEGEND_TAG],
    }),
    getLegend: builder.query<Legend, string>({
      query: (id: string) => ({
        url: `${COLLECTION_NAMES.LEGENDS}/${id}`,
        method: "GET",
      }),
      providesTags: [LEGEND_TAG],
    }),
    createLegend: builder.mutation<void, Legend>({
      query: (legend: Legend) => ({
        url: `${COLLECTION_NAMES.LEGENDS}`,
        method: "POST",
        body: legend,
      }),
      invalidatesTags: [LEGEND_TAG],
    }),
    updateLegend: builder.mutation<void, Legend>({
      query: (legend: Legend) => ({
        url: `${COLLECTION_NAMES.LEGENDS}/${legend.id}`,
        method: "PUT",
        body: legend,
      }),
      invalidatesTags: [LEGEND_TAG],
    }),
    deleteLegend: builder.mutation<void, string>({
      query: (legendId: string) => ({
        url: `${COLLECTION_NAMES.LEGENDS}/${legendId}`,
        method: "DELETE",
      }),
      invalidatesTags: [LEGEND_TAG],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGGLegendsQuery,
  useGetLegendsQuery,
  useCreateLegendMutation,
  useDeleteLegendMutation,
  useGetLegendQuery,
  useUpdateLegendMutation,
} = legendsAPI;
