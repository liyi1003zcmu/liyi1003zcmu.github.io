"use strict"

const { vec3, vec4, mat4 } = glMatrix;

var canvas;
var gl;

var eye;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();//LookAt matrix and projection matrix in ortho
var modelViewMatrix, projectionMatrix;

var numVertices = 36; //cube divide into triangles

var points = [];
var colors = [];

// parameters for viewinig
var near = -1;
var far = 1;
var radius = 1.0;
var theta = 0.0;
var phi = 0.0;
var dtheta = 5.0 * Math.PI / 180.0;

var left = -1.0;
var right = 1.0;
var ytop = 1.0;
var ybottom = -1.0;

const eyeat = vec3.fromValues( 0.0, 0.0, 0.0 );
const eyeup = vec3.fromValues( 0.0, 1.0, 0.0 );

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
        points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2]);
        var id = Math.floor(i / 6);
        colors.push(vertexColors[id][0], vertexColors[id][1], vertexColors[id][2], vertexColors[id][3]);
    }
}

function initCube() {
    canvas = document.getElementById("proj-canvas");

    gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

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
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");

    // buttons to change viewing parameters

    document.getElementById("btn1").onclick = function () { near *= 1.1; far *= 1.1; };
    document.getElementById("btn2").onclick = function () { near *= 0.9; far *= 0.9; };
    document.getElementById("btn3").onclick = function () { radius *= 1.1; };
    document.getElementById("btn4").onclick = function () { radius *= 0.9; };
    document.getElementById("btn5").onclick = function () { theta += dtheta; };
    document.getElementById("btn6").onclick = function () { theta -= dtheta; };
    document.getElementById("btn7").onclick = function () { phi += dtheta; };
    document.getElementById("btn8").onclick = function () { phi -= dtheta; };

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3.fromValues(radius * Math.sin(phi), radius * Math.sin(theta), radius * Math.cos(phi)  );
    //eye = vec3.fromValues(0.0, 0.0, 1.0);

    mat4.lookAt(mvMatrix, eye, eyeat, eyeup);
    mat4.ortho(pMatrix, left, right, ybottom, ytop, near, far);

    gl.uniformMatrix4fv(modelViewMatrix, false, new Float32Array(mvMatrix));
    gl.uniformMatrix4fv(projectionMatrix, false, new Float32Array(pMatrix));

    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);
    requestAnimFrame(render);
}