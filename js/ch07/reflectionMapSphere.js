"use strict";

const{ vec3, vec4, mat3, mat4 } = glMatrix;

var canvas;
var gl;
var program;

var numOfSubdivides = 8;

var points = [];
var normals = [];

var theta = [ 0.0, 0.0, 0.0 ];
var flag = true;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;

var cubeMap;

var red = new Uint8Array( [ 255, 0, 0, 255 ] );
var green = new Uint8Array( [ 0, 255, 0, 255 ] );
var blue = new Uint8Array( [ 0, 0, 255, 255 ] );
var cyan = new Uint8Array( [ 0, 255, 255, 255 ] );
var magenta = new Uint8Array( [ 255, 0, 255, 255 ] );
var yellow = new Uint8Array( [ 255, 255, 0, 255 ] );

function configureCubeMap(){
	cubeMap = gl.createTexture();

	gl.bindTexture( gl.TEXTURE_CUBE_MAP, cubeMap );

	gl.texImage2D( gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, red );
	gl.texImage2D( gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, green );
	gl.texImage2D( gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, blue );
	gl.texImage2D( gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, cyan );
	gl.texImage2D( gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, yellow );
	gl.texImage2D( gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, magenta );

	gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
	gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST );

}

function triangle( a, b, c ){
	points.push( a[0], a[1], a[2], a[3] );
	points.push( b[0], b[1], b[2], b[3] );
	points.push( c[0], c[1], c[2], c[3] );

	var t1 = vec4.create();
	var t2 = vec4.create();

	vec4.subtract( t1, b, a );
	vec4.subtract( t2, c, a );
	var nt1 = vec3.fromValues( t1[0], t1[1], t1[2] );
	var nt2 = vec3.fromValues( t2[0], t2[1], t2[2] );
	var vnor = vec3.create();
	vec3.cross( vnor, nt1, nt2 );
	vec3.normalize( vnor, vnor );
/*
	normals.push( vnor[0], vnor[1], vnor[2], 0.0 );
	normals.push( vnor[0], vnor[1], vnor[2], 0.0 );
	normals.push( vnor[0], vnor[1], vnor[2], 0.0 );
*/

	normals.push( a[0], a[1], a[2], a[3] );
	normals.push( b[0], b[1], b[2], b[3] );
	normals.push( c[0], c[1], c[2], c[3] );
}

function divideTriangle( a, b, c, n ){
	if( n > 0 ){
		var ab = vec4.create();
		vec4.lerp( ab, a, b, 0.5 );
		var abt = vec3.fromValues( ab[0], ab[1], ab[2] );
		vec3.normalize( abt, abt );
		vec4.set( ab, abt[0], abt[1], abt[2], 1.0 );

		var bc = vec4.create();
		vec4.lerp( bc, b, c, 0.5 );
		var bct = vec3.fromValues( bc[0], bc[1], bc[2] );
		vec3.normalize( bct, bct );
		vec4.set( bc, bct[0], bct[1], bct[2], 1.0 );

		var ac = vec4.create();
		vec4.lerp( ac, a, c, 0.5 );
		var act = vec3.fromValues( ac[0], ac[1], ac[2] );
		vec3.normalize( act, act );
		vec4.set( ac, act[0], act[1], act[2], 1.0 );

		divideTriangle( a, ab, ac, n - 1 );
		divideTriangle( ab, b, bc, n - 1 );
		divideTriangle( bc, c, ac, n - 1 );
		divideTriangle( ab, bc, ac, n - 1 );
	}else{
		triangle( a, b, c );
	}
}

function divideTetra( a, b, c, d, n ){
	divideTriangle( a, b, c, n );
	divideTriangle( d, c, b, n );
	divideTriangle( a, d, b, n );
	divideTriangle( a, c, d, n );
}

window.onload = function initGL(){
	canvas = document.getElementById( "gl-canvas" );

	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isnt' available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	gl.enable( gl.DEPTH_TEST );


	program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	var va = vec4.fromValues( 0.0, 0.0, -1.0, 1 );
	var vb = vec4.fromValues( 0.0, 0.942809, 0.333333, 1 );
	var vc = vec4.fromValues( -0.816479, -0.471405, 0.333333, 1 );
	var vd = vec4.fromValues( 0.816479, -0.471405, 0.333333, 1 );

	divideTetra( va, vb, vc, vd, numOfSubdivides );

	var nBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( normals ), gl.STATIC_DRAW );

	var vNormal = gl.getAttribLocation( program, "vNormal" );
	gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vNormal );

	var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	configureCubeMap();

	gl.activeTexture( gl.TEXTURE0 );
	gl.uniform1i( gl.getUniformLocation( program, "texMap" ), 0 );	

	document.getElementById("ButtonX").onclick = function(){axis = xAxis;}
    document.getElementById("ButtonY").onclick = function(){axis = yAxis;};
    document.getElementById("ButtonZ").onclick = function(){axis = zAxis;};
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};

    render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	if( flag )
		theta[ axis ] += 2.0;

	var eye = vec3.fromValues( 0.0, 0.0, 2.0 );
	var at = vec3.fromValues( 0.0, 0.0, 0.0 );
	var up = vec3.fromValues( 0.0, 1.0, 0.0 );

	var modelViewMatrix = mat4.create();
	mat4.lookAt( modelViewMatrix, eye, at, up );

	mat4.rotateX( modelViewMatrix, modelViewMatrix, theta[xAxis] * Math.PI / 180.0 );
	mat4.rotateY( modelViewMatrix, modelViewMatrix, theta[yAxis] * Math.PI / 180.0 );
	mat4.rotateX( modelViewMatrix, modelViewMatrix, theta[zAxis] * Math.PI / 180.0 );	

	var mvMatrix = gl.getUniformLocation( program, "modelViewMatrix" );
	gl.uniformMatrix4fv( mvMatrix, false, new Float32Array( modelViewMatrix ) );


	var normalMatrix = mat3.fromValues( modelViewMatrix[0], modelViewMatrix[4], modelViewMatrix[5], 
		modelViewMatrix[1], modelViewMatrix[5], modelViewMatrix[9],
		modelViewMatrix[2], modelViewMatrix[6], modelViewMatrix[10] );
	var nMatrix = gl.getUniformLocation( program, "normalMatrix" );
	gl.uniformMatrix3fv( nMatrix, false, new Float32Array( normalMatrix ) );

	var projectionMatrix = mat4.create();
	mat4.ortho( projectionMatrix, -2.0, 2.0, -2.0, 2.0, -10, 10 );
	var pMatrix = gl.getUniformLocation( program, "projectionMatrix" );
	gl.uniformMatrix4fv( pMatrix, false, new Float32Array( projectionMatrix ) );

	
	gl.drawArrays( gl.TRIANGLES, 0, points.length/4 );
	
	requestAnimationFrame( render );
}