"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "trisquare-canvas" );
	gl = canvas.getContext("webgl2");
	if( !gl ){
		alert( "WebGL isn't available" );
	}


	// Three Vertices
	points = new Float32Array([
		-0.5,  0.5,
		-1.0, -0.5,
		 0.0, -0.5,
		 1.0, -0.5,
		 1.0,  0.5,
		 0.0,  0.5
	]);

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, points, gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	gl.drawArrays( gl.TRIANGLE_FAN, 2, 4 );
	//gl.drawArrays( gl.TRIANGLES, 0, 9 );
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}