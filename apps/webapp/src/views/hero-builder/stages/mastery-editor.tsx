import { Formik } from "formik";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { STAGES, masteryFormModel, MasteryFormModel, ROUTES } from "@affinity-rpg/models";
import { MasteryEditorForm } from "@affinity-rpg/components";
import { useUpdateMasteryMutation, useDeleteMasteryMutation } from "@affinity-rpg/data";
import { useIsLoading, useMastery } from "@affinity-rpg/hooks";

const MasteryEditor: FC = () => {
  const { mastery } = useMastery();
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
