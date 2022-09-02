import { FC, useMemo, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES, Mastery } from "@affinity-rpg/models";
import { useGetMasteryQuery } from "@affinity-rpg/data";
import { createMastery } from "@affinity-rpg/helpers";

type MasteryContextType = {
  mastery: Mastery;
};

export const MasteryContext = createContext<MasteryContextType>({
  mastery: createMastery(),
});

export const MasteryHOC: FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigator = useNavigate();
  let { id, masteryId } = useParams();

  const { data: mastery, isError, error } = useGetMasteryQuery({ heroId: id ?? "", masteryId: masteryId ?? "" });

  useEffect(() => {
    if (isError && error === "Not Found") {
      navigator(ROUTES.HEROES);
    }
  }, [isError, error]);

  const masteryContext = useMemo<MasteryContextType>(() => ({ mastery: mastery ?? createMastery() }), [mastery]);

  if (!mastery) {
    return null;
  }
  return <MasteryContext.Provider value={masteryContext}>{children}</MasteryContext.Provider>;
};
