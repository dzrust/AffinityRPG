import { Formik } from "formik";
import { FC, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateHeroMutation } from "../../../api/heroes";
import { useCreateMasteryMutation } from "../../../api/masteries";
import FormControl from "../../../components/form/form-control";
import { HeroContext } from "../../../components/hero/hero-hoc";
import MasteryViewer from "../../../components/mastery/mastery-viewer";
import { createMastery } from "../../../helpers/mastery";
import { rollD6 } from "../../../helpers/roll";
import { useIsLoading } from "../../../hooks";
import { heroMasteryFormModel, HeroMasteryFormModel, STAGES } from "../../../models/hero";
import { Mastery } from "../../../models/mastery";
import { ROUTES } from "../../../models/routes";

const MasteriesStage: FC = () => {
  const { hero, masteries } = useContext(HeroContext);
  const isLoading = useIsLoading();
  const navigator = useNavigate();
  const { id } = useParams();
  const [updateHero] = useUpdateHeroMutation();
  const [createMasteryAPI] = useCreateMasteryMutation();
  const onSelectMastery = (mastery: Mastery) => {
    navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.MASTERY}/${mastery.id}`);
  };
  const onSubmit = async (form: HeroMasteryFormModel) => {
    if (!id) throw "failure";
    updateHero({
      ...hero,
      totalHealth: form.hp,
      currentHealth: form.currentHp,
      potency: form.potency,
      finesse: form.finesse,
      vigor: form.vigor,
    })
      .unwrap()
      .then(() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.INVENTORY}`));
  };
  const onAddMastery = async () => {
    if (!id) throw "failure";
    createMasteryAPI({
      mastery: createMastery(),
      heroId: id,
    });
  };
  const rollVigor = (
    vigor: number,
    totalHP: number,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
  ) => {
    let hp = rollD6(vigor).total;
    setFieldValue("hp", totalHP + hp, true);
  };
  return (
    <Formik
      initialValues={
        {
          hp: hero.totalHealth,
          currentHp: hero.currentHealth,
          potency: hero.potency,
          finesse: hero.finesse,
          vigor: hero.vigor,
        } as HeroMasteryFormModel
      }
      validationSchema={heroMasteryFormModel}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
        <Form noValidate>
          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Potency" name="potency" inputProps={{ type: "number" }} />
            </Col>
          </Row>

          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Finesse" name="finesse" inputProps={{ type: "number" }} />
            </Col>
          </Row>

          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Vigor" name="vigor" inputProps={{ type: "number" }} />
            </Col>
          </Row>

          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Total Health" name="hp" inputProps={{ type: "number" }} />
            </Col>
            <Col md={4} sm={12} className="d-flex align-items-end">
              <Button
                onClick={() => rollVigor(values.vigor ?? 1, values.hp ?? 5, setFieldValue)}
                disabled={isSubmitting || isLoading}
              >
                Add Vigor Roll
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Current Health" name="currentHp" inputProps={{ type: "number" }} />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col sm={12} md={4}>
              <h3>Masteries</h3>
            </Col>
            <Col>
              <Button onClick={onAddMastery} disabled={isSubmitting || isLoading}>
                Add Mastery
              </Button>
            </Col>
          </Row>
          <hr />

          <Row className="mt-3">
            {masteries.map((mastery) =>
              mastery ? (
                <Col key={mastery.id} xs={12} md={4} className="mt-3">
                  <MasteryViewer mastery={mastery} onSelectMastery={() => onSelectMastery(mastery)} />
                </Col>
              ) : null,
            )}
          </Row>

          <div className="hero-builder__form-buttons-container">
            <Button variant="danger" onClick={() => navigator(`${ROUTES.HERO}/${id}`)} disabled={isSubmitting}>
              Exit Builder
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.JOB}`)}
              disabled={isSubmitting || isLoading}
            >
              Back
            </Button>
            <Button onClick={() => handleSubmit()} disabled={isSubmitting || isLoading}>
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MasteriesStage;
