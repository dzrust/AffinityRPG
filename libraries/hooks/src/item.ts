import { useGetItemQuery } from "@affinity-rpg/data";
import { createItem } from "@affinity-rpg/helpers";
import { ROUTES } from "@affinity-rpg/models";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useItem = () => {
  const navigator = useNavigate();
  let { id, itemId } = useParams();
  const itemQuery = useGetItemQuery({ heroId: id ?? "", itemId: itemId ?? "" });

  useEffect(() => {
    if (itemQuery.isError && itemQuery.error === "Not Found") {
      navigator(ROUTES.HEROES);
    }
  }, [itemQuery]);

  return useMemo(() => ({ ...itemQuery, item: itemQuery.data ?? createItem() }), [itemQuery]);
};
