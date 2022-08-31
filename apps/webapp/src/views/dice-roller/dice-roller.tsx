import { Formik } from "formik";
import { FC, Fragment, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  diceRollFormModel,
  DiceRollFormModelType,
  ResistanceRoll,
  Roll,
  ROLL_TYPES,
  SkillRoll,
} from "@affinity-rpg/models/roll";
import { rollD6, resistanceRoll, skillRoll } from "@affinity-rpg/helpers/roll";
import DiceDisplay from "./dice-display";
import FormControl from "@affinity-rpg/components/src/components/form/form-control";
import DiceRollTypeRadioGroup from "@affinity-rpg/components/src/components/roll/dice-roll-type-radio-group";

const DiceRoller: FC = () => {
  const [diceRoll, setDiceRoll] = useState<Roll | undefined>(() => undefined);
  const [diceSkillRoll, setDiceSkillRoll] = useState<SkillRoll | undefined>(() => undefined);
  const [diceResistanceRoll, setDiceResistanceRoll] = useState<ResistanceRoll | undefined>(() => undefined);
  const [isRolling, setIsRolling] = useState(() => false);

  const rollDice = ({ numberOfDice, rollType }: DiceRollFormModelType) => {
    setIsRolling(true);
    const rollTypeNumber = parseInt(`${rollType ?? 0}`, 10);
    switch (rollTypeNumber) {
      case ROLL_TYPES.ROLL:
        {
          setDiceRoll(rollD6(numberOfDice));
          setDiceSkillRoll(undefined);
          setDiceResistanceRoll(undefined);
        }
        break;
      case ROLL_TYPES.SKILL_ROLL:
        {
          setDiceRoll(undefined);
          setDiceSkillRoll(skillRoll(numberOfDice));
          setDiceResistanceRoll(undefined);
        }
        break;
      case ROLL_TYPES.RESISTANCE_ROLL:
        {
          setDiceRoll(undefined);
          setDiceSkillRoll(undefined);
          setDiceResistanceRoll(resistanceRoll(numberOfDice));
        }
        break;
    }
    setIsRolling(false);
  };

  return (
    <Fragment>
      <Formik
        initialValues={
          {
            numberOfDice: 0,
            rollType: ROLL_TYPES.ROLL,
          } as DiceRollFormModelType
        }
        validationSchema={diceRollFormModel}
        onSubmit={rollDice}
      >
        {({ handleSubmit }) => (
          <Fragment>
            <Row>
              <Col>
                <h1>Dice Roller</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl label="Number Of Dice To Roll" name="numberOfDice" inputProps={{ type: "number" }} />
              </Col>
            </Row>
            <Row>
              <Col>
                <DiceRollTypeRadioGroup label="Dice Roll Type" name="rollType" />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Button onClick={() => handleSubmit()} disabled={isRolling}>
                  Roll Dice
                </Button>
              </Col>
            </Row>
          </Fragment>
        )}
      </Formik>
      {diceRoll ? (
        <Row className="mt-3">
          <Col>
            <label>Total: {diceRoll?.total}</label>
          </Col>
          <Col sm={12}>
            <DiceDisplay results={diceRoll.results} />
          </Col>
        </Row>
      ) : null}
      {diceSkillRoll ? (
        <Row className="mt-3">
          <Col>
            <label>
              Total: {diceSkillRoll.total} {diceSkillRoll.success ? "Success" : "Failure"}
            </label>
          </Col>
          <Col sm={12}>
            <DiceDisplay results={diceSkillRoll.results} />
          </Col>
        </Row>
      ) : null}
      {diceResistanceRoll ? (
        <Row className="mt-3">
          <Col>
            <label>Total: {diceResistanceRoll.resistanceTotal}</label>
          </Col>
          <Col sm={12}>
            <DiceDisplay results={diceResistanceRoll.results} />
          </Col>
        </Row>
      ) : null}
    </Fragment>
  );
};

export default DiceRoller;
