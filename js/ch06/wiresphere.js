"use strict";

const {
    vec3, vec4, mat4
} = glMatrix;

var canvas;
var gl;

var numOfSubdivides = 0;

var points = [];
var index = 0;

var va = vec4.fromValues(0.0, 0.0, -1.0, 1);
var vb = vec4.fromValues(0.0, 0.942809, 0.333333, 1);
var vc = vec4.fromValues(-0.816479, -0.471405, 0.333333, 1);
var vd = vec4.fromValues(0.816479, -0.471405, 0.333333, 1);

var vBuffer = null;
var vPosition = null;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var near = -10;
var far = 10;
var radius = 6.0;
var theta = 0.0;
var phi = 0.0;
var stept = 5.0 * Math.PI / 180.0;


var left = -2.0;
var right = 2.0;
var ytop = 2.0;
var bottom = -2.0;


var dxt = 0.0;
var dyt = 0.0;
var dzt = 0.0;
var stepm = 0.2;

var dxm = 0.0;
var dym = 0.0;
var dzm = 0.0;

var eye;
var at = vec3.fromValues(0.0, 0.0, 0.0);
var up = vec3.fromValues(0.0, 1.0, 0.0);

var currentKey = [];
// move object
function handleKeyDown() {
    var key = event.keyCode;
    currentKey[key] = true;
    switch (key) {
        case 65: //left//a
            dxt -= stept;
            break;
        case 68: // right//d
            dxt += stept;
            break;
        case 87: // up//w
            dyt += stept;
            break;
        case 83: // down//s
            dyt -= stept;
            break;
        case 90: // a//z
            dzt += stept;
            break;
        case 88: // d//x
            dzt -= stept;
            break;
        case 72: // h//ytheta-
            dxm -= stepm;
            break;
        case 75: // k//ytheta+
            dxm += stepm;
            break;
        case 85: // u//xtheta+
            dym += stepm;
            break;
        case 74: // j//xtheta-
            dym -= stepm;
            break;
        case 78: // n//ztheta+
            dzm -= stepm;
            break;
        case 77: // m//ztheta-
            dzm += stepm;
            break;
        case 82: // r//reset
            dxm = 0;
            dym = 0;
            dzm = 0;
            dxt = 0;
            dyt = 0;
            dzt = 0;
            break;
        case 86: // v //increase divide
            numOfSubdivides++;
            index = 0;
            points = [];
            
            divideTetra(va, vb, vc, vd, numOfSubdivides);
            gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
            break;
        case 66: // b  //decrease divide
            if (numOfSubdivides)
                numOfSubdivides--;
            index = 0;
            points = [];
            
            divideTetra(va, vb, vc, vd, numOfSubdivides);
            gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
            break;
        case 37: // left // theta--
            theta += stept;
            break;
        case 39: // right // theta++
            theta -= stept;
            break;
        case 38: // up // phi++
            phi += stept;
            break;
        case 40: // down // phi--
            phi -= stept;
            break;
    }
    requestAnimFrame(render);
}

function handleKeyUp() {
    currentKey[event.keyCode] = false;
}

function triangle(a, b, c) {
    points.push(a[0], a[1], a[2], a[3]);
    points.push(b[0], b[1], b[2], b[3]);
    points.push(b[0], b[1], b[2], b[3]);
    points.push(c[0], c[1], c[2], c[3]);
    points.push(c[0], c[1], c[2], c[3]);
    points.push(a[0], a[1], a[2], a[3]);
    index += 6;
}

function divideTriangle(a, b, c, n) {
    if (n > 0) {
        var ab = vec4.create();
        vec4.lerp(ab, a, b, 0.5);
        var abt = vec3.fromValues(ab[0], ab[1], ab[2]);
        vec3.normalize(abt, abt);
        vec4.set(ab, abt[0], abt[1], abt[2], 1.0);

        var bc = vec4.create();
        vec4.lerp(bc, b, c, 0.5);
        var bct = vec3.fromValues(bc[0], bc[1], bc[2]);
        vec3.normalize(bct, bct);
        vec4.set(bc, bct[0], bct[1], bct[2], 1.0);

        var ac = vec4.create();
        vec4.lerp(ac, a, c, 0.5);
        var act = vec3.fromValues(ac[0], ac[1], ac[2]);
        vec3.normalize(act, act);
        vec4.set(ac, act[0], act[1], act[2], 1.0);

        divideTriangle(a, ab, ac, n - 1);
        divideTriangle(ab, b, bc, n - 1);
        divideTriangle(bc, c, ac, n - 1);
        divideTriangle(ab, bc, ac, n - 1);
    } else {
        triangle(a, b, c);
    }
}

function divideTetra(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}

function initSphere() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.width);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // 初始化四个顶点，x=rsin(theta)cos(phi),y=rsin(theta)sin(phi),z=rcos(theta)
    

    vBuffer = gl.createBuffer();

    divideTetra(va, vb, vc, vd, numOfSubdivides);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

    modelViewMatrix = mat4.create();
    projectionMatrix = mat4.create();

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3.fromValues(radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(theta));

    mat4.lookAt(modelViewMatrix, eye, at, up);
    mat4.translate(modelViewMatrix, modelViewMatrix, vec3.fromValues(dxm, dym, dzm));
    mat4.rotateX(modelViewMatrix, modelViewMatrix, dxt);
    mat4.rotateY(modelViewMatrix, modelViewMatrix, dyt);
    mat4.rotateZ(modelViewMatrix, modelViewMatrix, dzt);

    mat4.ortho(projectionMatrix, left, right, bottom, ytop, near, far);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, new Float32Array(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, new Float32Array(projectionMatrix));

    /*
    for (var i = 0; i < points.length; i += 3)
        gl.drawArrays(gl.LINE_LOOP, i, 3);
    */
    gl.drawArrays(gl.LINES, 0, points.length/4);
    requestAnimFrame(render);
}