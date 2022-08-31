export const downloadJSON = (jsonObject: any) => {
  const str = JSON.stringify(jsonObject);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8",
  });
  (window as any).browser.downloads.download({
    url: URL.createObjectURL(blob),
    filename: "character.json",
  });
};
