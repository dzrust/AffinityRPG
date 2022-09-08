import { faSword } from "@fortawesome/pro-regular-svg-icons";
import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import { Weapon, STATUS_EFFECT, ROLL_TYPES, ELEMENT } from "@affinity-rpg/models";
import {
  getNumberOfSkillDiceByHeroLevel,
  getStatusEffectText,
  getElementText,
  getDefaultWeaponPointsFromRating,
  getDefaultWeaponDamage,
} from "@affinity-rpg/helpers";
import { DiceUnitDisplay } from "../displays/dice-unit-display";
import { StatDisplay } from "../displays/stat-display";
import { Emblem } from "../emblem";
import { RollButton } from "../roll/roll-button";
import { WeaponSlots } from "./weapon-slots";
import { useHero } from "@affinity-rpg/hooks";

type Props = {
  item: Weapon;
  isRollingAllowed?: boolean;
  onSelectItem?: () => void;
};
const badgeBackground = "primary";
export const WeaponViewer: FC<Props> = ({ item, isRollingAllowed = false, onSelectItem }) => {
  const { hero } = useHero();
  const weaponDefaults = useMemo(() => {
    return {
      points: getDefaultWeaponPointsFromRating(item),
      damage: getDefaultWeaponDamage(item),
    };
  }, [item]);
  return (
    <Card onClick={onSelectItem} className={!!onSelectItem ? "clickable" : ""}>
      <Card.Header className="item__card-header">
        <div className="item__card-header-emblem">
          <Emblem innerIcon={faSword} />
          <h3 className="mb-0">{item.name}</h3>
        </div>
        <span className="ms-2">
          <WeaponSlots weaponSlots={item.weaponSlotsUsed} />
        </span>
      </Card.Header>
      <Card.Body>
        {item.permanentEffect.length === 0 ? (
          <RollButton
            message={`Rolling ${item.name} damage`}
            rollType={ROLL_TYPES.ROLL}
            numberOfDice={item.damage.diceCount + hero.potency}
            modifier={item.damage.modifier}
            render={(rollDice) => (
              <DiceUnitDisplay
                label="Damage"
                diceUnit={{ ...item.damage, diceCount: item.damage.diceCount + weaponDefaults.damage }}
                variant={badgeBackground}
                isRollingAllowed={isRollingAllowed}
                rollDice={rollDice}
              />
            )}
          />
        ) : null}

        <RollButton
          message={`Rolling ${item.name} to hit`}
          rollType={ROLL_TYPES.HIT_ROLL}
          numberOfDice={hero.finesse}
          render={(rollDice) => (
            <StatDisplay
              label={`Range ${item.range}DU`}
              display={item.permanentEffect.length === 0}
              variant={badgeBackground}
              isRollingAllowed={isRollingAllowed}
              rollDice={rollDice}
            />
          )}
        />
        <RollButton
          message={`Rolling ${item.name} status effect`}
          rollType={ROLL_TYPES.STATUS_EFFECT}
          numberOfDice={getNumberOfSkillDiceByHeroLevel(hero)}
          render={(rollDice) => (
            <StatDisplay
              label={getStatusEffectText(item.statusEffect.toUpperCase() as STATUS_EFFECT)}
              display={item.statusEffect.toUpperCase() !== STATUS_EFFECT.NONE}
              variant={badgeBackground}
              isRollingAllowed={isRollingAllowed}
              rollDice={rollDice}
            />
          )}
        />
        <StatDisplay
          label={getElementText(item.element.toUpperCase() as ELEMENT)}
          display={item.permanentEffect.length === 0}
          variant={badgeBackground}
        />
        {item.affinityStats.map((affinityStat) => (
          <StatDisplay
            key={`${affinityStat.affinity}-${affinityStat.stat}`}
            label={`${affinityStat.affinity} +${affinityStat.stat}`}
            display={item.permanentEffect.length === 0}
            variant={badgeBackground}
          />
        ))}
        {item.permanentEffect ? (
          <div>
            Permanent Effect: <span>{item.permanentEffect}</span>&nbsp;
          </div>
        ) : null}
      </Card.Body>
      {item.description.length > 0 ? (
        <Card.Footer>
          <em>{item.description}</em>
        </Card.Footer>
      ) : null}
    </Card>
  );
};
