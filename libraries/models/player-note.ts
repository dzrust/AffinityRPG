import { VISIBILITY } from "./visibility";

export type PlayerNote = {
  id: string;
  userId: string;
  legendId: string;
  note: string;
  visibility: VISIBILITY;
};
