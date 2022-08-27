import { FC } from "react";
import { Badge, Button, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { getNumberOfSkillDiceByHeroLevel } from "../../helpers/hero";
import { getSkillStatesOrDefault } from "../../helpers/skills";
import { getLabelForSkill, getLabelForSkillDifficulty, getStatusEffectText } from "../../helpers/text-helpers";
import { Hero } from "../../models/hero";
import { ROLL_TYPES } from "../../models/roll";
import { DIFFICULTIES, SKILL } from "../../models/skills";
import { STATUS_EFFECT } from "../../models/status-effect";
import RollButton from "../roll/roll-button";

type Props = {
  hero: Hero;
  isRollsAllowed?: boolean;
};

const SkillViewer: FC<Props> = ({ hero, isRollsAllowed = false }) => {
  return (
    <div className="d-flex flex-wrap">
      {getSkillStatesOrDefault(hero.skills).map((skill) => {
        return (
          <div key={skill.skill} className="m-2">
            {isRollsAllowed ? (
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={
                  <Popover id="popover-basic">
                    <Popover.Body>
                      {DIFFICULTIES.slice(1, DIFFICULTIES.length).map((difficulty) => (
                        <Row key={`${skill.skill}-${difficulty}`}>
                          <RollButton
                            message={`Rolling ${getLabelForSkill(
                              skill.skill as SKILL,
                            )} for dificulty ${getLabelForSkillDifficulty(difficulty)}`}
                            rollType={ROLL_TYPES.SKILL_ROLL}
                            numberOfDice={Math.max(getNumberOfSkillDiceByHeroLevel(hero) + skill.modifier, 0)}
                            difficulty={difficulty}
                            render={(rollDice) => (
                              <Button className="my-2" variant="success" onClick={rollDice}>
                                {getLabelForSkillDifficulty(difficulty)}
                              </Button>
                            )}
                          />
                        </Row>
                      ))}
                    </Popover.Body>
                  </Popover>
                }
              >
                <Button variant="link">
                  {getLabelForSkill(skill.skill as SKILL)}{" "}
                  {skill.rollStatus.toUpperCase() !== STATUS_EFFECT.NONE
                    ? `(${getStatusEffectText(skill.rollStatus as STATUS_EFFECT)})`
                    : ""}
                </Button>
              </OverlayTrigger>
            ) : (
              <h3>
                <Badge bg="primary">
                  {getLabelForSkill(skill.skill as SKILL)}{" "}
                  {skill.rollStatus.toUpperCase() !== STATUS_EFFECT.NONE
                    ? `(${getStatusEffectText(skill.rollStatus as STATUS_EFFECT)})`
                    : ""}
                </Badge>
              </h3>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SkillViewer;
