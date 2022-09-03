import { runCombatRounds } from "./battle-simulator";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <button id="runCombat">Run Combat</button>
  </div>
`;

document.getElementById("runCombat")?.addEventListener("click", () => {
  // for (let i = 1; i <= 20; i++) {
  //   runCombatRounds(4, 4, i, i);
  // }
  runCombatRounds(4, 4, 20, 20);
});
