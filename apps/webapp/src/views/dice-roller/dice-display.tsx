import {
  faDiceFive,
  faDiceFour,
  faDiceOne,
  faDiceSix,
  faDiceThree,
  faDiceTwo,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { DiceFaceType } from "@affinity-rpg/models/roll";

type Props = {
  results: DiceFaceType[];
};

const getIconFromRoll = (roll: number) => {
  switch (roll) {
    case 1:
      return faDiceOne;
    case 2:
      return faDiceTwo;
    case 3:
      return faDiceThree;
    case 4:
      return faDiceFour;
    case 5:
      return faDiceFive;
    case 6:
      return faDiceSix;
  }
  return faDiceOne;
};

const DiceDisplay: FC<Props> = ({ results }) => {
  return (
    <Row className="mt-3">
      {results.map((dice, index) => (
        <Col xs={2}>
          <FontAwesomeIcon
            key={`dice-roll-${index}`}
            size="3x"
            className="text-primary"
            fixedWidth
            icon={getIconFromRoll(dice)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default DiceDisplay;
