import { faShield } from "@fortawesome/pro-regular-svg-icons";
import { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import { getDefaultArmorPointsFromRating, getDefaultArmorDefense } from "../../helpers/armor";
import { getDefaultArmorMovement } from "../../helpers/item";
import { getElementText } from "../../helpers/text-helpers";
import { Armor } from "../../models/armor";
import { ROLL_TYPES } from "../../models/roll";
import DiceUnitDisplay from "../displays/dice-unit-display";
import StatDisplay from "../displays/stat-display";
import Emblem from "../emblem";
import { HeroContext } from "../hero/hero-hoc";
import RollButton from "../roll/roll-button";
import WeaponSlots from "../weapon/weapon-slots";

type Props = {
  item: Armor;
  isRollingAllowed?: boolean;
  onSelectItem?: () => void;
};

const badgeBackground = "primary";
const ArmorViewer: FC<Props> = ({ item, isRollingAllowed, onSelectItem }) => {
  const { hero } = useContext(HeroContext);
  const armorDefaults = useMemo(() => {
    return {
      points: getDefaultArmorPointsFromRating(item.rating),
      defense: getDefaultArmorDefense(item),
      movement: getDefaultArmorMovement(item),
    };
  }, [item]);
  return (
    <Card onClick={onSelectItem} className={!!onSelectItem ? "clickable" : ""}>
      <Card.Header className="item__card-header">
        <div className="item__card-header-emblem">
          <Emblem innerIcon={faShield} />
          <h3 className="mb-0">{item.name}</h3>
        </div>
        <span className="ms-2">
          <WeaponSlots weaponSlots={item.weaponSlotsUsed} />
        </span>
      </Card.Header>
      <Card.Body>
        {item.permanentEffect.length === 0 ? (
          <RollButton
            message={`Rolling resistance for ${item.name}`}
            rollType={ROLL_TYPES.RESISTANCE_ROLL}
            numberOfDice={hero.vigor}
            modifier={item.armor.modifier}
            render={(rollDice) => (
              <DiceUnitDisplay
                label="Armor"
                diceUnit={{ modifier: item.armor.modifier + armorDefaults.defense, diceCount: 0 }}
                variant={badgeBackground}
                isRollingAllowed={isRollingAllowed}
                rollDice={rollDice}
              />
            )}
          />
        ) : null}
        <StatDisplay
          label={`Movement +${item.movement + armorDefaults.movement}DU`}
          display={item.permanentEffect.length === 0}
          variant={badgeBackground}
        />
        <StatDisplay
          label={getElementText(item.element)}
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

export default ArmorViewer;
