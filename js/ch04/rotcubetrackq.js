"use strict";

const { vec3, vec4 } = glMatrix;

var canvas;
var gl;

var numVertices = 36;

var points = [];
var colors = [];

var rotationQuaternion;
var rotationQuaternionLoc;

var angle = 0.0;
var axis = [ 0, 0, 1 ];

var trackingMouse = false;
var trackballMove = false;

var lastPos = [ 0, 0, 0 ];
var curx, cury;
var startx, starty;

function initCube(){
	canvas = document.getElementById( "gl-canvas" );

	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	makeCube();

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	gl.enable( gl.DEPTH_TEST );

	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );

	var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	rotationQuaternion = vec4.fromValues( 1.0, 0.0, 0.0, 0.0 );
	rotationQuaternionLoc = gl.getUniformLocation( program, "r" );
	gl.uniform4fv( rotationQuaternionLoc, new Float32Array( rotationQuaternion ) );

	canvas.addEventListener( "mousedown", function(event){
		var x = 2*event.clientX/canvas.width-1;
		var y = 2*(canvas.height-event.clientY)/canvas.height-1;
		startMotion( x, y );
	});

	canvas.addEventListener( "mouseup", function(event){
		var x = 2*event.clientX/canvas.width-1;
		var y = 2*(canvas.height-event.clientY)/canvas.height-1;
		stopMotion( x, y );
	});

	canvas.addEventListener( "mousemove", function(event){
		var x = 2*event.clientX/canvas.width-1;
		var y = 2*(canvas.height-event.clientY)/canvas.height-1;
		moveMotion( x, y );
	});

	render();
}

function multq( a, b ){
	var s = vec3.fromValues( a[1], a[2], a[3] );
	var t = vec3.fromValues( b[1], b[2], b[3] );
	var u = vec4.create();
	var u1 = a[0]*b[0] - vec3.dot(s,t);
	var u2 = vec3.create();
	vec3.cross( u2, t, s );
	var u3 = vec3.create();
	vec3.scale( u3, t, a[0] );
	var u4 = vec3.create();
	vec3.scale( u4, s, b[0] );
	vec3.add( u3, u3, u4 );
	vec3.add( u2, u2, u3 );
	vec4.set( u, u1, u2[0], u2[1], u2[2] );
	return u;
}

function trackballView( x, y ){
	var d, a;
	var v = [];

	v[0] = x;
	v[1] = y;

	d = v[0]*v[0]+v[1]*v[1];
	if( d < 1.0 )
		v[2] = Math.sqrt( 1.0 - d );
	else{
		v[2] = 0.0;
		a = 1.0 / Math.sqrt( d );
		v[0] *= a;
		v[1] *= a;
	}
	return v;
}

function startMotion( x, y ){
	trackingMouse = true;
	startx = x;
	starty = y;
	curx = x;
	cury = y;

	lastPos = trackballView( x, y );
	trackballMove = true;
}

function moveMotion( x, y ){
	var dx, dy, dz;

	var curPos = trackballView( x, y );
	if( trackingMouse ){
		dx = curPos[0] - lastPos[0];
		dy = curPos[1] - lastPos[1];
		dz = curPos[2] - lastPos[2];

		if( dx || dy || dz ){
			angle = -1.0*Math.sqrt( dx*dx + dy*dy + dz*dz );

			axis[0] = lastPos[1] * curPos[2] - lastPos[2] * curPos[1];
			axis[1] = lastPos[2] * curPos[0] - lastPos[0] * curPos[2];
			axis[2] = lastPos[0] * curPos[1] - lastPos[1] * curPos[0];

			lastPos[0] = curPos[0];
			lastPos[1] = curPos[1];
			lastPos[2] = curPos[2];
		}
	}
	render();
}

function stopMotion( x, y ){
	trackingMouse = false;
	if( startx != x || starty != y ){
	}else{
		angle = 0.0;
		trackballMove = false;
	}
}

function makeCube(){
	var vert1 = vec4.fromValues( -0.5, -0.5,  0.5,  1.0 );
	var vert2 = vec4.fromValues( -0.5,  0.5,  0.5,  1.0 );
	var vert3 = vec4.fromValues(  0.5,  0.5,  0.5,  1.0 );
	var vert4 = vec4.fromValues(  0.5, -0.5,  0.5,  1.0 );
	var vert5 = vec4.fromValues( -0.5, -0.5, -0.5,  1.0 );
	var vert6 = vec4.fromValues( -0.5,  0.5, -0.5,  1.0 );
	var vert7 = vec4.fromValues(  0.5,  0.5, -0.5,  1.0 );
	var vert8 = vec4.fromValues(  0.5, -0.5, -0.5,  1.0 );

	var vertices = [
		vert1, vert2, vert3, vert4, vert5, vert6, vert7, vert8 
	];

	var vcol1 = vec4.fromValues( 0.0, 0.0, 0.0, 1.0 );
	var vcol2 = vec4.fromValues( 1.0, 0.0, 0.0, 1.0 );
	var vcol3 = vec4.fromValues( 1.0, 1.0, 0.0, 1.0 );
	var vcol4 = vec4.fromValues( 0.0, 1.0, 0.0, 1.0 );
	var vcol5 = vec4.fromValues( 0.0, 0.0, 1.0, 1.0 );
	var vcol6 = vec4.fromValues( 1.0, 0.0, 1.0, 1.0 );
	var vcol7 = vec4.fromValues( 0.0, 1.0, 1.0, 1.0 );
	var vcol8 = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );

	var vertexColors = [
		vcol1, vcol2, vcol3, vcol4, vcol5, vcol6, vcol7, vcol8
	];

	var faces = [
		1, 0, 3, 1, 3, 2, //正
		2, 3, 7, 2, 7, 6, //右
		3, 0, 4, 3, 4, 7, //底
		6, 5, 1, 6, 1, 2, //顶
		4, 5, 6, 4, 6, 7, //背
		5, 4, 0, 5, 0, 1  //左
	];

	for( var i = 0; i < faces.length; i++ ){
		points.push( vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2] );

		colors.push( vertexColors[Math.floor(i/6)][0], vertexColors[Math.floor(i/6)][1], vertexColors[Math.floor(i/6)][2], vertexColors[Math.floor(i/6)][3],  );
	}
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	if( trackballMove ){
		vec3.normalize(axis,axis);
		var cosa = Math.cos( angle/2.0 );
		var sina = Math.sin( angle/2.0 );
		
		var rotation = vec4.fromValues( cosa, sina*axis[0], sina*axis[1], sina*axis[2] );
		rotationQuaternion = multq( rotationQuaternion, rotation );

		gl.uniform4fv( rotationQuaternionLoc, new Float32Array( rotationQuaternion ) ); 
	}
	gl.drawArrays( gl.TRIANGLES, 0, points.length/3 ); // gl.drawElements(gl.TRIANGLES, numverts, 0);
	requestAnimFrame( render );
}
