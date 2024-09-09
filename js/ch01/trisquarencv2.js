"use strict";

var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("trisquare-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("WebGL isn't available");
    }

    // Three Vertices
    var vertices1 = new Float32Array([
        -0.5, 0.5,
        -1.0, -0.5,
        0.0, -0.5,
        0.0, -0.5,
        1.0, -0.5,
        1.0, 0.5,
        0.0, 0.5
    ]);
 
    var tcolor = [
        0.0, 1.0, 0.0
    ];

    var tricolor = [];
    for( var i=0; i<3; i++ ) {
        tricolor.push(tcolor[0], tcolor[1], tcolor[2]);
    }

    var scolor = [
        1.0, 0.0, 0.0
    ];

    var sqcolor = [];
    for (var i = 0; i < 4; i++ ) {
        sqcolor.push(scolor[0], scolor[1], scolor[2]);
    }

    var vcolors = tricolor.concat(sqcolor);

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment1-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices1, gl.STATIC_DRAW);

    // Associate external shader variables with data buffer
    var vPosition1 = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(vPosition1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition1);
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vcolors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    /*
    var program2 = initShaders(gl, "xxx", "xx" );
    gl.useProgram(program2);

    var vBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.buffeData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);
    */
    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    // draw triangle
   // gl.useProgram(program);
   // gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, 3); 

    // draw square
    
    //gl.useProgram(program);
   // gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.drawArrays( gl.TRIANGLE_FAN, 3, 4 );
}

