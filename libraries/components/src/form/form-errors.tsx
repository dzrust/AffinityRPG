import { FC, Fragment, useMemo } from "react";
import { FormikErrors } from "formik";
import { Alert } from "react-bootstrap";

type Props = {
  errors?: FormikErrors<any>;
};

const FormErrors: FC<Props> = ({ errors }) => {
  if (!errors) return null;
  const errorMessages = useMemo(() => {
    const errorMessages: string[] = [];
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        errorMessages.push(JSON.stringify(errors[key]));
      }
    });
    return errorMessages;
  }, [errors]);
  return (
    <Fragment>
      {errorMessages.map((errorMessage) => (
        <Alert key={errorMessage} variant="danger">
          {errorMessage}
        </Alert>
      ))}
    </Fragment>
  );
};

export default FormErrors;
