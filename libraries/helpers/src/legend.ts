import { DateTime } from "luxon";
import { v4 } from "uuid";
import { Legend } from "@affinity-rpg/models";

export const createLegend = (): Legend => {
  const invitation = generateInvitation();
  return {
    id: "",
    name: "",
    tagline: "",
    description: "",
    gameGuideUserId: "",
    heroIds: [],
    invitationCode: invitation.invitationCode,
    invitationCodeGeneratedDate: invitation.invitationCodeGeneratedDate,
  };
};

export const generateInvitation = () => {
  return {
    invitationCode: v4(),
    invitationCodeGeneratedDate: DateTime.now(),
  };
};
