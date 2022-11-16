export const formatText = (text: string) => {
  const temp = document.createElement("div");
  temp.innerHTML = text;
  return temp.textContent;
};
