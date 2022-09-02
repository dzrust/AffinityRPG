import { getSubObjectByKey } from "@affinity-rpg/helpers";
import { useFormikContext } from "formik";
import { FC, HTMLProps } from "react";
import { Form, FormControlProps, InputGroup } from "react-bootstrap";
import { FormControlErrors } from "./form-control-errors";

type Props = {
  label: string;
  name: string;
  inputProps?: FormControlProps & HTMLProps<HTMLTextAreaElement> & HTMLProps<HTMLInputElement>;
  appendedElement?: JSX.Element;
};

export const FormControl: FC<Props> = ({ label, name, inputProps = {}, appendedElement }) => {
  const { values, errors, touched, handleBlur, handleChange } = useFormikContext<any>();
  const error = getSubObjectByKey(name, errors);
  const touchedValue = getSubObjectByKey(name, touched);
  const value = getSubObjectByKey(name, values);
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          {...inputProps}
          name={name}
          value={`${(inputProps.value ? inputProps.value : value) ?? ""}`}
          onChange={inputProps.onChange ? inputProps.onChange : handleChange}
          onBlur={inputProps.onBlur ? inputProps.onBlur : handleBlur}
          isInvalid={!!error && !!touchedValue}
        />
        {appendedElement}
        <FormControlErrors name={name} />
      </InputGroup>
    </Form.Group>
  );
};
