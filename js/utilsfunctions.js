function magnitude(x,y) {
	return Math.sqrt(x * x + y * y);
}

function distanceBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function fastDistance(x1, y1, x2, y2) {
  var dx = Math.abs(x1 - x2);
  var dy = Math.abs(y1 - y2);
  return 0.4 * (dx + dy) + 0.56 * Math.max(dx, dy);
}

function RotateVector2d(x, y, radians) {
  return {
      x: x * Math.cos(radians) - y * Math.sin(radians),
      y: x * Math.sin(radians) + y * Math.cos(radians)
  };
}

function getRandomElementFromArray(array, random) {
  return array[Math.floor(random * array.length)];
}

function format2Places(input) {
  return formatNumber(input, 2);
}

function formatWhole(input) {
  if (input > 1000) {
    return formatNumber(input, 2);
  }
  return formatNumber(input, 0);
}

function formatNumber(input, decimals) {
  if (!input) input = 0;
  if (input >= 1000000000000)
  return (input / 1000000000000).toFixed(decimals) + 'T';
  if (input >= 1000000000)
  return (input / 1000000000).toFixed(decimals) + 'B';
  if (input >= 1000000)
  return (input / 1000000).toFixed(decimals) + 'M';
  if (input >= 1000)
  return (input / 1000).toFixed(decimals) + 'K';

  return input.toFixed(decimals);
}