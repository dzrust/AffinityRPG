import { FieldArray } from "formik";
import { ChangeEvent, FC, Fragment, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import FormControl from "../form/form-control";

type Props = {
  controlLabel: string;
  tableHeader: string;
  name: string;
  arrayName: string;
  values: string[];
};

const MultiStringFormControl: FC<Props> = ({ controlLabel, tableHeader, name, arrayName, values }) => {
  const [tempValue, setTempValue] = useState(() => "");
  return (
    <FieldArray name={arrayName}>
      {({ remove, push }) => (
        <Fragment>
          <Row>
            <Col sm={12} md={4}>
              <FormControl
                label={controlLabel}
                name={name}
                inputProps={{
                  onBlur: () => {},
                  onChange: (e: ChangeEvent<any>) => setTempValue(e.target.value ?? ""),
                  value: tempValue,
                }}
              />
            </Col>
            <Col className="multi-select__form-control--button">
              <Button
                onClick={() => {
                  push(tempValue);
                  setTempValue("");
                }}
              >
                Add
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Table>
                <thead>
                  <tr>
                    <td>{tableHeader}</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {values.map((value, index) => (
                    <tr key={`${value}-${index}`}>
                      <td>{value}</td>
                      <td>
                        <Button onClick={() => remove(index)}>Remove</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Fragment>
      )}
    </FieldArray>
  );
};

export default MultiStringFormControl;
