import { FC, useMemo, useEffect, createContext, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Hero } from "../../models/hero";
import { Item } from "../../models/item";
import { Mastery } from "../../models/mastery";
import { ROUTES } from "../../models/routes";
import { useGetHeroQuery } from "../../api/heroes";
import { useGetMasteriesQuery } from "../../api/masteries";
import { useGetItemsQuery } from "../../api/items";
import { getItemModifiers } from "../../helpers/item";
import { createHero } from "../../helpers/hero";

type HeroContextType = {
  hero: Hero & { movement: number };
  masteries: Mastery[];
  items: Item[];
  refresh: () => void;
};

export const HeroContext = createContext<HeroContextType>({
  hero: { ...createHero(), movement: 0 },
  masteries: [],
  items: [],
  refresh: () => {},
});

const HeroHOC: FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigator = useNavigate();
  let route = useLocation().pathname;
  let { id } = useParams();

  const { data: hero, isError, error, refetch: loadHero } = useGetHeroQuery(id ?? "");
  const { data: masteries, refetch: loadMasteries } = useGetMasteriesQuery(id ?? "");
  const { data: items, refetch: loadItems } = useGetItemsQuery(id ?? "");

  useEffect(() => {
    if (isError && error === "Not Found") {
      navigator(ROUTES.HEROES);
    }
  }, [isError, error]);

  const refresh = useCallback(() => {
    return Promise.all([loadHero(), loadMasteries(), loadItems()]);
  }, [id, route]);

  const heroContext = useMemo<HeroContextType>(() => {
    const heroContext = hero ?? createHero();
    const itemModifiers = getItemModifiers(items ?? []);
    let potencyModifier = hero?.potency ?? 0,
      finesseModifier = hero?.finesse ?? 0,
      vigorModifier = hero?.vigor ?? 0;
    return {
      hero: {
        ...heroContext,
        movement: itemModifiers.movementModifier,
        potency: potencyModifier + itemModifiers.potencyModifier,
        finesse: finesseModifier + itemModifiers.finesseModifier,
        vigor: vigorModifier + itemModifiers.vigorModifier,
      },
      masteries: masteries ?? [],
      items: items ?? [],
      refresh,
    };
  }, [hero, masteries, items, route]);

  if (!hero) {
    return null;
  }
  return <HeroContext.Provider value={heroContext}>{children}</HeroContext.Provider>;
};

export default HeroHOC;
