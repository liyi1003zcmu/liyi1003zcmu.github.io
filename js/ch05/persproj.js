"use strict";

const { vec3, vec4, mat4 } = glMatrix;

var canvas;
var gl;

var NumVertices = 36;

var points = [];
var colors = [];

var near = 0.1;
var far = 5.0;
var radius = 4.0;
var theta = 0.0;
var phi = 0.0;
var dtheta = 5.0 * Math.PI / 180.0;

var fovy = 45.0 * Math.PI / 180.0;  // Field-of-view in Y direction angle (in degrees)
var aspect;       // Viewport aspect ratio

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var modelViewMatrix, projectionMatrix;
var eye;
const at = vec3.fromValues(0.0, 0.0, 0.0);
const up = vec3.fromValues(0.0, 1.0, 0.0);

var currentKey = [];

function handleKeyDown() {
    var key = event.keyCode;
    currentKey[key] = true;
    switch (key) {
        case 37: //left
            phi += dtheta;
            break;
        case 39: // right
            phi -= dtheta;
            break;
        case 38: // up
            theta += dtheta;
            break;
        case 40: // down
            theta -= dtheta;
            break;
        case 65: // a
            near *= 1.1;
            far *= 1.1;
            break;
        case 68: // d
            near *= 0.9;
            far *= 0.9;
            break;
        case 87: // w
            radius *= 1.1;
            break;
        case 83: // s
            radius *= 0.9;
            break;
    }
    requestAnimFrame(render);
}

function handleKeyUp() {
    currentKey[event.keyCode] = false;
}


function makeColorCube() {
    var vertices = [
        vec4.fromValues(-0.5, -0.5, 0.5, 1.0),
        vec4.fromValues(-0.5, 0.5, 0.5, 1.0),
        vec4.fromValues(0.5, 0.5, 0.5, 1.0),
        vec4.fromValues(0.5, -0.5, 0.5, 1.0),
        vec4.fromValues(-0.5, -0.5, -0.5, 1.0),
        vec4.fromValues(-0.5, 0.5, -0.5, 1.0),
        vec4.fromValues(0.5, 0.5, -0.5, 1.0),
        vec4.fromValues(0.5, -0.5, -0.5, 1.0)
    ];

    var vertexColors = [
        vec4.fromValues(0.0, 0.0, 0.0, 1.0),
        vec4.fromValues(1.0, 0.0, 0.0, 1.0),
        vec4.fromValues(1.0, 1.0, 0.0, 1.0),
        vec4.fromValues(0.0, 1.0, 0.0, 1.0),
        vec4.fromValues(0.0, 0.0, 1.0, 1.0),
        vec4.fromValues(1.0, 0.0, 1.0, 1.0),
        vec4.fromValues(0.0, 1.0, 1.0, 1.0),
        vec4.fromValues(1.0, 1.0, 1.0, 1.0)
    ];

    var faces = [
        1, 0, 3, 1, 3, 2,//正
        2, 3, 7, 2, 7, 6,//右
        3, 0, 4, 3, 4, 7,//底
        6, 5, 1, 6, 1, 2,//顶
        4, 5, 6, 4, 6, 7,//背
        5, 4, 0, 5, 0, 1 //左
    ];

    for (var i = 0; i < faces.length; i++) {
        points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2], vertices[faces[i]][3]);
        var id = Math.floor(i / 6);
        colors.push(vertexColors[id][0], vertexColors[id][1], vertexColors[id][2], vertexColors[id][3]);
    }
}

function initCube() {

    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext("webgl2");
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);

    aspect = canvas.width / canvas.height;

    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);


    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    makeColorCube();

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    render();
}

var render = function () {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3.fromValues(radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(theta));

    mat4.lookAt(mvMatrix, eye, at, up);
    mat4.perspective(pMatrix, fovy, aspect, near, far);

    gl.uniformMatrix4fv(modelViewMatrix, false, new Float32Array(mvMatrix));
    gl.uniformMatrix4fv(projectionMatrix, false, new Float32Array(pMatrix));

    gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
    requestAnimFrame(render);
}
