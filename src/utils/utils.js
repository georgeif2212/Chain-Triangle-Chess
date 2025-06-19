export function sortArray(value1, value2) {
  return [value1, value2].sort((a, b) => a - b);
}

export const availableColors = ["#EF4B4B", "#7BD3EA", "#A5DD9B", "#FFD966"];

export const formatMode = (mode) => {
  switch (mode) {
    case "conPreguntas":
      return "Con preguntas";
    case "sinPreguntas":
      return "Sin preguntas";
    default:
      return "Modo desconocido";
  }
};

export function darkenHexColor(hex, factor = 0.2) {
  const color = hex.replace("#", "");
  const r = Math.max(
    0,
    Math.floor(parseInt(color.substring(0, 2), 16) * (1 - factor))
  );
  const g = Math.max(
    0,
    Math.floor(parseInt(color.substring(2, 4), 16) * (1 - factor))
  );
  const b = Math.max(
    0,
    Math.floor(parseInt(color.substring(4, 6), 16) * (1 - factor))
  );
  return `rgb(${r}, ${g}, ${b})`;
}
