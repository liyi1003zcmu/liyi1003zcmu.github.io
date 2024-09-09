"use strict";

var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("trisquare-canvas");
	gl = canvas.getContext("webgl2");
	if( !gl ){
		alert( "WebGL isn't available" );
	}

    // Three Vertices
    var vertices1 = new Float32Array([
        -0.5, 0.5,
        -1.0, -0.5,
        0.0, -0.5
    ]);

    var vertices2 = new Float32Array([
        0.0, -0.5,
        1.0, -0.5,
        1.0, 0.5,
        1.0, 0.5,
        0.0, 0.5,
        0.0, -0.5
    ]);
	
    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load shaders and initialize attribute buffers
    var program1 = initShaders(gl, "vertex-shader", "fragment1-shader");
    gl.useProgram(program1);

    // Load the data into the GPU
    var bufferId1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId1);
    gl.bufferData(gl.ARRAY_BUFFER, vertices1, gl.STATIC_DRAW);

    // Associate external shader variables with data buffer
    var vPosition1 = gl.getAttribLocation(program1, "vPosition");
    gl.vertexAttribPointer(vPosition1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition1);
    render1();

    var program2 = initShaders( gl, "vertex-shader", "fragment2-shader" );
    gl.useProgram( program2 );

    var bufferId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
    gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);

    var vPosition2 = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render2();
}

function render1() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    //gl.drawArrays(gl.TRIANGLE_FAN, 2, 4);
    //gl.drawArrays( gl.TRIANGLES, 0, 9 );
    //gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}

function render2() {
    //gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    //gl.drawArrays( gl.TRIANGLES, 0, 9 );
    //gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}