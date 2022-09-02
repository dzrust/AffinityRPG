import { Formik } from "formik";
import { FC, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AFFINITY } from "@affinity-rpg/models";
import { GENDER, Hero, HeroIntroFormModel, heroIntroFormModel, STAGES } from "@affinity-rpg/models";
import { ROUTES } from "@affinity-rpg/models";
import { FormControl, GenderRadioGroup, AffinityRadioGroup } from "@affinity-rpg/components";
import { HeroContext } from "@affinity-rpg/components";
import { useUpdateHeroMutation } from "@affinity-rpg/data/src/api/heroes";
import { useIsLoading } from "@affinity-rpg/hooks";
import { getBaseAffinityStatScore } from "@affinity-rpg/helpers";

const IntroStage: FC = () => {
  const { hero } = useContext(HeroContext);
  const isLoading = useIsLoading();
  const navigator = useNavigate();
  const [updateHero] = useUpdateHeroMutation();
  const { id } = useParams();
  const onSubmit = async (form: HeroIntroFormModel) => {
    if (!id) throw "failure";
    if (isLoading) return;
    const heroStats = getBaseAffinityStatScore({
      affinity: form.affinity,
      finesse: hero.finesse,
      vigor: hero.vigor,
      potency: hero.potency,
    } as Pick<Hero, "affinity">);
    updateHero({
      ...hero,
      name: form.name,
      race: form.race,
      gender: `${form.gender ?? ""}`.toUpperCase() as GENDER,
      baseMovement: form.baseMovement,
      affinity: `${form.affinity ?? ""}`.toUpperCase() as AFFINITY,
      potency: heroStats.potency ?? 1,
      finesse: heroStats.finesse ?? 1,
      vigor: heroStats.vigor ?? 1,
    })
      .unwrap()
      .then(() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.JOB}`));
  };

  return (
    <Formik
      initialValues={
        {
          name: hero.name,
          race: hero.race,
          gender: `${hero.gender}`.toUpperCase(),
          affinity: `${hero.affinity}`.toUpperCase(),
          baseMovement: hero.baseMovement ?? 25,
        } as HeroIntroFormModel
      }
      validationSchema={heroIntroFormModel}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form noValidate>
          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Name" name="name" />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Race" name="race" />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12}>
              <FormControl label="Base Movement" name="baseMovement" />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12}>
              <GenderRadioGroup label="Gender" />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12}>
              <AffinityRadioGroup label="Affinity Stat" />
            </Col>
          </Row>

          <div className="hero-builder__form-buttons-container">
            <Button variant="danger" onClick={() => navigator(`${ROUTES.HERO}/${id}`)} disabled={isSubmitting}>
              Exit Builder
            </Button>
            <Button onClick={() => handleSubmit()} disabled={isSubmitting}>
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default IntroStage;
