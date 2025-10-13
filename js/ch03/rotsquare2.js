"use strict";

var canvas;
var gl;

var theta = 0.0;
var xpos = 0.0;
var dx = 0.01;
var thetaLoc;
var xLoc;
var vPosition;
var bufferId;
var vertices;

function initRotSquare(){
	canvas = document.getElementById( "rot-canvas" );
	gl = canvas.getContext("webgl2");
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	vertices = new Float32Array([
		 0,  0.5,  0,
		-0.5,  0,  0,
		 0.5,  0,  0,
		 0, -0.5,  0
	]);

	bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

	vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation( program, "theta" );
	xLoc = gl.getUniformLocation(program, "xpos");

	renderSquare();
}

function renderSquare(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += 0.1;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	
	xpos += dx ;
	if( xpos > 1.0 || xpos < -1.0 )
		dx = -dx;
	
	gl.uniform1f( thetaLoc, theta );
	gl.uniform1f( xLoc, xpos );

	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

	// update and render
	window.requestAnimFrame( renderSquare );
}