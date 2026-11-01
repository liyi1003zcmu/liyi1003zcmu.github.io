'use strict';

const { vec2, vec3, vec4, mat3, mat4 } = glMatrix;

var canvas;
var gl;

var texSize = 256;

// Bump Data

var data = new Array();
for (var i = 0; i <= texSize; i++) data[i] = new Array();
for (var i = 0; i <= texSize; i++) for (var j = 0; j <= texSize; j++) data[i][j] = 0.0;
for (var i = texSize / 8; i < (3 * texSize) / 4; i++)
  for (var j = texSize / 4; j < (3 * texSize) / 4; j++) data[i][j] = 1.0;

// Bump Map Normals

var normalst = new Array();
for (var i = 0; i < texSize; i++) normalst[i] = new Array();
for (var i = 0; i < texSize; i++) for (var j = 0; j < texSize; j++) normalst[i][j] = new Array();
for (var i = 0; i < texSize; i++)
  for (var j = 0; j < texSize; j++) {
    normalst[i][j][0] = data[i][j] - data[i + 1][j];
    normalst[i][j][1] = data[i][j] - data[i][j + 1];
    normalst[i][j][2] = 1;
  }

// Scale to Texture Coordinates

for (var i = 0; i < texSize; i++)
  for (var j = 0; j < texSize; j++) {
    var d = 0;
    for (k = 0; k < 3; k++) d += normalst[i][j][k] * normalst[i][j][k];
    d = Math.sqrt(d);
    for (k = 0; k < 3; k++) normalst[i][j][k] = (0.5 * normalst[i][j][k]) / d + 0.5;
  }

// Normal Texture Array

var normals = new Uint8Array(3 * texSize * texSize);

for (var i = 0; i < texSize; i++)
  for (var j = 0; j < texSize; j++)
    for (var k = 0; k < 3; k++) normals[3 * texSize * i + 3 * j + k] = 255 * normalst[i][j][k];

var numPositions = 6;

var positionsArray = [];
var texCoordsArray = [];

var texCoord = [0, 0, 0, 1, 1, 1, 1, 0];

var vertices = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0];

var indices = [0, 1, 2, 2, 3, 0];

var modelViewMatrix, projectionMatrix, nMatrix;

var eye = vec3.fromValues(2.0, 2.0, 2.0);
var at = vec3.fromValues(0.5, 0.0, 0.5);
var up = vec3.fromValues(0.0, 1.0, 0.0);

var normal = vec4.fromValues(0.0, 1.0, 0.0, 0.0);
var tangent = vec3.fromValues(1.0, 0.0, 0.0);

var lightPosition = vec4.fromValues(0.0, 2.0, 0.0, 1.0);
var lightDiffuse = vec4.fromValues(1.0, 1.0, 1.0, 1.0);

var materialDiffuse = vec4.fromValues(0.7, 0.7, 0.7, 1.0);

var program;

var time = 0;

function configureTexture(image) {
  var texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, texSize, texSize, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
}

function mesh() {
  for (var i = 0; i < indices.length; i++) {
    var index = indices[i];
    positionsArray.push(vertices[index * 3], vertices[index * 3 + 1], vertices[index * 3 + 2]);
    texCoordsArray.push(texCoord[index * 2], texCoord[index * 2 + 1]);
  }
}

window.onload = function init() {
  canvas = document.getElementById('gl-canvas');

  gl = canvas.getContext('webgl2');
  if (!gl) alert("WebGL 2.0 isn't available");

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.enable(gl.DEPTH_TEST);

  //
  //  Load shaders and initialize attribute buffers
  //
  program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  modelViewMatrix = mat4.create();
  mat4.lookAt(modelViewMatrix, eye, at, up);
  //modelViewMatrix  = lookAt(eye, at, up);

  projectionMatrix = mat4.create();
  mat4.ortho(projectionMatrix, -0.75, 0.75, -0.75, 0.75, -5.5, 5.5);
  //projectionMatrix = ortho(-0.75,0.75,-0.75,0.75,-5.5,5.5);

  var normalMatrix = mat3.create();
  var nMatrix = mat3.create();
  mat3.fromMat4(normalMatrix, modelViewMatrix);
  mat3.normalFromMat4(nMatrix, modelViewMatrix);
  //mat3.transpose(nMatrix, nMatrix);
  //nMatrix = normalMatrix(modelViewMatrix, true);

  mesh();

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionsArray), gl.STATIC_DRAW);

  var positionLoc = gl.getAttribLocation(program, 'aPosition');
  gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  var tBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoordsArray), gl.STATIC_DRAW);

  var texCoordLoc = gl.getAttribLocation(program, 'aTexCoord');
  gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(texCoordLoc);

  configureTexture(normals);

  var diffuseProduct = vec4.create();
  vec4.multiply(diffuseProduct, lightDiffuse, materialDiffuse);
  //var diffuseProduct = mult(lightDiffuse, materialDiffuse);

  gl.uniform4fv(gl.getUniformLocation(program, 'uDiffuseProduct'), diffuseProduct);
  gl.uniform4fv(gl.getUniformLocation(program, 'uLightPosition'), lightPosition);
  gl.uniform4fv(gl.getUniformLocation(program, 'uNormal'), normal);
  gl.uniform3fv(gl.getUniformLocation(program, 'uObjTangent'), tangent);

  gl.uniformMatrix4fv(
    gl.getUniformLocation(program, 'uModelViewMatrix'),
    false,
    new Float32Array(modelViewMatrix),
  );
  gl.uniformMatrix4fv(
    gl.getUniformLocation(program, 'uProjectionMatrix'),
    false,
    new Float32Array(projectionMatrix),
  );
  gl.uniformMatrix3fv(
    gl.getUniformLocation(program, 'uNormalMatrix'),
    false,
    new Float32Array(nMatrix),
  );

  render();
};

var render = function () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  lightPosition[0] = 3.5 * Math.sin(0.01 * time);
  lightPosition[2] = 7.5 * Math.cos(0.01 * time);

  time += 1;

  gl.uniform4fv(gl.getUniformLocation(program, 'uLightPosition'), lightPosition);

  gl.drawArrays(gl.TRIANGLES, 0, numPositions);

  requestAnimationFrame(render);
};
