import { useMemo, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@affinity-rpg/models";
import { createHero, getItemModifiers } from "@affinity-rpg/helpers";
import { useGetHeroQuery, useGetItemsQuery, useGetMasteriesQuery } from "@affinity-rpg/data";

export const useHeroItems = () => {
  let { id } = useParams();

  const itemsQuery = useGetItemsQuery(id ?? "");

  return useMemo(
    () => ({
      ...itemsQuery,
      items: itemsQuery.data ?? [],
      loadItems: itemsQuery.refetch,
    }),
    [itemsQuery],
  );
};

export const useHeroMasteries = () => {
  let { id } = useParams();

  const masteryQuery = useGetMasteriesQuery(id ?? "");

  return useMemo(
    () => ({
      ...masteryQuery,
      masteries: masteryQuery.data ?? [],
      loadMasteries: masteryQuery.refetch,
    }),
    [masteryQuery],
  );
};

export const useHero = () => {
  const navigator = useNavigate();
  let route = useLocation().pathname;
  let { id } = useParams();

  const heroQuery = useGetHeroQuery(id ?? "");
  const { masteries, loadMasteries } = useHeroMasteries();
  const { items, loadItems } = useHeroItems();

  useEffect(() => {
    if (heroQuery.isError && heroQuery.error === "Not Found") {
      navigator(ROUTES.HEROES);
    }
  }, [heroQuery]);

  const refresh = useCallback(() => {
    return Promise.all([heroQuery.refetch(), loadMasteries(), loadItems()]);
  }, [id, route]);

  return useMemo(() => {
    const hero = heroQuery.data ?? createHero();
    const itemModifiers = getItemModifiers(items);
    let potencyModifier = hero.potency ?? 0,
      finesseModifier = hero.finesse ?? 0,
      vigorModifier = hero.vigor ?? 0;
    return {
      hero: {
        ...hero,
        movement: itemModifiers.movementModifier,
        potency: potencyModifier + itemModifiers.potencyModifier,
        finesse: finesseModifier + itemModifiers.finesseModifier,
        vigor: vigorModifier + itemModifiers.vigorModifier,
      },
      masteries: masteries,
      items: items,
      refresh,
    };
  }, [heroQuery, masteries, items, route, refresh]);
};
