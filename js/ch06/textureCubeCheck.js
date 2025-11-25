"use strict";

const{vec2, vec3, vec4 } = glMatrix;

var canvas;
var gl;
var program;

var texSize = 4;

var image1 = new Array()
	for( var i=0; i<texSize; i++ ) 
		image1[i] = new Array();
	for( var i=0; i<texSize; i++ )
		for( var j=0; j<texSize; j++ )
			image1[i][j] = new Float32Array(4);
	for( var i=0; i<texSize; i++ )
		for( var j=0; j<texSize; j++ ){
			var c = ((( i & 0x2 ) == 0 ) ^ (( j & 0x2 ) == 0 ));
			image1[i][j] = [ c, c, c, 1 ];
		}

var image2 = new Uint8Array( 4 * texSize * texSize )
for( var i = 0; i < texSize; i++ )
	for( var j = 0; j < texSize; j++ )
		for( var k = 0; k < 4; k++ )
			image2[ 4 * texSize * i + 4 * j + k ] = 255 * image1[i][j][k];	

var points = [];
var colors = [];
var texCoords = [];

var texture;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;
var theta = [ 45.0, 45.0, 45.0 ];
var thetaLoc;

function makeCube(){
	var vertices = [
		vec4.fromValues( -0.5, -0.5,  0.5,  1.0 ),
		vec4.fromValues( -0.5,  0.5,  0.5,  1.0 ),
		vec4.fromValues(  0.5,  0.5,  0.5,  1.0 ),
		vec4.fromValues(  0.5, -0.5,  0.5,  1.0 ),
		vec4.fromValues( -0.5, -0.5, -0.5,  1.0 ),
		vec4.fromValues( -0.5,  0.5, -0.5,  1.0 ),
		vec4.fromValues(  0.5,  0.5, -0.5,  1.0 ),
		vec4.fromValues(  0.5, -0.5, -0.5,  1.0 ), 
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
		vec4.fromValues( 0.0, 0.0, 0.0, 1.0 ),
		vec4.fromValues( 1.0, 0.0, 0.0, 1.0 ),
		vec4.fromValues( 1.0, 1.0, 0.0, 1.0 ),
		vec4.fromValues( 0.0, 1.0, 0.0, 1.0 ),
		vec4.fromValues( 0.0, 0.0, 1.0, 1.0 ),
		vec4.fromValues( 1.0, 0.0, 1.0, 1.0 ),
		vec4.fromValues( 0.0, 1.0, 1.0, 1.0 ),
		vec4.fromValues( 1.0, 1.0, 1.0, 1.0 )
	];

	var texCoord = [
		vec2.fromValues( 0, 0 ),
		vec2.fromValues( 0, 1 ),
		vec2.fromValues( 1, 1 ),
		vec2.fromValues( 1, 0 )
	];

	var texCoordID = [
		0, 1, 2, 0, 2, 3
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
		points.push( vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2], vertices[faces[i]][3] );
		var texid = texCoordID[ i%6 ];
		texCoords.push( texCoord[ texid ][0], texCoord[ texid ][1] );
		colors.push( vertexColors[Math.floor(i/6)][0], vertexColors[Math.floor(i/6)][1], vertexColors[Math.floor(i/6)][2], vertexColors[Math.floor(i/6)][3] );
	}
}

function configureTexture( image ){
	texture = gl.createTexture();
	
	gl.activeTexture( gl.TEXTURE0 );
	gl.bindTexture( gl.TEXTURE_2D, texture );
	gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
	gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image );	
	gl.generateMipmap( gl.TEXTURE_2D );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
}

window.onload = function initCube(){
	canvas = document.getElementById( "gl-canvas" );

	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	gl.enable( gl.DEPTH_TEST );

	// Load shaders and initialize attribute buffers
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	makeCube();

	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );

	var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var tBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( texCoords ), gl.STATIC_DRAW );

	var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
	gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vTexCoord );

	configureTexture( image2 );

	thetaLoc = gl.getUniformLocation( program, "theta" );
	document.getElementById( "ButtonX" ).onclick = function(){
		axis = xAxis;
	}

	document.getElementById( "ButtonY" ).onclick = function(){
		axis = yAxis;
	}

	document.getElementById( "ButtonZ" ).onclick = function(){
		axis = zAxis;
	}

	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	theta[ axis ] += 2.0;
	gl.uniform3fv( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLES, 0, points.length/4 );

	requestAnimFrame( render );
}