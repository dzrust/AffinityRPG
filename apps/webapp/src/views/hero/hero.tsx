import { FC, Fragment, useContext, useState } from "react";
import { Row, Col, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AFFINITY } from "@affinity-rpg/models";
import { Armor } from "@affinity-rpg/models";
import { Hero, STAGES } from "@affinity-rpg/models";
import { ITEM_TYPE } from "@affinity-rpg/models";
import { MASTERY_TYPE } from "@affinity-rpg/models";
import { ROUTES } from "@affinity-rpg/models";
import { Weapon } from "@affinity-rpg/models";
import AffinityScore from "./affinity-score";
import { HeroContext } from "@affinity-rpg/components";
import { useDeleteHeroMutation } from "@affinity-rpg/data/src/api/heroes";
import { useIsLoading, useUserState } from "@affinity-rpg/hooks";
import {
  ArmorViewer,
  ConfirmationModal,
  HeroDescription,
  ItemViewer,
  MasteryViewer,
  WeaponViewer,
  SkillViewer,
} from "@affinity-rpg/components";

type Props = {
  showHeroBuilder?: boolean;
  isRollsAllowed?: boolean;
};

type HeroHistory = {
  header: string;
  historyKey: keyof Pick<Hero, "maxims" | "quirks" | "habits" | "strengths" | "weaknesses">;
};

const heroHistory: HeroHistory[] = [
  { header: "Maxims", historyKey: "maxims" },
  { header: "Quirks", historyKey: "quirks" },
  { header: "Habits", historyKey: "habits" },
  { header: "Strengths", historyKey: "strengths" },
  { header: "Weaknesses", historyKey: "weaknesses" },
];

const HeroSheet: FC<Props> = ({ showHeroBuilder = true, isRollsAllowed = false }) => {
  const { hero, masteries, items } = useContext(HeroContext);
  const isLoading = useIsLoading();
  const navigator = useNavigate();
  const [isDeleting, setIsDeleting] = useState(() => false);
  const user = useUserState().user;
  const [deleteHeroAPI] = useDeleteHeroMutation();
  const deleteHero = async () => {
    if (isLoading) return;
    deleteHeroAPI(hero.id)
      .unwrap()
      .then(() => {
        navigator(ROUTES.HEROES);
      });
  };
  return (
    <div className="hero-sheet__container">
      <Row className="mt-3">
        <Col>
          <h1>
            <label>{hero.name}</label>
            {showHeroBuilder ? (
              <Button
                variant="link"
                className="ms-3"
                to={`${ROUTES.HERO_BUILDER}/${hero.id}/${STAGES.INTRO}`}
                as={Link as any}
              >
                Edit
              </Button>
            ) : null}
            {showHeroBuilder ? (
              <Button variant="danger" className="ms-3" onClick={() => setIsDeleting(true)} disabled={isLoading}>
                Delete
              </Button>
            ) : null}
          </h1>
        </Col>
      </Row>
      <hr />
      <Row className="mb-2">
        <Col>
          <HeroDescription hero={hero} />
        </Col>
      </Row>

      <AffinityScore
        affinityText="Potency"
        affinity={hero.potency}
        type={AFFINITY.POTENCY}
        isRollsAllowed={isRollsAllowed}
      />
      <AffinityScore
        affinityText="Finesse"
        affinity={hero.finesse}
        type={AFFINITY.FINESSE}
        isRollsAllowed={isRollsAllowed}
      />
      <AffinityScore affinityText="Vigor" affinity={hero.vigor} type={AFFINITY.VIGOR} isRollsAllowed={isRollsAllowed} />

      <h3 className="mt-3">Skills</h3>
      <hr />
      <SkillViewer hero={hero} isRollsAllowed={isRollsAllowed} />

      <h3 className="mt-3">Masteries</h3>
      <hr />
      <Row>
        {masteries.map((mastery) => (
          <Col xs={12} md={4} key={mastery.id} className="mt-3">
            <MasteryViewer
              mastery={mastery}
              showCooldownTracker={
                mastery.permanentEffect.length < 1 && mastery.type === MASTERY_TYPE.ACTIVE && user?.uid === hero.userId
              }
              heroId={hero.id}
              isRollingAllowed={isRollsAllowed}
            />
          </Col>
        ))}
      </Row>
      <h3 className="mt-3">Weapons</h3>
      <hr />
      <Row>
        {items
          .filter((item) => item.type.toUpperCase() === ITEM_TYPE.WEAPON)
          .map((weapon) => (
            <Col xs={12} md={4} key={weapon.id} className="mt-3">
              <WeaponViewer key={weapon.name} item={weapon as Weapon} isRollingAllowed={isRollsAllowed} />
            </Col>
          ))}
      </Row>
      <h3 className="mt-3">Armor</h3>
      <hr />
      <Row>
        {items
          .filter((item) => item.type.toUpperCase() === ITEM_TYPE.ARMOR)
          .map((armor) => (
            <Col xs={12} md={4} key={armor.id} className="mt-3">
              <ArmorViewer item={armor as Armor} isRollingAllowed={isRollsAllowed} />
            </Col>
          ))}
      </Row>

      <h3 className="mt-3">Inventory</h3>
      <hr />
      <Row>
        {items
          .filter((item) => ![ITEM_TYPE.WEAPON, ITEM_TYPE.ARMOR].includes(item.type.toUpperCase() as ITEM_TYPE))
          .map((item) => (
            <Col xs={12} md={4} key={item.id} className="mt-3">
              <ItemViewer item={item} />
            </Col>
          ))}
      </Row>

      {heroHistory.map((history) =>
        hero[history.historyKey].length > 0 ? (
          <Fragment key={history.header}>
            <h3 className="mt-3">{history.header}</h3>
            <hr />
            <Row>
              {hero[history.historyKey].map((heroHistoryEntry, index) => (
                <Col key={`${heroHistoryEntry}-${index}`}>
                  <h4>
                    <Badge bg="info">{heroHistoryEntry}</Badge>
                  </h4>
                </Col>
              ))}
            </Row>
          </Fragment>
        ) : null,
      )}

      <h3>Backstory</h3>
      <hr />
      <p>{hero.backstory}</p>

      <ConfirmationModal
        title="Confirm"
        text={`Are you sure you wish to delete ${hero.name}?`}
        isOpen={isDeleting}
        onNo={() => setIsDeleting(false)}
        onYes={deleteHero}
      />
    </div>
  );
};

export default HeroSheet;
