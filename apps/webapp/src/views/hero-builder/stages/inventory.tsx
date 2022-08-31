import { Formik } from "formik";
import { FC, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createArmor } from "@affinity-rpg/helpers/armor";
import { createItem } from "@affinity-rpg/helpers/item";
import { createWeapon } from "@affinity-rpg/helpers/weapon";
import { Armor } from "@affinity-rpg/models/armor";
import { HeroInventoryFormModel, heroInventoryFormModel, STAGES } from "@affinity-rpg/models/hero";
import { Item, ITEM_TYPE } from "@affinity-rpg/models/item";
import { ROUTES } from "@affinity-rpg/models/routes";
import { Weapon } from "@affinity-rpg/models/weapon";
import ArmorViewer from "@affinity-rpg/components/src/components/armor/armor-viewer";
import { HeroContext } from "@affinity-rpg/components/src/components/hero/hero-hoc";
import ItemViewer from "@affinity-rpg/components/src/components/item/item-viewer";
import WeaponViewer from "@affinity-rpg/components/src/components/weapon/weapon-viewer";
import { useUpdateHeroMutation } from "@affinity-rpg/data/api/heroes";
import { useCreateItemMutation } from "@affinity-rpg/data/api/items";
import { useIsLoading } from "@affinity-rpg/hooks/src/hooks";
import FormControl from "@affinity-rpg/components/src/components/form/form-control";

const InventoryStage: FC = () => {
  const { hero, items } = useContext(HeroContext);
  const isLoading = useIsLoading();
  const navigator = useNavigate();
  const [updateHero] = useUpdateHeroMutation();
  const [createItemAPI] = useCreateItemMutation();
  const { id } = useParams();

  const onSubmit = async (form: HeroInventoryFormModel) => {
    if (!id) throw "failure";
    if (isLoading) return;
    updateHero({
      ...hero,
      money: form.money,
    })
      .unwrap()
      .then(() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.HISTORY}`));
  };

  const onSelectItem = (item: Item, isDirty: boolean) => {
    if (!isDirty) {
      navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.INVENTORY}/${item.id}`);
    }
  };

  const onAddItem = async (itemCreationFunction: () => Item) => {
    if (!id) throw "failure";
    if (isLoading) return;
    createItemAPI({ heroId: hero.id, item: itemCreationFunction() });
  };

  return (
    <Formik
      initialValues={
        {
          money: hero.money ?? 0,
        } as HeroInventoryFormModel
      }
      validationSchema={heroInventoryFormModel}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting, ...form }) => (
        <Form noValidate>
          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Money" name="money" inputProps={{ type: "number" }} />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={12} md={4}>
              <h4>Weapons</h4>
            </Col>
            <Col>
              <Button onClick={() => onAddItem(createWeapon)}>Add Weapon</Button>
            </Col>
          </Row>
          <hr />

          <Row className="mt-3">
            {(items.filter((item) => item.type.toUpperCase() === ITEM_TYPE.WEAPON) as Weapon[]).map(
              (weapon: Weapon) => (
                <Col key={weapon.id} xs={12} md={4}>
                  <WeaponViewer item={weapon} onSelectItem={() => onSelectItem(weapon, form.dirty)} />
                </Col>
              ),
            )}
          </Row>

          <Row className="mt-3">
            <Col sm={12} md={4}>
              <h4>Armor</h4>
            </Col>
            <Col>
              <Button onClick={() => onAddItem(createArmor)}>Add Armor</Button>
            </Col>
          </Row>
          <hr />
          <Row className="mt-3">
            {(items.filter((item) => item.type.toUpperCase() === ITEM_TYPE.ARMOR) as Armor[]).map((armorPiece) => (
              <Col key={armorPiece.name} xs={12} md={4}>
                <ArmorViewer item={armorPiece} onSelectItem={() => onSelectItem(armorPiece, form.dirty)} />
              </Col>
            ))}
          </Row>

          <Row className="mt-3">
            <Col sm={12} md={4}>
              <h4>Items</h4>
            </Col>
            <Col>
              <Button onClick={() => onAddItem(createItem)}>Add Item</Button>
            </Col>
          </Row>
          <hr />

          <Row className="mt-3">
            {items
              .filter((item) => ![ITEM_TYPE.ARMOR, ITEM_TYPE.WEAPON].includes(item.type.toUpperCase() as ITEM_TYPE))
              .map((item) => (
                <Col key={item.name} xs={12} md={4}>
                  <ItemViewer item={item} onSelectItem={() => onSelectItem(item, form.dirty)} />
                </Col>
              ))}
          </Row>

          <div className="hero-builder__form-buttons-container">
            <Button variant="danger" onClick={() => navigator(`${ROUTES.HERO}/${id}`)} disabled={isSubmitting}>
              Exit Builder
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.MASTERY}`)}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button onClick={() => handleSubmit()} disabled={isSubmitting}>
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InventoryStage;
