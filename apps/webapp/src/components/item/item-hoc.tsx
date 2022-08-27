import { FC, useMemo, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@affinity-rpg/models/routes";
import { Item } from "@affinity-rpg/models/item";
import { useGetItemQuery } from "../../api/items";
import { createItem } from "../../helpers/item";

type ItemContextType = {
  item: Item;
};

export const ItemContext = createContext<ItemContextType>({
  item: createItem(),
});

const ItemHOC: FC<{ children: React.ReactNode }> = ({ children }) => {
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

export default ItemHOC;
