"use strict";
const{vec2, vec4} = glMatrix;

var canvas;
var gl;
var program;

var points = [];
var colors = [];
var texCoords = [];

var texture;

var texSize = 64;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;
var theta = [ 45.0, 45.0, 45.0 ];
var thetaLoc;

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

function makeCube(){	
	for( var i = 0; i < faces.length; i++ ){
		points.push( vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2], vertices[faces[i]][3] );
		var texid = texCoordID[ i%6 ];
		texCoords.push( texCoord[ texid ][0], texCoord[ texid ][1] );
		colors.push( vertexColors[Math.floor(i/6)][0], vertexColors[Math.floor(i/6)][1], vertexColors[Math.floor(i/6)][2], vertexColors[Math.floor(i/6)][3] );
	}
}

function requestCORSIfNotSameOrigin(img, url) {
    if ((new URL(url, window.location.href)).origin !== window.location.origin) {
      img.crossOrigin = "";
    }
}

function configureTexture( url ){
	texture = gl.createTexture();
	gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA,  gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

    var image = new Image();
    image.onload = function(){
        gl.bindTexture( gl.TEXTURE_2D, texture );
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );

        if(isPowerOf2(image.width) && isPowerOf2(image.height)){
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
        }else{
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    };
    requestCORSIfNotSameOrigin(image, url);
    image.src = url;
	gl.uniform1i( gl.getUniformLocation( program, "texture" ), 0 );
}

function isPowerOf2( value ){
    return (value & (value - 1)) == 0;
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

	// initialize a texture
	var image = document.getElementById( "texImage" );
    var url = image.src;
    configureTexture( url );

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