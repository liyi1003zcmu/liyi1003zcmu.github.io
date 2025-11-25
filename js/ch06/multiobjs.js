const { vec3, vec4, mat3, mat4 } = glMatrix;

var gl;
var canvas;
var tetraprogram;
var cbprogram;

var tetrapoints = [];
var tetracolors = [];
var tvbuffer = null;
var tcbuffer = null;
var tvpositionLoc = null;
var tccolorLoc = null;

var cbpoints = [];
var cbcolors = [];
var cvbuffer = [];
var ccbuffer = [];
var cvpositionLoc = null;
var cccolorLoc = null;

var numTimesToSubdivide = 2;

window.onload = function init(){
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL(canvas);
    if(!gl){
        alert("WebGL isn't available");
    }
    gl.enable(gl.DEPTH_TEST);

    var vertices = [
        0.0000, 0.0000, -1.0000,
        0.0000, 0.9428, 0.3333,
        -0.8165, -0.4714, 0.3333,
        0.8165, -0.4714, 0.3333
    ];
    var t = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
    var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
    var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
    var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );

 
    buildTetra(t, u, v, w, 0);
    buildCube();

    tetraprogram = initShaders( gl, "tetra-vshader", "tetra-fshader" ); 
    cbprogram = initShaders( gl, "rt-vshader", "rt-fshader" );
    
    tvbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tvbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tetrapoints), gl.STATIC_DRAW);

    tvpositionLoc = gl.getAttribLocation(tetraprogram, "vPosition");
    gl.vertexAttribPointer(tvpositionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(tvpositionLoc);

    tcbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tcbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tetracolors), gl.STATIC_DRAW);

    tccolorLoc = gl.getAttribLocation(tetraprogram, "vColor");
    gl.vertexAttribPointer(tccolorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(tccolorLoc);

    cvbuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, cvbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cbpoints), gl.STATIC_DRAW);
    
    cvpositionLoc = gl.getAttribLocation(cbprogram, "vPosition");
    gl.vertexAttribPointer(cvpositionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(cvpositionLoc);

    ccbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ccbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cbcolors), gl.STATIC_DRAW);

    cccolorLoc = gl.getAttribLocation(cbprogram, "vColor");
    gl.vertexAttribPointer(cccolorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(cccolorLoc);

    render();
}

function triangle(a, b, c, color) {
    // add colors and vertices for one triangle
    var baseColor = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 
        0.0, 0.0, 0.0, 1.0
    ];

    var colorid = color*4;
    
    tetracolors.push(baseColor[colorid], baseColor[colorid+1], baseColor[colorid+2], baseColor[colorid+3]);
    tetrapoints.push(a[0],a[1],a[2]);
    tetracolors.push(baseColor[colorid], baseColor[colorid+1], baseColor[colorid+2], baseColor[colorid+3]);
    tetrapoints.push(b[0],b[1],b[2]);
    tetracolors.push(baseColor[colorid], baseColor[colorid+1], baseColor[colorid+2], baseColor[colorid+3]);
    tetrapoints.push(c[0],c[1],c[2]);
}

function tetra(a, b, c, d) {
    triangle(a, c, b, 0);
    triangle(a, c, d, 1);
    triangle(a, b, d, 2);
    triangle(b, c, d, 3);
}

function buildTetra(a, b, c, d, count) {
    // check for end of recursion
    if (count == 0) {
        tetra(a, b, c, d);
    } else {
        var ab = vec3.create();
        glMatrix.vec3.lerp(ab, a, b, 0.5);
        var ac = vec3.create();
        glMatrix.vec3.lerp(ac, a, c, 0.5);
        var ad = vec3.create();
        glMatrix.vec3.lerp(ad, a, d, 0.5);
        var bc = vec3.create();
        glMatrix.vec3.lerp(bc, b, c, 0.5);
        var bd = vec3.create();
        glMatrix.vec3.lerp(bd, b, d, 0.5);
        var cd = vec3.create();
        glMatrix.vec3.lerp(cd, c, d, 0.5);

        buildTetra(a, ab, ac, ad, count-1);
        buildTetra(ab, b, bc, bd, count-1);
        buildTetra(ac, bc, c, cd, count-1);
        buildTetra(ad, bd, cd, d, count-1);
    }
}

function buildCube() {
    var vertices = [
        vec4.fromValues(-0.5, -0.5, 0.5, 1.0),
        vec4.fromValues(-0.5, 0.5, 0.5, 1.0),
        vec4.fromValues(0.5, 0.5, 0.5, 1.0),
        vec4.fromValues(0.5, -0.5, 0.5, 1.0),
        vec4.fromValues(-0.5, -0.5, -0.5, 1.0),
        vec4.fromValues(-0.5, 0.5, -0.5, 1.0),
        vec4.fromValues(0.5, 0.5, -0.5, 1.0),
        vec4.fromValues(0.5, -0.5, -0.5, 1.0),
    ];

    var vertexColors = [
        vec4.fromValues(0.0, 0.0, 0.0, 1.0),
        vec4.fromValues(1.0, 0.0, 0.0, 1.0),
        vec4.fromValues(1.0, 1.0, 0.0, 1.0),
        vec4.fromValues(0.0, 1.0, 0.0, 1.0),
        vec4.fromValues(0.0, 0.0, 1.0, 1.0),
        vec4.fromValues(1.0, 0.0, 1.0, 1.0),
        vec4.fromValues(0.0, 1.0, 1.0, 1.0),
        vec4.fromValues(1.0, 1.0, 1.0, 1.0)
    ];

    var faces = [
        1, 0, 3, 1, 3, 2, //正
        2, 3, 7, 2, 7, 6, //右
        3, 0, 4, 3, 4, 7, //底
        6, 5, 1, 6, 1, 2, //顶
        4, 5, 6, 4, 6, 7, //背
        5, 4, 0, 5, 0, 1  //左
    ];

    for (var i = 0; i < faces.length; i++) {
        cbpoints.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2]);
        cbcolors.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
    }
}

var eye = vec3.fromValues(0, 0, 2);
var at = vec3.fromValues(0, 0, 0);
var up = vec3.fromValues(0, 1, 0);
var modelViewMatrix = mat4.create();
var projectionMatrix = mat4.create();
var matrixStack = [];

var tetradyt = 0;
var cbtheta = vec3.fromValues(0.0, 0.0, 0.0);
function render(){
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    mat4.ortho(projectionMatrix, -3.0, 3.0, -3.0, 3.0, 3.0, -3.0);
    mat4.lookAt(modelViewMatrix, eye, at, up);
    var tetramodelView = mat4.create();
    tetramodelView = mat4.clone(modelViewMatrix);

    mat4.translate(tetramodelView, tetramodelView, vec3.fromValues(-1.0, 0, 0));
    mat4.rotateY(tetramodelView, tetramodelView, tetradyt*Math.PI/180.0);

    var cbmodelView = mat4.create();
    cbmodelView = mat4.clone(modelViewMatrix);
    mat4.translate(cbmodelView, cbmodelView, vec3.fromValues(1.5, 0, 0));
    
    tetradyt += 0.5;
    if(tetradyt > 360.0)
        tetradyt -= 360.0;
    cbtheta[0] += 0.5;
    if(cbtheta[0] > 360.0)
        cbtheta[0] -= 360.0;
    
    gl.useProgram(tetraprogram);
    gl.bindBuffer(gl.ARRAY_BUFFER, tcbuffer);
    //gl.enableVertexAttribArray(tccolorLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, tvbuffer);
    //gl.enableVertexAttribArray(tvpositionLoc);
    gl.uniformMatrix4fv(gl.getUniformLocation(tetraprogram,"modelViewMatrix"), false, new Float32Array(tetramodelView));
    gl.uniformMatrix4fv(gl.getUniformLocation(tetraprogram, "projectionMatrix"), false, new Float32Array(projectionMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, tetrapoints.length / 3);
    //gl.disableVertexAttribArray(tvpositionLoc);
    //gl.disableVertexAttribArray(tccolorLoc);
    

    gl.useProgram(cbprogram);
    gl.bindBuffer(gl.ARRAY_BUFFER, ccbuffer);
    //gl.enableVertexAttribArray(cccolorLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, cvbuffer);
    //gl.enableVertexAttribArray(cvpositionLoc);
    gl.uniformMatrix4fv(gl.getUniformLocation(cbprogram, "projectionMatrix"), false, new Float32Array(projectionMatrix));
    gl.uniform3fv(gl.getUniformLocation(cbprogram,"theta"),cbtheta);
    gl.drawArrays(gl.TRIANGLES, 0, cbpoints.length / 3);
    //gl.disableVertexAttribArray(cvpositionLoc);
    //gl.disableVertexAttribArray(cccolorLoc);

    requestAnimationFrame(render);
}
