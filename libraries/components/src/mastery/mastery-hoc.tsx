import { FC, useMemo, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@affinity-rpg/models/routes";
import { Mastery } from "@affinity-rpg/models/mastery";
import { useGetMasteryQuery } from "@affinity-rpg/data/api/masteries";
import { createMastery } from "@affinity-rpg/data/helpers/mastery";

type MasteryContextType = {
  mastery: Mastery;
};

export const MasteryContext = createContext<MasteryContextType>({
  mastery: createMastery(),
});

const MasteryHOC: FC<{ children: React.ReactNode }> = ({ children }) => {
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

export default MasteryHOC;
