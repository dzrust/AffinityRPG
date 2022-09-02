import { FC, useMemo, useState, useEffect, createContext, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Hero, ROUTES, Legend } from "@affinity-rpg/models";
import { DateTime } from "luxon";
import { useLazyGetHeroQuery, useGetLegendQuery } from "@affinity-rpg/data";
import { createLegend } from "@affinity-rpg/helpers";
import { useUserState } from "@affinity-rpg/hooks";

type LegendContextType = {
  legend: Legend;
  heroes: Hero[];
  refresh: () => void;
};

export const LegendContext = createContext<LegendContextType>({
  legend: createLegend(),
  heroes: [],
  refresh: () => {},
});

export const LegendHOC: FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigator = useNavigate();
  let route = useLocation().pathname;
  let { id } = useParams();
  const user = useUserState().user;
  const [heroes, setHeroes] = useState<Hero[]>(() => []);
  const [getHero] = useLazyGetHeroQuery();

  const { data: legend, isError, error, refetch: loadLegend } = useGetLegendQuery(id ?? "");

  useEffect(() => {
    if (isError && error === "Not Found") {
      navigator(ROUTES.LEGENDS);
    }
  }, [isError, error]);

  const loadHeroes = async (legend: Legend) => {
    if (user?.uid !== legend.gameGuideUserId) return;
    try {
      const promises = [];
      for (let i = 0; i < legend.heroIds.length; i++) {
        const hero = legend.heroIds[i];
        promises.push(getHero(hero as any).unwrap());
      }
      const heroes = await Promise.all(promises);
      setHeroes(heroes);
    } catch (err) {
      console.error(err);
    }
  };

  const refresh = useCallback(() => {
    loadLegend();
  }, [id, route]);

  const legendContext = useMemo<LegendContextType>(
    () => ({
      legend: legend
        ? { ...legend, invitationCodeGeneratedDate: DateTime.fromISO(legend?.invitationCodeGeneratedDate as any) }
        : createLegend(),
      heroes,
      refresh,
    }),
    [legend, heroes, route],
  );

  useEffect(() => {
    if (legend) {
      loadHeroes(legend);
    }
  }, [legend]);

  if (!legend) {
    return null;
  }
  return <LegendContext.Provider value={legendContext}>{children}</LegendContext.Provider>;
};