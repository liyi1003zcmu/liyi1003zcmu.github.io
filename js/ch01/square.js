"use strict";

var gl;

window.onload = function init(){
	var canvas = document.getElementById( "square-canvas" );
	gl = canvas.getContext("webgl2");
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Four Vertices
	var points = new Float32Array([
		-0.5, -0.5,
		 0.5, -0.5,
		 0.5,  0.5,
		-0.5,  0.5,
		//-0.5, -0.5,
		// 0.5, 0.5
	]);

	var colors=new Float32Array([
		0.0, 1.0, 0.0, 1.0,
		//0.0, 1.0, 0.0, 1.0,
		//0.0, 0.0, 1.0, 1.0,
		//1.0, 0.0, 1.0, 1.0
	]);

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width/2, canvas.height/2 );
	gl.clearColor( 1.0, 0.0, 0.0, 1.0 );

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

	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	
	
	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	//gl.drawArrays( gl.TRIANGLES, 0, 6 );
	//gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
}