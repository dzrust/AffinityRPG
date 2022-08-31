// import {
//   Armor,
//   ARMOR_CLASSIFICATIONS,
//   getDefaultArmorDefense,
//   getDefaultArmorMovement,
//   getDefaultArmorPointsFromRating,
// } from "../apps/webapp/src/models/armor";
// import { ELEMENT } from "../apps/webapp/src/models/element";
// import { RATINGS } from "../apps/webapp/src/models/rating";

// console.log("| Rating    | Type   | Armor | Item Points | Element  | Movement |");
// console.log("| --------- | ------ | ----- | ----------- | -------- | -------- |");

// RATINGS.forEach((rating) => {
//   ARMOR_CLASSIFICATIONS.forEach((classification) => {
//     const armor: Armor = {
//       rating,
//       classification,
//     } as Armor;
//     const armorMovement = getDefaultArmorMovement(armor);
//     console.log(
//       `| ${rating} | ${classification} | ${getDefaultArmorDefense(armor)} | ${getDefaultArmorPointsFromRating(
//         rating,
//       )} | ${ELEMENT.PHYSICAL} | ${armorMovement > 0 ? `+${armorMovement}` : armorMovement}DU |`,
//     );
//   });
// });
