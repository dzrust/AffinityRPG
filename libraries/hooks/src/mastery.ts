import { useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@affinity-rpg/models";
import { useGetMasteryQuery } from "@affinity-rpg/data";
import { createMastery } from "@affinity-rpg/helpers";

export const useMastery = () => {
  const navigator = useNavigate();
  let { id, masteryId } = useParams();

  const mastteryQuery = useGetMasteryQuery({ heroId: id ?? "", masteryId: masteryId ?? "" });

  useEffect(() => {
    if (mastteryQuery.isError && mastteryQuery.error === "Not Found") {
      navigator(ROUTES.HEROES);
    }
  }, [mastteryQuery.isError, mastteryQuery.error]);

  return useMemo(
    () => ({
      ...mastteryQuery,
      mastery: mastteryQuery.data ?? createMastery(),
    }),
    [mastteryQuery],
  );
};
