export const formatText = (text: string): string => {
  const temp = document.createElement("div");
  temp.innerHTML = text;
  return temp.textContent!;
};
