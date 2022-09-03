import { runCombatRounds } from "./battle-simulator";
import { runGaugeifierSimulation } from "./gaugeifier";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <button id="runCombat">Run Combat</button>
    <button id="runGuage">Run Guage</button>
  </div>
`;

document.getElementById("runCombat")?.addEventListener("click", () => {
  // for (let i = 1; i <= 20; i++) {
  //   runCombatRounds(4, 4, i, i);
  // }
  runCombatRounds(4, 4, 20, 20);
});

document.getElementById("runGuage")?.addEventListener("click", () => runGaugeifierSimulation());
