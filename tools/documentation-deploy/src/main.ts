import { deployDocumentation } from "./deploy-documentation";

deployDocumentation();
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div>
<button id="deployDocs">Deploy Documentation</button>
</div>
`;

document.getElementById("deployDocs")?.addEventListener("click", deployDocumentation);
