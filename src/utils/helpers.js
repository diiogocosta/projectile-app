export default class Helpers {
  static getRandomBetween(valueA, valueB) {
    return Math.floor(Math.random() * (valueB - valueA) + valueA);
  }

  static getRandomColor() {
    const red = 255 * Math.random(),
      green = 255 * Math.random(),
      blue = 255 * Math.random();
    return "rgb(" + red + "," + green + "," + blue + ")";
  }
}
