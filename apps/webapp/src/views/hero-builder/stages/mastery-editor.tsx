import { Formik } from "formik";
import { FC, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteMasteryMutation, useUpdateMasteryMutation } from "../../../api/masteries";
import MasteryEditorForm from "../../../components/mastery/mastery-editor-form";
import { MasteryContext } from "../../../components/mastery/mastery-hoc";
import { useIsLoading } from "../../../hooks";
import { STAGES } from "@affinity-rpg/models/hero";
import { masteryFormModel, MasteryFormModel } from "@affinity-rpg/models/mastery";
import { ROUTES } from "@affinity-rpg/models/routes";

const MasteryEditor: FC = () => {
  const { mastery } = useContext(MasteryContext);
  const isLoading = useIsLoading();
  const navigator = useNavigate();
  const { id, masteryId } = useParams();
  const [updateMastery] = useUpdateMasteryMutation();
  const [deleteMastery] = useDeleteMasteryMutation();

  const close = () => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.MASTERY}`);

  const onSubmit = async (form: MasteryFormModel) => {
    if (!id || !masteryId) throw "failure";
    if (isLoading) return;
    updateMastery({
      heroId: id,
      mastery: {
        ...mastery,
        permanentEffect: form.permanentEffect ?? "",
        tempEffect: form.tempEffect ?? "",
        description: form.description ?? "",
      },
    })
      .unwrap()
      .then(close);
  };

  const onDelete = async () => {
    if (!id || !masteryId) throw "failure";
    if (isLoading) return;
    deleteMastery({ heroId: id, masteryId }).unwrap().then(close);
  };

  return (
    <Formik
      initialValues={
        {
          name: mastery.name,
          classification: `${mastery.classification}`.toUpperCase(),
          type: `${mastery.type}`.toUpperCase(),
          aoe: mastery.aoe,
          cooldown: mastery.cooldown,
          armor: mastery.armor,
          damage: mastery.damage,
          heal: mastery.heal,
          distance: mastery.distance,
          duration: mastery.duration,
          element: `${mastery.element}`.toUpperCase(),
          statusEffect: `${mastery.statusEffect}`.toUpperCase(),
          affinityStats: mastery.affinityStats.map((stat) => ({
            affinity: `${stat.affinity}`.toUpperCase(),
            stat: stat.stat,
          })),
          permanentEffect: mastery.permanentEffect,
          tempEffect: mastery.tempEffect,
          reduceCooldown: mastery.reduceCooldown,
          description: mastery.description,
        } as MasteryFormModel
      }
      validationSchema={masteryFormModel}
      onSubmit={onSubmit}
    >
      {(formik) => <MasteryEditorForm formik={formik} onDelete={onDelete} close={close} />}
    </Formik>
  );
};

export default MasteryEditor;
