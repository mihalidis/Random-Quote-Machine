export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  var brightness = (r * 299 + g * 587 + b * 114) / 1000;

  if (brightness < 128) {
    r = Math.floor(Math.random() * 128) + 128;
    g = Math.floor(Math.random() * 128) + 128;
    b = Math.floor(Math.random() * 128) + 128;
  }

  return `rgb(${r},${g},${b})`;
}