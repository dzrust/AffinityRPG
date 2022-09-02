import { FormikProps } from "formik";
import { FC, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Mastery, MasteryFormModel, MASTERY_CLASSIFICATIONS, MASTERY_TYPE, MASTERY_TYPES } from "@affinity-rpg/models";
import { getMasteryCost, getMasteryClassificationText } from "@affinity-rpg/helpers";
import { FormControl } from "../form/form-control";
import { AffinityStatsEditor } from "../affinity/affinity-stat-editor";
import { ConfirmationModal } from "../confirmation-modal";
import { ClassificationSelect } from "../form/classification-select";
import { ElementSelect } from "../form/element-select";
import StatusEffectSelect from "../form/status-effect-select";
import { FormSelect } from "../form/form-select";

type Props = {
  formik: FormikProps<MasteryFormModel>;
  close: () => void;
  onDelete: () => void;
};

export const MasteryEditorForm: FC<Props> = ({ close, onDelete, formik }) => {
  const [isDeleting, setIsDeleting] = useState(() => false);
  const { values, handleSubmit, isSubmitting } = formik;
  return (
    <Form noValidate>
      <h3>Mastery Editor</h3>
      <div>Cost: {getMasteryCost({ ...values, id: "", currentCooldown: 0 } as Mastery)}</div>
      <FormControl label="Name" name="name" />
      <ClassificationSelect
        label="Classification"
        classifications={MASTERY_CLASSIFICATIONS}
        getClassificationText={getMasteryClassificationText}
      />
      <FormSelect
        label="Mastery Type"
        name="type"
        options={MASTERY_TYPES}
        renderOption={(option: MASTERY_TYPE) => (
          <option key={option} value={option}>
            {option}
          </option>
        )}
      />
      <FormControl label="Damage D6" name="damage.diceCount" inputProps={{ type: "number" }} />
      <FormControl label="Armor Modifier" name="armor.modifier" inputProps={{ type: "number" }} />
      <FormControl label="Heal D6" name="heal.diceCount" inputProps={{ type: "number" }} />

      <FormControl label="Reduce Cooldown" name="reduceCooldown" inputProps={{ type: "number" }} />

      <Row>
        <Col md={4} sm={12}>
          <FormControl label="Cooldown" name="cooldown" inputProps={{ type: "number" }} />
        </Col>
        <Col md={4} sm={12}>
          <FormControl label="Duration" name="duration" inputProps={{ type: "number" }} />
        </Col>
        <Col md={4} sm={12}>
          <FormControl label="Distance" name="distance" inputProps={{ type: "number" }} />
        </Col>
      </Row>

      <Row>
        <Col md={4} sm={12}>
          <FormControl label="Area of Effect" name="aoe" inputProps={{ type: "number" }} />
        </Col>
        <Col md={4} sm={12}>
          <ElementSelect />
        </Col>
        <Col md={4} sm={12}>
          <StatusEffectSelect />
        </Col>
      </Row>

      <AffinityStatsEditor />

      <Row>
        <Col md={4} sm={12}>
          <FormControl label="Temp Effect" name="tempEffect" inputProps={{ rows: 3, as: "textarea" }} />
        </Col>
        <Col md={4} sm={12}>
          <FormControl label="Permanent Effect" name="permanentEffect" inputProps={{ rows: 3, as: "textarea" }} />
        </Col>
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
        text="Are you sure you wish to delete this mastery?"
        isOpen={isDeleting}
        onNo={() => setIsDeleting(false)}
        onYes={onDelete}
      />
    </Form>
  );
};
