import { DocumentReference } from "firebase/firestore";
import { DateTime } from "luxon";

export type Legend = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  gameGuideUserId: string;
  heroIds: DocumentReference[];
  invitationCode: string;
  invitationCodeGeneratedDate: DateTime;
};
