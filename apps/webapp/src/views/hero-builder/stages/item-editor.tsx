import { Formik } from "formik";
import { FC, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AFFINITY,
  AffinityStat,
  AffinityStatFormModel,
  Armor,
  ArmorFormModel,
  armorFormModel,
  ARMOR_CLASSIFICATION,
  ELEMENT,
  STAGES,
  itemFormModel,
  ItemFormModel,
  ITEM_TYPE,
  RATING,
  ROUTES,
  STATUS_EFFECT,
  Weapon,
  WeaponFormModel,
  weaponFormModel,
  WEAPON_CLASSIFICATION,
} from "@affinity-rpg/models";
import { ArmorEditorForm, WeaponEditorForm, ItemEditorForm } from "@affinity-rpg/components";
import { useUpdateItemMutation, useDeleteItemMutation } from "@affinity-rpg/data";
import { useItem } from "@affinity-rpg/hooks";
import { useIsLoading } from "../../../hooks";

const ItemEditor: FC = () => {
  const { item } = useItem();
  const isLoading = useIsLoading();
  const navigator = useNavigate();
  const { id, itemId } = useParams();
  const close = () => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.INVENTORY}`);
  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const onSubmit = async (form: ItemFormModel) => {
    if (!id || !itemId) throw "failure";
    if (isLoading) return;
    updateItem({
      heroId: id,
      item: {
        ...item,
        ...form,
        equipped: form.equipped ?? false,
        rating: form.rating?.toUpperCase() as RATING,
        affinityStats: form.affinityStats.map(
          (affinityStat) =>
            ({
              stat: affinityStat.stat ?? 0,
              affinity: affinityStat.affinity?.toUpperCase() as AFFINITY,
            } as AffinityStat),
        ),
        element: form.element?.toUpperCase() as ELEMENT,
        permanentEffect: form.permanentEffect ?? "",
        weaponSlotsUsed: parseInt(`${form.weaponSlotsUsed}`, 10) as 0 | 1 | 2,
      },
    })
      .unwrap()
      .then(() => close());
  };

  const onDelete = async () => {
    if (!id || !itemId) throw "failure";
    if (isLoading) return;
    deleteItem({ heroId: id, itemId: itemId })
      .unwrap()
      .then(() => close());
  };

  const initialValues = useMemo<ItemFormModel | ArmorFormModel | WeaponFormModel>(() => {
    const itemFormInitialValues = {
      name: item.name,
      equipped: item.equipped ?? false,
      rating: `${item.rating}`.toUpperCase(),
      affinityStats: item.affinityStats.map(
        (stat) =>
          ({
            affinity: `${stat.affinity}`.toUpperCase(),
            stat: stat.stat,
          } as AffinityStatFormModel),
      ),
      permanentEffect: item.permanentEffect ?? "",
      element: `${item.element ?? ELEMENT.PHYSICAL}`.toUpperCase(),
      description: item.description ?? "",
      weaponSlotsUsed: item.weaponSlotsUsed ?? 0,
    } as ItemFormModel;
    if (item.type.toUpperCase() === ITEM_TYPE.WEAPON) {
      const weapon = item as Weapon;
      return {
        ...itemFormInitialValues,
        weaponSlotsUsed: 1,
        damage: weapon.damage,
        classification: `${weapon.classification ?? WEAPON_CLASSIFICATION.ONE_HANDED}`.toUpperCase(),
        statusEffect: `${weapon.statusEffect ?? STATUS_EFFECT.NONE}`.toUpperCase(),
        range: weapon.range ?? 0,
        ammo: weapon.ammo ?? [],
      } as WeaponFormModel;
    }
    if (item.type.toUpperCase() === ITEM_TYPE.ARMOR) {
      const armor = item as Armor;
      return {
        ...itemFormInitialValues,
        armor: armor.armor,
        classification: `${armor.classification ?? ARMOR_CLASSIFICATION.LIGHT}`.toUpperCase(),
        movement: armor.movement ?? 0,
      } as ArmorFormModel;
    }
    return itemFormInitialValues;
  }, [item]);

  const validationSchema = useMemo(() => {
    if (item.type.toUpperCase() === ITEM_TYPE.WEAPON) {
      return weaponFormModel;
    }
    if (item.type.toUpperCase() === ITEM_TYPE.ARMOR) {
      return armorFormModel;
    }
    return itemFormModel;
  }, [item]);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => {
        if (item.type.toUpperCase() === ITEM_TYPE.WEAPON) {
          return <WeaponEditorForm close={close} onDelete={onDelete} />;
        }
        if (item.type.toUpperCase() === ITEM_TYPE.ARMOR) {
          return <ArmorEditorForm close={close} onDelete={onDelete} />;
        }
        return <ItemEditorForm close={close} onDelete={onDelete} />;
      }}
    </Formik>
  );
};

export default ItemEditor;
