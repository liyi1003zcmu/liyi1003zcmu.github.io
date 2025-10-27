"use strict";
 const {
     vec3,
     vec4,
     mat3,
     mat4
 } = glMatrix;


function Renderer( canvasName, vertSrc, fragSrc )
{
    // public members
    this.lightPosition = vec3.fromValues( 1.0, 1.0, 1.0);
    this.lightAmbient = vec3.fromValues( 0.2, 0.2, 0.2 );
    this.lightDiffuse = vec3.fromValues( 1.0, 1.0, 1.0 );
    this.lightSpecular = vec3.fromValues( 1.0, 1.0, 1.0 );

    this.materialAmbient = vec3.fromValues( 1.0, 0.0, 1.0 );
    this.materialDiffuse = vec3.fromValues( 1.0, 0.0, 0.0 );
    this.materialSpecular = vec3.fromValues( 1.0, 1.0, 1.0 );
    this.materialShininess = 20.0;

    this.clearColor = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );

    // private members

    var shadeMode = 1; // shader mode

    var canvas;
    var gl;

    // starting points for building sphere
    var va = vec4.fromValues(0.0, 0.0, -1.0, 1);
    var vb = vec4.fromValues(0.0, 0.942809, 0.333333, 1);
    var vc = vec4.fromValues(-0.816497, -0.471405, 0.333333, 1);
    var vd = vec4.fromValues(0.816497, -0.471405, 0.333333, 1);

    // view and projection parameters
    var near = -10.0;
    var far = 10.0;
    var radius = 1.5; 
    var theta = 0.0;
    var phi = 0.0;
    var stept = 1.0; // theta step

    var dxt = 0.0;
    var dyt = 0.0;
    var dzt = 0.0;

    var dxm = 0.0;
    var dym = 0.0;
    var dzm = 0.0;
    var stepm = 0.1;

    var left = -3.0;
    var right = 3.0;
    var ytop = 3.0;
    var ybottom = -3.0;

    var eye = vec3.create();
    var at = vec3.fromValues( 0.0, 0.0, 0.0 );
    var up = vec3.fromValues( 0.0, 1.0, 0.0 );

    // vertex points, normals, indices for rendering
    var points = [];
    var normals = [];
    var index = 0;

    // sphere subdivides
    var numOfSubdivides = 2;

    // shader programs
    var progID = 0;
    var vertID = 0;
    var fragID = 0;
    var vertSrc = vertSrc;
    var fragSrc = fragSrc;

    var vertexLoc = 0;
    var normalLoc = 0;

    // uniform loc for shader
    var ambientColorLoc = 0;
    var diffuseColorLoc = 0;
    var specularColorLoc = 0;

    // matrix loc for shader
    var modelViewMatrix = mat4.create();
    var projectionMatrix = mat4.create();
    var modelViewMatrixLoc = 0;
    var projectionMatrixLoc = 0;

    // light loc for shader
    var lightPositionLoc = 0;
    var shininessLoc = 0;

    // normal mat for shader
    var normalMatrix = mat3.create();
    var normalMatrixLoc = 0;

    // key event
    var currentKey = [];

    this.init = function(){
        this.canvas = document.getElementById( canvasName );
        gl = WebGLUtils.setupWebGL(this.canvas);
        if (!gl) {
            alert("WebGL isn't available");
        }

        gl.clearColor( this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3] );
        gl.enable( gl.DEPTH_TEST );

        initSphere();

        initShaders();

        initShaderBuffers();

        initInterface();
    }

    function initInterface(){
        document.onkeydown = function(event){            
            var key = event.keyCode;
            currentKey[key] = true;
            switch (key) {
                case 65: //left//a
                    dxt -= stept;
                    break;
                case 68: // right//d
                    dxt += stept;
                    break;
                case 87: // up//w
                    dyt += stept;
                    break;
                case 83: // down//s
                    dyt -= stept;
                    break;
                case 90: // a//z
                    dzt += stept;
                    break;
                case 88: // d//x
                    dzt -= stept;
                    break;
                case 72: // h//ytheta-
                    dxm -= stepm;
                    break;
                case 75: // k//ytheta+
                    dxm += stepm;
                    break;
                case 85: // u//xtheta+
                    dym += stepm;
                    break;
                case 74: // j//xtheta-
                    dym -= stepm;
                    break;
                case 78: // n//ztheta+
                    dzm -= stepm;
                    break;
                case 77: // m//ztheta-
                    dzm += stepm;
                    break;
                case 82: // r//reset
                    dxm = 0;
                    dym = 0;
                    dzm = 0;
                    dxt = 0;
                    dyt = 0;
                    dzt = 0;
                    break;
                case 86: // v //increase divide
                    numOfSubdivides++;
                    index = 0;
                    points = [];
                    normals = [];
                    initSphere();
                    initShaderBuffers();
                    break;
                case 66: // b  //decrease divide
                    if (numOfSubdivides > 0)
                        numOfSubdivides--;
                    index = 0;
                    points = [];
                    normals = [];
                    initSphere();
                    initShaderBuffers();
                    break;
                case 37: // left // theta--
                    theta += stept;
                    break;
                case 39: // right // theta++
                    theta -= stept;
                    break;
                case 38: // up // phi++
                    phi += stept;
                    break;
                case 40: // down // phi--
                    phi -= stept;
                    break;
            }
        };

        document.onkeyup = function (event) {
            currentKey[event.keyCode] = false;
        };

        document.getElementById("Button0").onclick = function () {
            radius *= 2.0;
        };
        document.getElementById("Button1").onclick = function () {
            radius *= 0.5;
        };
        document.getElementById("Button2").onclick = function () {
            theta += stept;
        };
        document.getElementById("Button3").onclick = function () {
            theta -= stept;
        };
        document.getElementById("Button4").onclick = function () {
            phi += stept;
        };
        document.getElementById("Button5").onclick = function () {
            phi -= stept;
        };

        document.getElementById("Button6").onclick = function () {
            numTimesToSubdivide++;
            index = 0;
            pointsArray = [];
            normalsArray = [];
        };
        document.getElementById("Button7").onclick = function () {
            if (numTimesToSubdivide) numTimesToSubdivide--;
            index = 0;
            pointsArray = [];
            normalsArray = [];
        };
    }
    function initSphere(){
        divideTetra( va, vb, vc, vd, numOfSubdivides );
    }

    function divideTetra( a, b, c, d, n ){
        divideTriangle( a, b, c, n );
        divideTriangle( d, c, b, n );
        divideTriangle( a, d, b, n );
        divideTriangle( a, c, d, n );
    }

    function divideTriangle( a, b, c, n ){
        if( n > 0 ){
            var ab = vec4.create();
            vec4.lerp( ab, a, b, 0.5 );
            var abt = vec3.fromValues( ab[0], ab[1], ab[2] );
            vec3.normalize( abt, abt );
            vec4.set( ab, abt[0], abt[1], abt[2], 1.0 );

            var bc = vec4.create();
            vec4.lerp(bc, b, c, 0.5);
            var bct = vec3.fromValues(bc[0], bc[1], bc[2]);
            vec3.normalize(bct, bct);
            vec4.set(bc, bct[0], bct[1], bct[2], 1.0);

            var ac = vec4.create();
            vec4.lerp(ac, a, c, 0.5);
            var act = vec3.fromValues(ac[0], ac[1], ac[2]);
            vec3.normalize(act, act);
            vec4.set(ac, act[0], act[1], act[2], 1.0);

            divideTriangle( a, ab, ac, n - 1 );
            divideTriangle( ab, b, bc, n - 1 );
            divideTriangle( bc, c, ac, n - 1 );
            divideTriangle( ab, bc, ac, n - 1 );
        }else{
            triangle( a, b, c );
        }
    }

    function triangle( a, b, c ){
        points.push(a[0], a[1], a[2]);
        points.push(b[0], b[1], b[2]);
        points.push(c[0], c[1], c[2]);

        switch (shadeMode) {
            case 1: // true normal for gouraud shading
                normals.push(a[0], a[1], a[2]);
                normals.push(b[0], b[1], b[2]);
                normals.push(c[0], c[1], c[2]);
                index += 3;
                break;
            case 2: // vertex normal for phong fragment shading
                var t1 = vec3.create();
                vec3.subtract(t1, b, a);
                var t2 = vec3.create();
                vec3.subtract(t2, c, a);

                var n = vec3.create();
                var n1 = vec3.create();
                vec3.cross(n1, vec3.fromValues(t1[0], t1[1], t1[2]), vec3.fromValues(t2[0], t2[1], t2[3]));
                vec3.normalize(n1, n1);
                vec3.set(n, n1[0], n1[1], n1[2]);

                normals.push(n[0], n[1], n[2]);
                normals.push(n[0], n[1], n[2]);
                normals.push(n[0], n[1], n[2]);
                index += 3;
                break;
            default:
                break;
        }
        index += 3;
    }

    function initShaders(){
        // create shaders
        vertID = gl.createShader( gl.VERTEX_SHADER );
        fragID = gl.createShader( gl.FRAGMENT_SHADER );
        
        // specify shader source
        gl.shaderSource( vertID, vertSrc );
        gl.shaderSource( fragID, fragSrc );

        // compile  shader
        gl.compileShader( vertID );
        gl.compileShader( fragID );

        var error = false;
        if( !gl.getShaderParameter( vertID, gl.COMPILE_STATUS ) ){
            document.getElementById( "code_vert_error" ).innerHTML ="Invalid vertex shader: " + gl.getShaderInfoLog( vertID );
            error = true;
        }else{
            document.getElementById( "code_vert_error" ).innerHTML = "";
        }

        if( !gl.getShaderParameter( fragID, gl.COMPILE_STATUS ) ){
            document.getElementById( "code_frag_error" ).innerHTML = "Invalid  fragment shader: " + gl.getShaderInfoLog( fragID );
            error = true;
        }else{
            document.getElementById( "code_frag_error" ).innerHTML = "";
        }

        if( error )
            return;

        // create program and attach shaders
        progID = gl.createProgram();
        gl.attachShader( progID, vertID );
        gl.attachShader( progID, fragID );

        // link the program
        gl.linkProgram( progID );
        if( !gl.getProgramParameter( progID, gl.LINK_STATUS ) ){
            alert( gl.getProgramInfoLog( progID ) );
            return;
        }

        gl.useProgram( progID );

        // initialize program memory data exchange
        
        // location for in variables of the vertex shader
        vertexLoc = gl.getAttribLocation( progID, "vPosition" );
        normalLoc = gl.getAttribLocation( progID, "vNormal" );

        ambientColorLoc = gl.getUniformLocation( progID, "ambientColor" );
        diffuseColorLoc = gl.getUniformLocation( progID, "diffuseColor" );
        specularColorLoc = gl.getUniformLocation( progID, "specularColor" );

        modelViewMatrixLoc = gl.getUniformLocation( progID, "modelViewMat" );
        projectionMatrixLoc = gl.getUniformLocation( progID, "pojectionMat" );
        normalMatrixLoc = gl.getUniformLocation( progID, "normalMat" );

        lightPositionLoc = gl.getUniformLocation( progID, "lightPos" );
        shininessLoc = gl.getUniformLocation( progID, "shininess" );
    }

    this.updateShader = function( newVertSrc, newFragSrc ){
        vertSrc = newVertSrc;
        fragSrc = newFragSrc;

        gl.deleteProgram( progID );
        gl.deleteShader( vertID );
        gl.deleteShader( fragID );

        initShaders();
    }

    function initShaderBuffers(){
        var vBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

        gl.vertexAttribPointer( vertexLoc, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vertexLoc );

        var nBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( normals ), gl.STATIC_DRAW );

        gl.vertexAttribPointer( normalLoc, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( normalLoc );
    }

    this.display = function(){
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        vec3.set(eye, radius * Math.sin(theta * Math.PI / 180.0) * Math.cos(phi * Math.PI / 180.0), radius * Math.sin(theta * Math.PI / 180.0) * Math.sin(phi * Math.PI / 180.0), radius * Math.cos(theta * Math.PI / 180.0));

        mat4.lookAt( modelViewMatrix, eye, at, up );
        mat4.ortho( projectionMatrix, left, right, ybottom, ytop, near, far );

        mat3.normalFromMat4( normalMatrix, modelViewMatrix );

        var ambientProd = vec3.create();
        vec3.multiply( ambientProd, this.lightAmbient, this.materialAmbient );

        var diffuseProd = vec3.create();
        vec3.multiply( diffuseProd, this.lightDiffuse, this.materialDiffuse );

        var specularProd = vec3.create();
        vec3.multiply( specularProd, this.lightSpecular, this.materialSpecular );

        gl.uniform3fv( ambientColorLoc, new Float32Array( ambientProd ) );
        gl.uniform3fv( diffuseColorLoc, new Float32Array( diffuseProd ) );
        gl.uniform3fv( specularColorLoc, new Float32Array( specularProd ) );

        gl.uniform3fv( lightPositionLoc, new Float32Array( this.lightPosition ) );

        gl.uniform1f( shininessLoc, this.materialShininess );

        gl.uniformMatrix4fv( modelViewMatrixLoc, false, new Float32Array( modelViewMatrix ) );
        gl.uniformMatrix4fv( projectionMatrixLoc, false, new Float32Array( projectionMatrix ) );
        gl.uniformMatrix3fv( normalMatrixLoc, false, new Float32Array( normalMatrix ) );

        gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
    }
}