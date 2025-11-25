"use strict";

const{ vec2, vec4 } = glMatrix;

var canvas;
var gl;
var program;

var points = [];
var colors = [];
var texCoords = [];

var texSize = 256;
var numChecks = 64;

var texture1;
var texture2;

var c;

var image1 = new Uint8Array(4*texSize*texSize);

    for ( var i = 0; i < texSize; i++ ) {
        for ( var j = 0; j <texSize; j++ ) {
            // var patchx = Math.floor(i/(texSize/numChecks));
            // var patchy = Math.floor(j/(texSize/numChecks));
            // if(patchx%4 ^ patchy%4) c = 255;
            // else c = 0;
            c = 255*(((i & 0x20) == 0) ^ ((j & 0x20)  == 0))
            image1[4*i*texSize+4*j] = c;
            image1[4*i*texSize+4*j+1] = c;
            image1[4*i*texSize+4*j+2] = c;
            image1[4*i*texSize+4*j+3] = 255;
        }
    }

var image2 = new Uint8Array(4*texSize*texSize);

    // Create a checkerboard pattern
    for ( var i = 0; i < texSize; i++ ) {
        for ( var j = 0; j <texSize; j++ ) {
            image2[4*i*texSize+4*j] = 127+127*Math.sin(0.1*i*j);
            image2[4*i*texSize+4*j+1] = 127+127*Math.sin(0.1*i*j);
            image2[4*i*texSize+4*j+2] = 127+127*Math.sin(0.1*i*j);
            image2[4*i*texSize+4*j+3] = 255;
           }
    }

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;
var theta = [ 45.0, 45.0, 0.0 ];
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

function configureTexture(){
    texture1 = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture1 );
    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image1 );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    texture2= gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture2 );
    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image2 );
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

    configureTexture();

    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture1 );
    gl.uniform1i( gl.getUniformLocation( program, "texture1" ), 0 );

    gl.activeTexture( gl.TEXTURE1 );
    gl.bindTexture( gl.TEXTURE_2D, texture2 );
    gl.uniform1i( gl.getUniformLocation( program, "texture2" ), 1 );

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