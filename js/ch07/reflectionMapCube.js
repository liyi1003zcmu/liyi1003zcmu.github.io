"use strict";

const{ vec3, vec4, mat3, mat4 } = glMatrix;

var canvas;
var gl;
var program;

var points = [];
var colors = [];
var normals = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;

var theta = [ 0.0, 0.0, 0.0 ];
var flag = false;
var cubeMap;

var dxt;
var dyt;
var dzt;

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

var red = new Uint8Array( [ 255, 0, 0, 255 ] );
var green = new Uint8Array( [ 0, 255, 0, 255 ] );
var blue = new Uint8Array( [ 0, 0, 255, 255 ] );
var cyan = new Uint8Array( [ 0, 255, 255, 255 ] );
var magenta = new Uint8Array( [ 255, 0, 255, 255 ] );
var yellow = new Uint8Array( [ 255, 255, 0, 255 ] );

function handleMouseDown( event ){
	mouseDown = true;
	lastMouseX = event.clientX;
	lastMouseY = event.clientY;
}

function handleMouseUp( event ){
	mouseDown = false;
}

function handleMouseMove( event ){
	if( !mouseDown )
		return;

	var newX = event.clientX;
	var newY = event.clientY;

	var deltaX = newX - lastMouseX;
	theta[yAxis] += ( deltaX / 5 );

	var deltaY = newY - lastMouseY;
	theta[xAxis] += ( deltaY / 5 );

	lastMouseX = newX;
	lastMouseY = newY;
}

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

window.onload = function initGL(){
	canvas = document.getElementById( "gl-canvas" );

	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.height, canvas.width );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	gl.enable( gl.DEPTH_TEST );

	program = initShaders( gl, "vertex-shader", "fragment-shader" );

	gl.useProgram( program );

	makeColorCube();

	var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var nBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( normals ), gl.STATIC_DRAW );

	var vNormal = gl.getAttribLocation( program, "vNormal" );
	gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vNormal );

	configureCubeMap();

	gl.activeTexture( gl.TEXTURE0 );
	gl.uniform1i( gl.getUniformLocation( program, "texMap" ), 0 );

	document.getElementById("ButtonX").onclick = function(){axis = xAxis;}
    document.getElementById("ButtonY").onclick = function(){axis = yAxis;};
    document.getElementById("ButtonZ").onclick = function(){axis = zAxis;};
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};

    canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;

	render();
}

function makeColorCube(){
	var vertices = [
		vec4.fromValues( -0.5, -0.5,  0.5, 1.0 ),
		vec4.fromValues( -0.5,  0.5,  0.5, 1.0 ),
		vec4.fromValues(  0.5,  0.5,  0.5, 1.0 ),
		vec4.fromValues(  0.5, -0.5,  0.5, 1.0 ),
		vec4.fromValues( -0.5, -0.5, -0.5, 1.0 ),
		vec4.fromValues( -0.5,  0.5, -0.5, 1.0 ),
		vec4.fromValues(  0.5,  0.5, -0.5, 1.0 ),
		vec4.fromValues(  0.5, -0.5, -0.5, 1.0 )
	];

	var vertexColors = [
		vec4.fromValues( 0.0, 0.0, 0.0, 1.0 ),
		vec4.fromValues( 1.0, 0.0, 0.0, 1.0 ),
		vec4.fromValues( 1.0, 1.0, 0.0, 1.0 ),
		vec4.fromValues( 0.0, 1.0, 0.0, 1.0 ),
		vec4.fromValues( 0.0, 0.0, 1.0, 1.0 ),
		vec4.fromValues( 1.0, 0.0, 1.0, 1.0 ),
		vec4.fromValues( 0.0, 1.0, 1.0, 1.0 ),
		vec4.fromValues( 1.0, 1.0, 1.0, 1.0 )
	];

	var faces = [
		1, 0, 3, 1, 3, 2,//正
		2, 3, 7, 2, 7, 6,//右
		3, 0, 4, 3, 4, 7,//底
		6, 5, 1, 6, 1, 2,//顶
		4, 5, 6, 4, 6, 7,//背
		5, 4, 0, 5, 0, 1 //左
	];
	
	var normal = vec4.create();
	
	for( var i = 0; i < faces.length; i++ ){
		if( i%6 == 0 ){
			var t1 = vec4.create();
			var t2 = vec4.create();
			vec4.subtract( t1, vertices[faces[i+1]], vertices[faces[i]] );
			vec4.subtract( t2, vertices[faces[i+2]], vertices[faces[i]] );
			var nt1 = vec3.fromValues( t1[0], t1[1], t1[2] );
			var nt2 = vec3.fromValues( t2[0], t2[1], t2[2] );
			var vnor = vec3.create();
			vec3.cross( vnor, nt1, nt2 );
			vec3.normalize( vnor, vnor );
			vec4.set( normal, vnor[0], vnor[1], vnor[2], 0.0 );
		}
		points.push( vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2], 1.0 );
		var id = Math.floor(i/6);
		colors.push( vertexColors[id][0], vertexColors[id][1], vertexColors[id][2], vertexColors[id][3] );
		normals.push( normal[0], normal[1], normal[2], 0.0 );
		//normals.push( 0.0, 0.0, 1.0, 0.0 );
	}
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	if( flag )
		theta[ axis ] += 2.0;

	var eye = vec3.fromValues( 0.0, 0.0, 1.0 );
	var at = vec3.fromValues( 0.0, 0.0, 0.0 );
	var up = vec3.fromValues( 0.0, 1.0, 0.0 );

	var modelViewMatrix = mat4.create();
	mat4.lookAt( modelViewMatrix, eye, at, up );

	mat4.rotateX( modelViewMatrix, modelViewMatrix, theta[xAxis] * Math.PI / 180.0 );
	mat4.rotateY( modelViewMatrix, modelViewMatrix, theta[yAxis] * Math.PI / 180.0 );
	mat4.rotateZ( modelViewMatrix, modelViewMatrix, theta[zAxis] * Math.PI / 180.0 );

	var mvMatrix = gl.getUniformLocation( program, "modelViewMatrix" );
	gl.uniformMatrix4fv( mvMatrix, false, new Float32Array( modelViewMatrix ) );

	var normalMatrix = mat3.fromValues( modelViewMatrix[0], modelViewMatrix[1], modelViewMatrix[2], 
		modelViewMatrix[3], modelViewMatrix[4], modelViewMatrix[5],
		modelViewMatrix[6], modelViewMatrix[7], modelViewMatrix[8] );

	var projectionMatrix = mat4.create();
	mat4.ortho( projectionMatrix, -2.0, 2.0, -2.0, 2.0, -10, 10 );
	var pMatrix = gl.getUniformLocation( program, "projectionMatrix" );
	gl.uniformMatrix4fv( pMatrix, false, new Float32Array( projectionMatrix ) );

	var nMatrix = gl.getUniformLocation( program, "normalMatrix" );
	gl.uniformMatrix3fv( nMatrix, false, new Float32Array( normalMatrix ) );

	gl.drawArrays( gl.TRIANGLES, 0, points.length/4 );

	requestAnimFrame( render );
}
