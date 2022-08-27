import { FC, Fragment, useState } from "react";
import { useFormikContext } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ItemFormModel } from "@affinity-rpg/models/item";
import AffinityStatsEditor from "../affinity/affinity-stat-editor";
import FormControl from "../form/form-control";
import FormSelect from "../form/form-select";
import ConfirmationModal from "../confirmation-modal";
import ElementSelect from "../form/element-select";
import RatingSelect from "../form/rating-select";

type Props = {
  close: () => void;
  onDelete: () => void;
};

const ItemEditorForm: FC<Props> = ({ close, onDelete }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormikContext<ItemFormModel>();
  const [isDeleting, setIsDeleting] = useState(() => false);
  return (
    <Fragment>
      <Row>
        <Col md={4} sm={12}>
          <h1>Item Editor</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm={12} md={4}>
          <FormControl label="Name" name="name" />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={4}>
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
        <Col sm={12} md={4}>
          <RatingSelect />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={4}>
          <ElementSelect />
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
        text="Are you sure you wish to delete this item?"
        isOpen={isDeleting}
        onNo={() => setIsDeleting(false)}
        onYes={onDelete}
      />
    </Fragment>
  );
};

export default ItemEditorForm;
