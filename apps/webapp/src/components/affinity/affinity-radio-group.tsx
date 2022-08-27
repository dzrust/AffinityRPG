import { useFormikContext } from "formik";
import { FC } from "react";
import { Form, FormCheckProps } from "react-bootstrap";
import { AFFINITY } from "../../models/affinity";

type Props = {
  label: string;
  inputProps?: FormCheckProps;
};

const AffinityRadioGroup: FC<Props> = ({ label, inputProps = {} }) => {
  const { values, errors, touched, handleBlur, handleChange } = useFormikContext<{ affinity: string }>();
  const isInvalid = !!errors.affinity && !!touched.affinity;
  const value = values.affinity.toUpperCase();
  const name = "affinity";
  return (
    <Form.Group className="mt-3">
      <div>
        <Form.Label>{label}</Form.Label>
      </div>
      <Form.Check
        isInvalid={isInvalid}
        type="radio"
        inline
        label="Potency"
        name={name}
        value={AFFINITY.POTENCY}
        checked={value === AFFINITY.POTENCY}
        {...inputProps}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Form.Check
        isInvalid={isInvalid}
        type="radio"
        inline
        label="Finesse"
        name={name}
        value={AFFINITY.FINESSE}
        checked={value === AFFINITY.FINESSE}
        {...inputProps}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Form.Check
        isInvalid={isInvalid}
        type="radio"
        inline
        label="Vigor"
        name={name}
        value={AFFINITY.VIGOR}
        checked={value === AFFINITY.VIGOR}
        {...inputProps}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Form.Control.Feedback type="invalid">{errors.affinity}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default AffinityRadioGroup;
