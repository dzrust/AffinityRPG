import { createApi } from "@reduxjs/toolkit/query/react";
import { DocumentData } from "firebase/firestore";
import { createItem } from "@affinity-rpg/helpers";
import { COLLECTION_NAMES, Item } from "@affinity-rpg/models";
import { firebaseBaseQuery } from "./base-query";

export const ITEM_TAG = "ITEM";

// Define a service using a base URL and expected endpoints
export const itemsAPI = createApi({
  reducerPath: "itemsAPI",
  tagTypes: [ITEM_TAG],
  baseQuery: firebaseBaseQuery<Item>({
    transformData: (documentData: DocumentData) => {
      return {
        ...createItem(),
        ...documentData.data(),
        id: documentData.id,
      } as Item;
    },
  }),
  endpoints: (builder) => ({
    getItems: builder.query<Item[], string>({
      query: (heroId: string) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.ITEMS}`,
        method: "GET",
      }),
      providesTags: [ITEM_TAG],
    }),
    getItem: builder.query<Item, { heroId: string; itemId: string }>({
      query: ({ heroId, itemId }) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.ITEMS}/${itemId}`,
        method: "GET",
      }),
      providesTags: [ITEM_TAG],
    }),
    createItem: builder.mutation<void, { item: Item; heroId: string }>({
      query: ({ item, heroId }) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.ITEMS}`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: [ITEM_TAG],
    }),
    updateItem: builder.mutation<void, { item: Item; heroId: string }>({
      query: ({ item, heroId }) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.ITEMS}/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: [ITEM_TAG],
    }),
    deleteItem: builder.mutation<void, { heroId: string; itemId: string }>({
      query: ({ heroId, itemId }) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}/${COLLECTION_NAMES.ITEMS}/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: [ITEM_TAG],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useGetItemQuery,
  useUpdateItemMutation,
} = itemsAPI;
