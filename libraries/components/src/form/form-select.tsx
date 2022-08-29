import { getSubObjectByKey } from "@affinity-rpg/data/helpers/object-access";
import { useFormikContext } from "formik";
import { FC } from "react";
import { Form, FormSelectProps, InputGroup } from "react-bootstrap";
import FormControlErrors from "./form-control-errors";

type Props = {
  label: string;
  name: string;
  options: any[];
  inputProps?: FormSelectProps;
  renderOption: (option: any) => JSX.Element;
};

const FormSelect: FC<Props> = ({ label, name, options, inputProps = {}, renderOption }) => {
  const { values, errors, touched, handleBlur, handleChange } = useFormikContext<any>();
  const error = getSubObjectByKey(name, errors);
  const touchedValue = getSubObjectByKey(name, touched);
  const value = getSubObjectByKey(name, values);
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup hasValidation>
        <Form.Select
          {...inputProps}
          name={name}
          value={`${value ?? ""}`}
          onChange={inputProps.onChange ? inputProps.onChange : handleChange}
          onBlur={inputProps.onBlur ? inputProps.onBlur : handleBlur}
          isInvalid={!!error && !!touchedValue}
        >
          {options.map(renderOption)}
        </Form.Select>
        <FormControlErrors name={name} />
      </InputGroup>
    </Form.Group>
  );
};

export default FormSelect;
