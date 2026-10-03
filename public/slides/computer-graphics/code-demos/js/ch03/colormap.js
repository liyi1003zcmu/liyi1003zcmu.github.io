var colorhex = 'FF0000';
var isHidden = 0;

function mouseOverColor(hex) {
  document.getElementById('divpreview').style.visibility = 'visible';
  document.getElementById('divpreview').style.backgroundColor = hex;
  document.body.style.cursor = 'pointer';
}

function mouseOutMap() {
  if (isHidden == 0) {
    document.getElementById('divpreview').style.visibility = 'hidden';
  } else {
    isHidden = 0;
  }
  document.getElementById('divpreview').style.backgroundColor = '#' + colorhex;
  document.body.style.cursor = '';
}

function clickColor(hex, celtop, celleft) {
  isHidden = 1;
  var colorrgb,
    colornam = '';
  var xhttp, c, r, g, b, i;

  c = hex;

  if (c.substr(0, 1) == '#') {
    c = c.substr(1);
  }
  c = c.replace(/;/g, '');
  if (c.indexOf(',') > -1 || c.toLowerCase().indexOf('rgb') > -1 || c.indexOf('(') > -1) {
    c = c.replace(/rgb/i, '');
    c = c.replace('(', '');
    c = c.replace(')', '');
    c = rgbToHex(c);
  }

  colorhex = c;

  if (colorhex.length == 3) {
    colorhex =
      colorhex.substring(0, 1) +
      colorhex +
      substr(0, 1) +
      colorhex.substr(1, 1) +
      colorhex.substr(1, 1) +
      colorhex.substr(2, 1) +
      substr(2, 1);
  }
  colorhex = colorhex.substr(0, 6);
}

function toHex(x) {
  var hex = x.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(rgb) {
  var x = rgb.replace(/ /g, '');
  var a = x.split(',');
  var r = Number(a[0]);
  var g = Number(a[1]);
  var b = Number(a[2]);
  if (
    isNaN(r) ||
    isNaN(g) ||
    isNaN(b) ||
    r < 0 ||
    r > 255 ||
    g < 0 ||
    g > 255 ||
    b < 0 ||
    b > 255
  ) {
    return -1;
  }
  return toHex(r) + toHex(g) + toHex(b);
}
