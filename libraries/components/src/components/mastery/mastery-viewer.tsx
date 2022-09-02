import { faFireFlame } from "@fortawesome/pro-duotone-svg-icons";
import { faAtom, faExplosion } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import { Mastery, MASTERY_CLASSIFICATION, MASTERY_TYPE, ROLL_TYPES, STATUS_EFFECT } from "@affinity-rpg/models";
import { useUpdateMasteryMutation } from "@affinity-rpg/data";
import { getNumberOfSkillDiceByHeroLevel, getStatusEffectText, getElementText } from "@affinity-rpg/helpers";
import { useIsLoading } from "@affinity-rpg/hooks";
import { HeroContext } from "../hero/hero-hoc";
import { DiceUnitDisplay } from "../displays/dice-unit-display";
import { StatDisplay } from "../displays/stat-display";
import { Emblem } from "../emblem";
import { RollButton } from "../roll/roll-button";

type Props = {
  mastery: Mastery;
  showCooldownTracker?: boolean;
  heroId?: string;
  onSelectMastery?: () => void;
  isRollingAllowed?: boolean;
};

export const MasteryViewer: FC<Props> = ({
  mastery,
  showCooldownTracker = false,
  heroId,
  isRollingAllowed = false,
  onSelectMastery,
}) => {
  const [cooldown, setCooldown] = useState(() => mastery.currentCooldown ?? 0);
  const { hero } = useContext(HeroContext);
  const isLoading = useIsLoading();
  const [updateMastery] = useUpdateMasteryMutation();
  const cooldownArray = useMemo(() => {
    const tempCooldownArray: string[] = [];
    for (let i = 0, length = mastery.cooldown - mastery.reduceCooldown; i < length; i++) {
      tempCooldownArray.push(`${mastery.id}-cd-${i}`);
    }
    return tempCooldownArray;
  }, [mastery]);
  const updateCooldown = (newCooldown: number) => {
    if (!heroId || isLoading) return;
    let finalEvaluatedCooldown = newCooldown + 1;
    if (cooldown === newCooldown + 1) {
      finalEvaluatedCooldown = newCooldown;
    }
    setCooldown(finalEvaluatedCooldown);
    updateMastery({ mastery: { ...mastery, currentCooldown: finalEvaluatedCooldown }, heroId: heroId ?? "" });
  };
  const isActive = mastery.type === MASTERY_TYPE.ACTIVE;
  const cardBackground = useMemo(() => {
    switch (mastery.classification.toUpperCase()) {
      case MASTERY_CLASSIFICATION.PRIMARY:
        return "primary";
      case MASTERY_CLASSIFICATION.SECONDARY:
        return "secondary";
      case MASTERY_CLASSIFICATION.INNATE:
        return "info";
      case MASTERY_CLASSIFICATION.MASTERY:
        return "dark";
      default:
        return "dark";
    }
  }, [mastery]);
  const badgeBackground = useMemo(() => {
    switch (mastery.classification.toUpperCase()) {
      case MASTERY_CLASSIFICATION.PRIMARY:
        return "dark";
      case MASTERY_CLASSIFICATION.SECONDARY:
        return "dark";
      case MASTERY_CLASSIFICATION.INNATE:
        return "dark";
      case MASTERY_CLASSIFICATION.MASTERY:
        return "light";
      default:
        return "dark";
    }
  }, [mastery]);
  const isPassiveMastery = mastery.type === MASTERY_TYPE.PASSIVE;
  const isCooldownStatsShown = mastery.cooldown > 0 && !isPassiveMastery;

  return (
    <Card onClick={onSelectMastery} className={!!onSelectMastery ? "clickable" : ""} bg={cardBackground} text="white">
      <Card.Header className="mastery__card-header">
        <div className="mastery__card-header-emblem">
          <Emblem innerIcon={isActive ? faExplosion : faAtom} />
          <h3 className="mb-0">{mastery.name}</h3>
        </div>
      </Card.Header>

      <Card.Body>
        {mastery.permanentEffect.length === 0 ? (
          <div>
            <RollButton
              message={`Rolling ${mastery.name} damage`}
              rollType={ROLL_TYPES.ROLL}
              numberOfDice={mastery.damage.diceCount + hero.potency}
              modifier={mastery.damage.modifier}
              render={(rollDice) => (
                <DiceUnitDisplay
                  label="Damage"
                  diceUnit={mastery.damage}
                  variant={badgeBackground}
                  isRollingAllowed={isRollingAllowed}
                  rollDice={rollDice}
                />
              )}
            />

            <DiceUnitDisplay label="Armor" diceUnit={mastery.armor} variant={badgeBackground} />
            <RollButton
              message={`Rolling ${mastery.name} health`}
              rollType={ROLL_TYPES.ROLL}
              numberOfDice={mastery.heal.diceCount + hero.potency}
              modifier={mastery.heal.modifier}
              render={(rollDice) => (
                <DiceUnitDisplay
                  label="Heal"
                  diceUnit={mastery.heal}
                  variant={badgeBackground}
                  isRollingAllowed={isRollingAllowed}
                  rollDice={rollDice}
                />
              )}
            />

            <RollButton
              message={`Rolling ${mastery.name} to hit`}
              rollType={ROLL_TYPES.HIT_ROLL}
              numberOfDice={hero.finesse}
              render={(rollDice) => (
                <StatDisplay
                  label={`Range ${mastery.distance > 0 ? `${mastery.distance}DU` : "Self"}`}
                  display={!isPassiveMastery}
                  variant={badgeBackground}
                  isRollingAllowed={isRollingAllowed}
                  rollDice={rollDice}
                />
              )}
            />

            <StatDisplay
              label={`Cooldown ${mastery.cooldown}TU`}
              display={isCooldownStatsShown && !showCooldownTracker}
              variant={badgeBackground}
            />
            <StatDisplay
              label={mastery.duration > 0 ? `Lasts ${mastery.duration}TU` : "Instant"}
              display={!isPassiveMastery}
              variant={badgeBackground}
            />
            <StatDisplay label={`AOE ${mastery.aoe}DU`} display={mastery.aoe > 0} variant={badgeBackground} />
            <RollButton
              message={`Rolling ${mastery.name} status effect`}
              rollType={ROLL_TYPES.STATUS_EFFECT}
              numberOfDice={getNumberOfSkillDiceByHeroLevel(hero)}
              render={(rollDice) => (
                <StatDisplay
                  label={getStatusEffectText(mastery.statusEffect.toUpperCase() as STATUS_EFFECT)}
                  display={mastery.statusEffect.toUpperCase() !== STATUS_EFFECT.NONE}
                  variant={badgeBackground}
                  isRollingAllowed={isRollingAllowed}
                  rollDice={rollDice}
                />
              )}
            />
            <StatDisplay
              label={getElementText(mastery.element)}
              display={isCooldownStatsShown}
              variant={badgeBackground}
            />
            {mastery.affinityStats.map((affinityStat) => (
              <StatDisplay
                key={`${affinityStat.affinity}-${affinityStat.stat}`}
                label={`${affinityStat.affinity} +${affinityStat.stat}`}
                display={isCooldownStatsShown}
                variant={badgeBackground}
              />
            ))}
            {mastery.tempEffect ? (
              <div>
                <label>Temp Effect</label>
                &nbsp;
                {mastery.tempEffect}
                &nbsp;
              </div>
            ) : null}
          </div>
        ) : null}
        {mastery.permanentEffect ? (
          <div>
            <label>Permanent Effect</label>
            &nbsp;{mastery.permanentEffect}
            &nbsp;
          </div>
        ) : null}
        <div>
          <em>{mastery.description}</em>
        </div>
      </Card.Body>
      {showCooldownTracker && heroId ? (
        <Card.Footer className="mastery__card-footer">
          <h4 className="me-2 mb-0">Cooldown</h4>
          {cooldownArray.map((cooldownName, i) => (
            <FontAwesomeIcon
              key={cooldownName}
              icon={faFireFlame}
              className={`mastery__cooldown ${
                i + 1 <= cooldown ? "mastery__cooldown-active" : "mastery__cooldown-inactive"
              }`}
              onClick={() => updateCooldown(i)}
            />
          ))}
        </Card.Footer>
      ) : null}
    </Card>
  );
};
