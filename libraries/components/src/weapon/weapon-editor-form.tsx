import { useFormikContext } from "formik";
import { FC, Fragment, useMemo, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { WeaponFormModel, WEAPON_CLASSIFICATIONS } from "@affinity-rpg/models/weapon";
import AffinityStatsEditor from "../affinity/affinity-stat-editor";
import FormControl from "../form/form-control";
import FormSelect from "../form/form-select";
import ConfirmationModal from "../confirmation-modal";
import StatusEffectSelect from "../form/status-effect-select";
import RatingSelect from "../form/rating-select";
import ElementSelect from "../form/element-select";
import ClassificationSelect from "../form/classification-select";
import {
  getDefaultWeaponDamage,
  getDefaultWeaponPointsFromRating,
  getWeaponPoints,
  weaponFromFormModel,
} from "@affinity-rpg/data/helpers/weapon";
import { getWeaponClassificationText } from "@affinity-rpg/data/helpers/text-helpers";

type Props = {
  close: () => void;
  onDelete: () => void;
};

const WeaponEditorForm: FC<Props> = ({ close, onDelete }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormikContext<WeaponFormModel>();
  const [isDeleting, setIsDeleting] = useState(() => false);
  const weaponDefaults = useMemo(() => {
    const weapon = weaponFromFormModel(values);
    return {
      points: getDefaultWeaponPointsFromRating(weapon),
      damage: getDefaultWeaponDamage(weapon),
    };
  }, [values]);
  const weaponPoints = useMemo(() => {
    const weapon = weaponFromFormModel(values);
    return getWeaponPoints(weapon);
  }, [values]);
  return (
    <Fragment>
      <Row>
        <Col md={4} sm={12}>
          <h1>Weapon Editor</h1>
        </Col>
        <Col>
          <h3>
            Points: {weaponPoints} / {weaponDefaults.points}
          </h3>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={4} sm={12}>
          <FormControl label="Name" name="name" />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <Form.Check
            type="switch"
            label="Equipped"
            className="my-2"
            checked={values.equipped}
            name="equipped"
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.equipped && !!touched.equipped}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <RatingSelect />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <ClassificationSelect
            label="Classification"
            classifications={WEAPON_CLASSIFICATIONS}
            getClassificationText={getWeaponClassificationText}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <FormControl
            label="Damage D6"
            name="damage.diceCount"
            inputProps={{ type: "number" }}
            appendedElement={<InputGroup.Text id="basic-addon2">+ {weaponDefaults.damage}</InputGroup.Text>}
          />
        </Col>
      </Row>

      <Row>
        <Col md={4} sm={12}>
          <FormControl label="Range" name="range" inputProps={{ type: "number" }} />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <ElementSelect />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <StatusEffectSelect />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={4}>
          <FormSelect
            label="Weapon Slot Used"
            name={`weaponSlotsUsed`}
            options={[
              {
                label: "One Handed",
                value: 1,
              },
              {
                label: "Two Handed",
                value: 2,
              },
              {
                label: "No Hands",
                value: 0,
              },
            ]}
            renderOption={(option: { label: string; value: number }) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )}
          />
        </Col>
      </Row>

      <AffinityStatsEditor />

      <Row>
        <Col md={4} sm={12}>
          <FormControl label="Permanent Effect" name="permanentEffect" inputProps={{ rows: 3, as: "textarea" }} />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <FormControl label="Description" name="description" inputProps={{ rows: 3, as: "textarea" }} />
        </Col>
      </Row>

      <div className="hero-builder__form-buttons-container mb-3">
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="danger" onClick={() => setIsDeleting(true)}>
          Delete
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()} disabled={isSubmitting}>
          Submit
        </Button>
      </div>
      <ConfirmationModal
        title="Confirm"
        text="Are you sure you wish to delete this weapon?"
        isOpen={isDeleting}
        onNo={() => setIsDeleting(false)}
        onYes={onDelete}
      />
    </Fragment>
  );
};

export default WeaponEditorForm;
