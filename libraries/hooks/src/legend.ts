import { useLazyGetHeroQuery, useGetLegendQuery } from "@affinity-rpg/data";
import { createLegend } from "@affinity-rpg/helpers";
import { Hero, ROUTES, Legend } from "@affinity-rpg/models";
import { User } from "firebase/auth";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { DateTime } from "luxon";

export const useLegend = (user: User | null) => {
  const navigator = useNavigate();
  let route = useLocation().pathname;
  let { id } = useParams();
  const [heroes, setHeroes] = useState<Hero[]>(() => []);
  const [getHero] = useLazyGetHeroQuery();

  const legendQuery = useGetLegendQuery(id ?? "");

  useEffect(() => {
    if (legendQuery.isError && legendQuery.error === "Not Found") {
      navigator(ROUTES.LEGENDS);
    }
  }, [legendQuery]);

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

  useEffect(() => {
    if (legendQuery.data) {
      loadHeroes(legendQuery.data);
    }
  }, [legendQuery]);

  return useMemo(
    () => ({
      legend: legendQuery.data
        ? {
            ...legendQuery.data,
            invitationCodeGeneratedDate: DateTime.fromISO(legendQuery.data?.invitationCodeGeneratedDate as any),
          }
        : createLegend(),
      heroes,
      refresh: legendQuery.refetch,
    }),
    [legendQuery, heroes, route],
  );
};
