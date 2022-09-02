import { useFormikContext } from "formik";
import { FC, Fragment, useMemo, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { ArmorFormModel, ARMOR_CLASSIFICATIONS } from "@affinity-rpg/models";
import {
  armorFromFormModel,
  getDefaultArmorPointsFromRating,
  getDefaultArmorDefense,
  getArmorPoints,
  getDefaultArmorMovement,
  getArmorClassificationText,
} from "@affinity-rpg/helpers";
import { ConfirmationModal } from "../confirmation-modal";
import { FormControl } from "../form/form-control";
import { FormSelect } from "../form/form-select";
import { AffinityStatsEditor } from "../affinity/affinity-stat-editor";
import { ClassificationSelect } from "../form/classification-select";
import { ElementSelect } from "../form/element-select";
import { RatingSelect } from "../form/rating-select";

type Props = {
  close: () => void;
  onDelete: () => void;
};

export const ArmorEditorForm: FC<Props> = ({ close, onDelete }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormikContext<ArmorFormModel>();
  const [isDeleting, setIsDeleting] = useState(() => false);
  const armorDefaults = useMemo(() => {
    const armor = armorFromFormModel(values);
    return {
      points: getDefaultArmorPointsFromRating(armor.rating),
      defense: getDefaultArmorDefense(armor),
      movement: getDefaultArmorMovement(armor),
    };
  }, [values]);
  const armorPoints = useMemo(() => {
    const armor = armorFromFormModel(values);
    return getArmorPoints(armor);
  }, [values]);
  return (
    <Fragment>
      <Row>
        <Col md={4} sm={12}>
          <h1>Armor Editor</h1>
        </Col>
        <Col>
          <h3>
            Points: {armorPoints} / {armorDefaults.points}
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
            classifications={ARMOR_CLASSIFICATIONS}
            getClassificationText={getArmorClassificationText}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <FormControl
            label="Armor Modifier"
            name="armor.modifier"
            inputProps={{ type: "number" }}
            appendedElement={<InputGroup.Text id="basic-addon2">+ {armorDefaults.defense}</InputGroup.Text>}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <FormControl
            label="Movement"
            name="movement"
            inputProps={{ type: "number" }}
            appendedElement={
              <InputGroup.Text id="basic-addon2">
                {armorDefaults.movement > -1 ? "+" : "-"} {Math.abs(armorDefaults.movement)}
              </InputGroup.Text>
            }
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
          <ElementSelect />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12}>
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
        text="Are you sure you wish to delete this armor?"
        isOpen={isDeleting}
        onNo={() => setIsDeleting(false)}
        onYes={onDelete}
      />
    </Fragment>
  );
};
