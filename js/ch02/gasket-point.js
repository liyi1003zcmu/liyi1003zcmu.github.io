"use strict";

const { vec3 } = glMatrix;

var gl;
var points;

var numPoints = 5000;

window.onload = function initPoints(){
	var canvas = document.getElementById( "gl-canvas" );

	gl = canvas.getContext("webgl2");
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// initialise data for Sierpinski gasket
	// first, initialize the corners of gasket with three vertices 
	// -1 -1 0 0 1 0 1 -1 0
	var vertices = [
		-1, -1,  0,
		 0,  1,  0,
		 1, -1,  0
	];

	// Specify a starting point p for iterations
	// p must lie inside any set of three vertices
	//var u1 = vec3.create();
	//vec3.set(u1, vertices[0], vertices[1], vertices[2] );
	var u1 = vec3.fromValues( vertices[0], vertices[1], vertices[2] );

	//var u2 = vec3.create();
	//vec3.set(u2, vertices[3], vertices[4], vertices[5] );
	var u2 = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	//var u3 = vec3.create();
	//vec3.set( u3, vertices[6], vertices[7], vertices[8] );
	var u3 = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

	var u = vec3.create();
	vec3.add( u, u1, u2);
	var v = vec3.create();
	vec3.add( v, u1, u3);

	var p = vec3.create();
	vec3.add( p, u, v );
	vec3.scale( p, p, 0.25 );
	
	//console.log(p);
	// add initial point into array of points
	points = [];
	for( var i = 0; i < 3; i++ )
		points.push( p[ i ] );

	// Compute new points;
	// each new point is located midway between last point 
	// and a randomly chosen vertex
	for( var i = 0; points.length < numPoints * 3; i++ ){
		var j = Math.floor( Math.random() * 3 );
		// jth from vertices
		
		vec3.set( u, vertices[j*3], vertices[j*3+1], vertices[j*3+2] );
		// ith point
		
		vec3.set( v, points[i*3], points[i*3+1], points[i*3+2]);

		vec3.add( p, u, v );
		vec3.scale( p, p, 0.5 );
		//p = vec3.add( points[ i ], vec3.create( vertices[j*3], vertices[j*3+1], vertices[j*3+2]) );
		//p = vec3.scale( p, 0.5 );
		for( var k = 0; k < 3; k++ )
			points.push( p[ k ] );
	}
	console.log( "plen:"+points.length );
	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// load data into the gpu
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	// associate external shader variables with data buffer 
	var vPosition = gl.getAttribLocation( program, 'vPosition' );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	renderPoints();
};

function renderPoints(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.POINTS, 0, numPoints );
}