import { FC, useMemo, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES, Item } from "@affinity-rpg/models";
import { useGetItemQuery } from "@affinity-rpg/data";
import { createItem } from "@affinity-rpg/helpers";

type ItemContextType = {
  item: Item;
};

export const ItemContext = createContext<ItemContextType>({
  item: createItem(),
});

export const ItemHOC: FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigator = useNavigate();
  let { id, itemId } = useParams();
  const { data: item, isError, error } = useGetItemQuery({ heroId: id ?? "", itemId: itemId ?? "" });

  useEffect(() => {
    if (isError && error === "Not Found") {
      navigator(ROUTES.HEROES);
    }
  }, [isError, error]);

  const itemContext = useMemo<ItemContextType>(() => ({ item: item ?? createItem() }), [item]);

  if (!item) {
    return null;
  }
  return <ItemContext.Provider value={itemContext}>{children}</ItemContext.Provider>;
};
