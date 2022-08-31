import { FC, useMemo, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../models/routes";
import { Mastery } from "../../models/mastery";
import { useGetMasteryQuery } from "../../api/masteries";
import { createMastery } from "../../helpers/mastery";

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
