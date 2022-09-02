import { createApi } from "@reduxjs/toolkit/query/react";
import { DocumentData } from "firebase/firestore";
import { createHero } from "@affinity-rpg/helpers";
import { COLLECTION_NAMES, Hero } from "@affinity-rpg/models";
import { firebaseBaseQuery } from "./base-query";

export const HERO_TAG = "HERO";

// Define a service using a base URL and expected endpoints
export const heroesAPI = createApi({
  reducerPath: "heroesAPI",
  tagTypes: [HERO_TAG],
  baseQuery: firebaseBaseQuery<Hero>({
    transformData: (documentData: DocumentData) => {
      return {
        ...createHero(),
        ...documentData.data(),
        id: documentData.id,
        legend: documentData.data().legend?.id ?? "",
      } as Hero;
    },
  }),
  endpoints: (builder) => ({
    getHeroes: builder.query<Hero[], void>({
      query: () => ({
        url: `${COLLECTION_NAMES.HEROES}`,
        method: "GET",
      }),
      providesTags: [HERO_TAG],
    }),
    getHeroesForUser: builder.query<Hero[], string>({
      query: (userId: string) => ({
        url: `${COLLECTION_NAMES.HEROES}`,
        params: [{ fieldPath: "userId", opStr: "==", value: userId }],
        method: "GET",
      }),
      providesTags: [HERO_TAG],
    }),
    getHero: builder.query<Hero, string>({
      query: (id: string) => ({
        url: `${COLLECTION_NAMES.HEROES}/${id}`,
        method: "GET",
      }),
      providesTags: [HERO_TAG],
    }),
    createHero: builder.mutation<void, Hero>({
      query: (hero: Hero) => ({
        url: `${COLLECTION_NAMES.HEROES}`,
        method: "POST",
        body: hero,
      }),
      invalidatesTags: [HERO_TAG],
    }),
    updateHero: builder.mutation<void, Hero>({
      query: (hero: Hero) => ({
        url: `${COLLECTION_NAMES.HEROES}/${hero.id}`,
        method: "PUT",
        body: hero,
      }),
      invalidatesTags: [HERO_TAG],
    }),
    deleteHero: builder.mutation<void, string>({
      query: (heroId: string) => ({
        url: `${COLLECTION_NAMES.HEROES}/${heroId}`,
        method: "DELETE",
      }),
      invalidatesTags: [HERO_TAG],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetHeroesQuery,
  useGetHeroesForUserQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useGetHeroQuery,
  useLazyGetHeroQuery,
  useUpdateHeroMutation,
} = heroesAPI;
