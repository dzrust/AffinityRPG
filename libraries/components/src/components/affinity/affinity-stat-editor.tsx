import { FieldArray, useFormikContext } from "formik";
import { ChangeEvent, FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { AFFINITIES, AffinityStatFormModel } from "@affinity-rpg/models/affinity";
import FormControl from "../form/form-control";

const AffinityStatsEditor: FC = () => {
  const { values, handleChange } = useFormikContext<any>();
  return (
    <FieldArray name="affinityStats">
      {({ remove, push }) => (
        <Fragment>
          {AFFINITIES.map((affinity) => {
            const affinityIndex: number = values.affinityStats.findIndex(
              (affinityStat: AffinityStatFormModel) => affinityStat.affinity === affinity,
            );
            return (
              <Row key={affinity}>
                <Col md={4} sm={12}>
                  <FormControl
                    label={affinity}
                    name={`affinityStats.${affinityIndex}.stat`}
                    inputProps={{
                      type: "number",
                      value: `${
                        affinityIndex > -1 && !!values.affinityStats[affinityIndex]
                          ? values.affinityStats[affinityIndex].stat
                          : 0
                      }`,
                      onChange: (e: ChangeEvent<any>) => {
                        const newValue = parseInt(e.target.value, 10);
                        if (newValue <= 0 && affinityIndex > -1) {
                          remove(affinityIndex);
                        } else if (newValue > 0 && affinityIndex === -1) {
                          push({
                            affinity,
                            stat: newValue,
                          });
                        } else if (newValue > 0 && affinityIndex > -1) {
                          handleChange(`affinityStats.${affinityIndex}.stat`)(e);
                        }
                      },
                    }}
                  />
                </Col>
              </Row>
            );
          })}
        </Fragment>
      )}
    </FieldArray>
  );
};

export default AffinityStatsEditor;
