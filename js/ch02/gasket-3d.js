"use strict";

/* import vec3 from glMatrix */
const { vec3 } = glMatrix;

var gl;
var canvas;

var points = [];
var colors = [];

var numTimesToSubdivide = 1;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("WebGL isn't available");
    }

    // initialise data for 3d sierpinski gasket
    // first initialize the vertices of the 3d gasket
    // four vertices on unit cicle
    // initial tetrahedron with equal length sides

    var vertices = [
        0.0000, 0.0000, -1.0000,
        0.0000, 0.9428, 0.3333,
        -0.8165, -0.4714, 0.3333,
        0.8165, -0.4714, 0.3333
    ];

    // var t = vec3.create();
    // vec3.set(t, vertices[0], vertices[1], vertices[2]);
    var t = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
    // var u = vec3.create();
    // vec3.set(u, vertices[3], vertices[4], vertices[5]);
    var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
    // var v = vec3.create();
    // vec3.set(v, vertices[6], vertices[7], vertices[8]);
    var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
    // var w = vec3.create();
    // vec3.set(w, vertices[9], vertices[10], vertices[11]);
    var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );

    divideTetra(t, u, v, w, numTimesToSubdivide);

    // configure webgl
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // enable hidden-surface removal
    gl.enable(gl.DEPTH_TEST);

    // load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // create buffer object, initialize it, and associate it with
    // attribute variables in vertex shader

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColor);

    render();
};

function triangle(a, b, c, color) {
    // add colors and vertices for one triangle
    var baseColor = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 
        0.0, 0.0, 0.0, 1.0
    ];

    for (var k = 0; k < 4; k++) {
        colors.push(baseColor[color * 4 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(a[k]);

    for (var k = 0; k < 4; k++) {
        colors.push(baseColor[color * 4 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(b[k]);

    for (var k = 0; k < 4; k++) {
        colors.push(baseColor[color * 4 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(c[k]);
}

function tetra(a, b, c, d) {
    triangle(a, c, b, 0);
    triangle(a, c, d, 1);
    triangle(a, b, d, 2);
    triangle(b, c, d, 3);
}

function divideTetra(a, b, c, d, count) {
    // check for end of recursion
    if (count == 0) {
        tetra(a, b, c, d);
    } else {
        var ab = vec3.create();
        glMatrix.vec3.lerp(ab, a, b, 0.5);
        var ac = vec3.create();
        glMatrix.vec3.lerp(ac, a, c, 0.5);
        var ad = vec3.create();
        glMatrix.vec3.lerp(ad, a, d, 0.5);
        var bc = vec3.create();
        glMatrix.vec3.lerp(bc, b, c, 0.5);
        var bd = vec3.create();
        glMatrix.vec3.lerp(bd, b, d, 0.5);
        var cd = vec3.create();
        glMatrix.vec3.lerp(cd, c, d, 0.5);

        --count;

        divideTetra(a, ab, ac, ad, count);
        divideTetra(ab, b, bc, bd, count);
        divideTetra(ac, bc, c, cd, count);
        divideTetra(ad, bd, cd, d, count);
    }

}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);
}