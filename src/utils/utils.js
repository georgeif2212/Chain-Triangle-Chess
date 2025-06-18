export const triangles = {
  "1,2,5": 0,
  "1,4,5": 0,
  "2,3,6": 0,
  "2,5,6": 0,
  "3,6,7": 0,
  "4,5,9": 0,
  "4,8,9": 0,
  "5,6,10": 0,
  "5,9,10": 0,
  "6,7,11": 0,
  "6,10,11": 0,
  "7,11,12": 0,
  "8,9,13": 0,
  "9,10,14": 0,
  "9,13,14": 0,
  "10,11,15": 0,
  "10,14,15": 0,
  "11,12,16": 0,
  "11,15,16": 0,
  "13,14,17": 0,
  "14,15,18": 0,
  "14,17,18": 0,
  "15,16,19": 0,
  "15,18,19": 0,
};

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
