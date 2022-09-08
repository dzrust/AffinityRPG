export const helloWorld = () => console.log("Hello World");
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div>
<button id="deployDocs">Deploy Documentation</button>
</div>
`;

//document.getElementById("deployDocs")?.addEventListener("click", deployDocumentation);
