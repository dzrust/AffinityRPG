import * as yup from "yup";

export enum AFFINITY {
  POTENCY = "POTENCY",
  FINESSE = "FINESSE",
  VIGOR = "VIGOR",
}

export type AffinityStat = {
  affinity: AFFINITY;
  stat: number;
};

export const AFFINITIES: AFFINITY[] = Object.keys(AFFINITY).map((key) => (AFFINITY as any)[key]);

export const affinityStatFormModel = yup.object().shape({
  affinity: yup.string().oneOf(AFFINITIES).required(),
  stat: yup.number().required(),
});

export interface AffinityStatFormModel extends yup.InferType<typeof affinityStatFormModel> {}
