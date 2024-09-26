"use strict";

const { vec3 } = glMatrix;

var gl;
var canvas;
var points = [];

var numPoints = 5000;

window.onload = function initDepth() {
    canvas = document.getElementById("gl-canvas");

	gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("WebGL isn't available");
    }

    var vertices = [
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        0.0, 1.0, 0.0,
        0.0, -1.0, 1.0
    ];

    points.push( 0.0, 0.0, 0.0 );

    var u = vec3.create();
    var v = vec3.create();
    var w = vec3.create();
    var p = vec3.create();
    for (var i = 0; points.length < numPoints * 3; i++) {
        var j = Math.floor(Math.random() * 4);

        vec3.set(u, points[i * 3], points[i * 3 + 1], points[i * 3 + 2]);
        vec3.set(v, vertices[j * 3], vertices[j * 3 + 1], vertices[j * 3 + 2]);
        vec3.lerp(p, u, v, 0.5);
        //for (var k = 0; k < 3; k++)
        //    points.push(p[k]);
        points.push( p[0], p[1], p[2] );
    }

    // configure webgl
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // load shaders and initialise attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // load data into the gpu
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    // associate out shader variables with data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    renderDepth();
}

function renderDepth() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, points.length / 3);
}