import { useFormikContext } from "formik";
import { FC } from "react";
import { Form, FormCheckProps } from "react-bootstrap";
import { GENDER } from "../../models/hero";
import FormControlErrors from "./form-control-errors";

type Props = {
  label: string;
  inputProps?: FormCheckProps;
};

const GenderRadioGroup: FC<Props> = ({ label, inputProps = {} }) => {
  const { values, errors, touched, handleBlur, handleChange } = useFormikContext<{ gender: GENDER }>();
  return (
    <Form.Group className="mt-3">
      <div>
        <Form.Label>{label}</Form.Label>
      </div>
      <Form.Check
        isInvalid={!!errors.gender && !!touched.gender}
        type="radio"
        inline
        label="Male"
        name="gender"
        value={GENDER.MALE}
        checked={values.gender === GENDER.MALE}
        {...inputProps}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Form.Check
        isInvalid={!!errors.gender && !!touched.gender}
        type="radio"
        inline
        label="Female"
        name="gender"
        value={GENDER.FEMALE}
        checked={values.gender === GENDER.FEMALE}
        {...inputProps}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <FormControlErrors name="gender" />
    </Form.Group>
  );
};

export default GenderRadioGroup;
