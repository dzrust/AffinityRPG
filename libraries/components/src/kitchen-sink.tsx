import { faSword } from "@fortawesome/pro-regular-svg-icons";
import { Formik } from "formik";
import { FC, Fragment, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { AFFINITY } from "@affinity-rpg/models/affinity";
import { GENDER } from "@affinity-rpg/models/hero";
import { ROLL_TYPES } from "@affinity-rpg/models/roll";
import AffinityRadioGroup from "./affinity/affinity-radio-group";
import AffinityStatsEditor from "./affinity/affinity-stat-editor";
import ArmorViewer from "./armor/armor-viewer";
import GenderRadioGroup from "./form/gender-radio-group";
import MultiStringFormControl from "./form/multi-string-form-control";
import ItemViewer from "./item/item-viewer";
import Loader from "./loader";
import DiceRollTypeRadioGroup from "./roll/dice-roll-type-radio-group";
import StepperSVG from "./stepper-svg";
import WeaponViewer from "./weapon/weapon-viewer";

const KitchenSink: FC = () => {
  const [isInvalid, setIsInvalid] = useState(() => false);
  return (
    <Container className="pb-3">
      <h1>Kitchen Sink</h1>
      <Formik
        initialValues={{
          affinity: AFFINITY.POTENCY,
          affinityStats: [],
          diceRollType: ROLL_TYPES.ROLL,
          gender: GENDER.MALE,
          multiStringArr: [],
        }}
        onSubmit={(value) => console.log(value)}
      >
        {({ values }) => (
          <Fragment>
            <Button onClick={() => setIsInvalid(!isInvalid)}>Toggle Invalid: {isInvalid}</Button>
            <div className="mt-4">
              <Emblem />
            </div>
            <div className="mt-4">
              <Emblem innerIcon={faSword} />
            </div>
            <div className="mt-4">
              <AffinityRadioGroup label="Affinity" />
            </div>
            <div className="mt-4">
              <AffinityStatsEditor />
            </div>
            <div className="mt-4">
              <ArmorViewer item={createArmor()} />
            </div>
            <div className="mt-4">
              <DiceRollTypeRadioGroup label="Dice Roll Type Group" name="diceRollType" />
            </div>
            <div>
              <GenderRadioGroup label="Gender" />
            </div>
            <div className="mt-4">
              <ItemViewer item={createItem()} />
            </div>
            <div className="mt-4">
              <Loader />
            </div>
            <div className="mt-4">
              <MultiStringFormControl
                controlLabel="Thang"
                tableHeader="My Thang"
                name="foo"
                arrayName="multiStringArr"
                values={values.multiStringArr}
              />
            </div>
            <div className="mt-4">
              <StepperSVG onStepClick={() => {}} numberOfSteps={4} activeStep={2} completeSteps={[1, 3]} />
            </div>
            <div className="mt-4">
              <WeaponViewer item={createWeapon()} />
            </div>
          </Fragment>
        )}
      </Formik>
    </Container>
  );
};

export default KitchenSink;
