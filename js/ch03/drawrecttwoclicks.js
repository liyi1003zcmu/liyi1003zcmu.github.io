"use strict";

const { vec2, vec4 } = glMatrix;

var canvas;
var gl;

var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
var index = 0;
var first = true;

var t, t1, t2, t3, t4;

var cIndex = 0;

var colors = [
	0.0, 0.0, 0.0, 1.0, // black
	1.0, 0.0, 0.0, 1.0 , // red
	1.0, 1.0, 0.0, 1.0 , // yellow
	0.0, 1.0, 0.0, 1.0 , // green
	0.0, 0.0, 1.0, 1.0 , // blue
	1.0, 0.0, 1.0, 1.0 , // magenta
	0.0, 1.0, 1.0, 1.0  // cyan
];

function initRectCanvas(){
	canvas = document.getElementById( "rect-canvas" );
	gl = canvas.getContext("webgl2");
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

	canvas.addEventListener( "mousedown", function( event ){
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		
		if( first ){
			first = false;
			gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
			var rect = canvas.getBoundingClientRect();
			var cx = event.clientX - rect.left;
			var cy = event.clientY - rect.top; // offset
			t1 = vec2.fromValues( 2 * cx / canvas.width - 1, 2 * ( canvas.height - cy ) / canvas.height - 1 );
		}else{
			first = true;
			var rect = canvas.getBoundingClientRect();
			var cx = event.clientX - rect.left;
			var cy = event.clientY - rect.top; // offset
			t2 = vec2.fromValues( 2 * cx / canvas.width - 1, 2 * ( canvas.height - cy ) / canvas.height - 1 );
			t3 = vec2.fromValues( t1[0], t2[1] );
			t4 = vec2.fromValues( t2[0], t1[1] );

			gl.bufferSubData( gl.ARRAY_BUFFER, 8 * index, new Float32Array( t1 ) );
			gl.bufferSubData( gl.ARRAY_BUFFER, 8 * (index+1), new Float32Array( t3 ) );
			gl.bufferSubData( gl.ARRAY_BUFFER, 8 * (index+2), new Float32Array( t2 ) );
			gl.bufferSubData( gl.ARRAY_BUFFER, 8 * (index+3), new Float32Array( t4 ) );
			
			gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );

			var c = Math.floor(Math.random() * 1024) % 7;
			//var c = 0;
			c = c * 4;
			t = vec4.fromValues( colors[c], colors[c+1], colors[c+2], colors[c+3] );
			gl.bufferSubData( gl.ARRAY_BUFFER, 16 * index, new Float32Array( t ) );
			gl.bufferSubData( gl.ARRAY_BUFFER, 16 * (index + 1), new Float32Array( t ) );
			gl.bufferSubData( gl.ARRAY_BUFFER, 16 * (index + 2), new Float32Array( t ) );
			gl.bufferSubData( gl.ARRAY_BUFFER, 16 * (index + 3), new Float32Array( t ) );
			
			index += 4;
		}
	} );

	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	var vBuffer = gl.createBuffer(); //position
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 8 * maxNumVertices, gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var cBuffer = gl.createBuffer(); // color
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 16 * maxNumVertices, gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );

	renderTriangles();
}

function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	for( var i = 0; i < index; i+=4 )
		gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );
	window.requestAnimationFrame( renderTriangles );
}