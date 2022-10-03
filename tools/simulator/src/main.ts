import { createTestNPC } from "@affinity-rpg/helpers";
import { AFFINITY_COMBINATIONS, runCombatRounds } from "./battle-simulator";
import { runGaugeifierSimulation } from "./gaugeifier";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <button id="runCombat">Run Combat</button>
    <button id="runGuage">Run Guage</button>
    <input id="level" label="Level for NPC" value="1" />
    <select id="affinitySelect">
      ${AFFINITY_COMBINATIONS.map((affinitySelection, index) => {
        return `<option value="${index}">Primary: ${affinitySelection.affinity} - Secondary ${affinitySelection.secondaryAffinity}</option>`;
      })}
    </select>
    <button id="generateNPC">Generate NPC</button>
    <div id="npcOutput"></div>
  </div>
`;

document.getElementById("runCombat")?.addEventListener("click", () => {
  // for (let i = 1; i <= 20; i++) {
  //   runCombatRounds(4, 4, i, i);
  // }
  const levelInput = document.getElementById("level") as HTMLInputElement;
  runCombatRounds(4, 4, parseInt(levelInput.value, 10), parseInt(levelInput.value, 10));
});

document.getElementById("runGuage")?.addEventListener("click", () => {
  const levelInput = document.getElementById("level") as HTMLInputElement;
  const affinitySelect = document.getElementById("affinitySelect") as HTMLSelectElement;
  const npcOutput = document.getElementById("npcOutput") as HTMLDivElement;
  if (
    ![
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ].includes(levelInput.value)
  ) {
    throw "Must be between 1 and 20";
  }
  if (affinitySelect.value === undefined) {
    throw "Must select a affinity";
  }
  runGaugeifierSimulation(parseInt(levelInput.value, 10), parseInt(affinitySelect.value, 10));
});

document.getElementById("generateNPC")?.addEventListener("click", () => {
  const levelInput = document.getElementById("level") as HTMLInputElement;
  const affinitySelect = document.getElementById("affinitySelect") as HTMLSelectElement;
  const npcOutput = document.getElementById("npcOutput") as HTMLDivElement;
  if (
    ![
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ].includes(levelInput.value)
  ) {
    throw "Must be between 1 and 20";
  }
  if (affinitySelect.value === undefined) {
    throw "Must select a affinity";
  }
  const affinitySelected = AFFINITY_COMBINATIONS[parseInt(affinitySelect.value, 10)];
  const npc = createTestNPC(
    affinitySelected.affinity,
    affinitySelected.secondaryAffinity,
  )(parseInt(levelInput.value, 10));
  npcOutput.innerHTML = JSON.stringify({
    health: npc.totalHealth,
    potency: npc.potency,
    vigor: npc.vigor,
    finesse: npc.finesse,
  });
});
