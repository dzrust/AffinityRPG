import { useFormikContext } from "formik";
import { FC, useMemo } from "react";
import { Form } from "react-bootstrap";
import { getSubObjectByKey } from "@affinity-rpg/helpers/object-access";

type Props = {
  name: string;
};

const FormControlErrors: FC<Props> = ({ name }) => {
  const { errors } = useFormikContext<any>();
  const error = useMemo(() => getSubObjectByKey(name, errors), [name, errors]);
  const arrayOfErrors: string[] = useMemo(() => {
    if (typeof error === "string") {
      return [error ?? ""];
    }
    return error ?? [];
  }, [error]);
  return (
    <Form.Control.Feedback type="invalid">
      {arrayOfErrors.map((err: string, index: number) => (
        <p key={`${err}-${index}`}>{err}</p>
      ))}
    </Form.Control.Feedback>
  );
};

export default FormControlErrors;
