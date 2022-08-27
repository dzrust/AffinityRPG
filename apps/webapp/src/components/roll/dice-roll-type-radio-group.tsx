import { useFormikContext } from "formik";
import { FC } from "react";
import { Form, FormCheckProps } from "react-bootstrap";
import { ROLL_TYPES } from "@affinity-rpg/models/roll";
import FormControlErrors from "../form/form-control-errors";

type Props = {
  label: string;
  name: string;
  inputProps?: FormCheckProps;
};

const DiceRollTypeRadioGroup: FC<Props> = ({ label, name, inputProps = {} }) => {
  const { values, errors, touched, handleBlur, handleChange } = useFormikContext<any>();
  const numberValue = parseInt(values[name] ?? "0", 10);
  return (
    <Form.Group className="mt-3">
      <div>
        <Form.Label>{label}</Form.Label>
      </div>
      <Form.Check
        isInvalid={!!touched[name] && !!errors[name]}
        type="radio"
        inline
        label="D6 Roll"
        name={name}
        value={ROLL_TYPES.ROLL}
        checked={numberValue === ROLL_TYPES.ROLL}
        {...inputProps}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Form.Check
        isInvalid={!!touched[name] && !!errors[name]}
        type="radio"
        inline
        label="Resistance Roll"
        name={name}
        value={ROLL_TYPES.RESISTANCE_ROLL}
        checked={numberValue === ROLL_TYPES.RESISTANCE_ROLL}
        {...inputProps}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Form.Check
        isInvalid={!!touched[name] && !!errors[name]}
        type="radio"
        inline
        label="Skill Roll"
        name={name}
        value={ROLL_TYPES.SKILL_ROLL}
        checked={numberValue === ROLL_TYPES.SKILL_ROLL}
        {...inputProps}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <FormControlErrors name={name} />
    </Form.Group>
  );
};

export default DiceRollTypeRadioGroup;
