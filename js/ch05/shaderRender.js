"use strict";

const{ vec3, vec4, mat3, mat4 } = glMatrix;

function Renderer( canvasName, vertSrc, fragSrc )
{
    var canvas;
    var gl;

    var near = 0.01;
    //var near = -200;
    var far = 200;
    var radius = 30.0;
    var theta = 45.0;
    var phi = 45.0;
    var stept =2;
    var stepm = 0.1;

    var fovy = 60.0 * Math.PI / 180.0;
    var left = -5.0;
    var right = 5.0;
    var ytop = 5.0;
    var ybottom = -5.0;

    var eye = vec3.create();
    var at = vec3.fromValues( 0.0, 0.0, 0.0 );
    var up = vec3.fromValues( 0.0, 1.0, 0.0 );

    var dtx = 0;
    var dty = 0;
    var dtz = 0;

    var sx = 1;
    var sy = 1;
    var sz = 1;

    var dx = 0;
    var dy = 0;
    var dz = 0;

    var progID = 0;
    var vertID = 0;
    var fragID = 0;
    var vertSrc = vertSrc;
    var fragSrc = fragSrc;

    var meshdata;
    var mesh;

    var vertexLoc = null;
    var normalLoc = null;

    var materialKaLoc = null;
    var materialKdLoc = null;
    var materialKsLoc = null;

    var ambientProdLoc = null;
    var diffuseProdLoc = null;
    var specularProdLoc = null;

    var modelViewMatrixLoc = null;
    var projectionMatrixLoc = null;
    var normalMatrixLoc = null;

    var lightPositionLoc = null;
    var shininessLoc = null;

    var iBuffer = null;
    var nBuffer = null;
    var useObjNormal = true;

    var points = [];
    var normals = [];

    var modeVal = 1;
    var colorMode = 1;
    this.modelFile = null;

    var lightPosition = vec4.create();
    var lightAmbient = vec4.create();
    var lightDiffuse = vec4.create();
    var lightSpecular = vec4.create();

    var mka = 1.0;
    var mkd = 1.0;
    var mks = 1.0;
    var mksh = 128;

    var materialAmbient = vec4.create();
    var materialDiffuse = vec4.create();
    var materialSpecular = vec4.create();
    var materialShininess = 1.0;

    var clearColor = vec4.fromValues( 0.0, 1.0, 1.0, 1.0 );

    var materialKa = 1.0;
    var materialKd = 1.0;
    var materialKs = 1.0;

    var modelViewMatrix = mat4.create();
    var projectionMatrix = mat4.create();
    var normalMatrix = mat3.create(); 

    this.init = function(){
        canvas = document.getElementById( canvasName );
        gl = WebGLUtils.setupWebGL(canvas);

        gl.clearColor( clearColor[0], clearColor[1], clearColor[2], clearColor[3] );
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.enable( gl.DEPTH_TEST );

        initInterface();

        setupShaders();

        initCoefficients();
    };

    function initInterface(){
        document.getElementById("slider-ka").addEventListener("input", function(event){
            var vka = event.target.value;
            materialKa = parseFloat(vka);
            document.getElementById("slider-ka-value").innerHTML = materialKa;
        });

        document.getElementById("slider-kd").addEventListener("input", function(event){
            var vkd = event.target.value;
            materialKd = parseFloat(vkd);
            document.getElementById("slider-kd-value").innerHTML = materialKd;
        });

        document.getElementById("slider-ks").addEventListener("input", function(event){
            var vks = event.target.value;
            materialKs = parseFloat(vks);
            document.getElementById("slider-ks-value").innerHTML = materialKs;
        });

        document.getElementById("slider-sh").addEventListener("input", function(event){
            var vksh = event.target.value;
            materialShininess = parseInt(vksh);
            document.getElementById("slider-sh-value").innerHTML = materialShininess;
        });

        document.getElementById("ka-color").addEventListener("input", function(event){
            var hexcolor = event.target.value.substring(1);
            var rgbHex = hexcolor.match(/.{1,2}/g);
            materialAmbient = vec4.fromValues(
                parseInt(rgbHex[0], 16) * 1.0 / 255.0,
                parseInt(rgbHex[1], 16) * 1.0 / 255.0,
                parseInt(rgbHex[2], 16) * 1.0 / 255.0,
                1.0
            );
        });

        document.getElementById("kd-color").addEventListener("input", function (event) {
            var hexcolor = event.target.value.substring(1);
            var rgbHex = hexcolor.match(/.{1,2}/g);
            materialDiffuse = vec4.fromValues(
                parseInt(rgbHex[0], 16) * 1.0 / 255.0,
                parseInt(rgbHex[1], 16) * 1.0 / 255.0,
                parseInt(rgbHex[2], 16) * 1.0 / 255.0,
                1.0
            );
        });

        document.getElementById("ks-color").addEventListener("input", function (event) {
            var hexcolor = event.target.value.substring(1);
            var rgbHex = hexcolor.match(/.{1,2}/g);
            materialSpecular = vec4.fromValues(
                parseInt(rgbHex[0], 16) * 1.0 / 255.0,
                parseInt(rgbHex[1], 16) * 1.0 / 255.0,
                parseInt(rgbHex[2], 16) * 1.0 / 255.0,
                1.0
            );
        });

        document.getElementById("bk-color").addEventListener("input", function (event) {
            //var hexcolor = document.getElementById("bk-color").value.substring(1);
            var hexcolor = event.target.value.substring(1);
            var rgbHex = hexcolor.match(/.{1,2}/g);
            clearColor = vec4.fromValues(
                parseInt(rgbHex[0], 16) * 1.0 / 255.0,
                parseInt(rgbHex[1], 16) * 1.0 / 255.0,
                parseInt(rgbHex[2], 16) * 1.0 / 255.0,
                1.0
            );
        });

        document.getElementById("lt-ambient-color").addEventListener("input", function(event){
            var hexcolor = event.target.value.substring(1);
            var rgbHex = hexcolor.match(/.{1,2}/g);
            lightAmbient = vec4.fromValues(
                parseInt(rgbHex[0], 16) * 1.0 / 255.0,
                parseInt(rgbHex[1], 16) * 1.0 / 255.0,
                parseInt(rgbHex[2], 16) * 1.0 / 255.0,
                1.0
            );
        });

        document.getElementById("lt-diffuse-color").addEventListener("input", function (event) {
            var hexcolor = event.target.value.substring(1);
            var rgbHex = hexcolor.match(/.{1,2}/g);
            lightDiffuse = vec4.fromValues(
                parseInt(rgbHex[0], 16) * 1.0 / 255.0,
                parseInt(rgbHex[1], 16) * 1.0 / 255.0,
                parseInt(rgbHex[2], 16) * 1.0 / 255.0,
                1.0
            );
        });

        document.getElementById("lt-specular-color").addEventListener("input", function (event) {
            var hexcolor = event.target.value.substring(1);
            var rgbHex = hexcolor.match(/.{1,2}/g);
            lightSpecular = vec4.fromValues(
                parseInt(rgbHex[0], 16) * 1.0 / 255.0,
                parseInt(rgbHex[1], 16) * 1.0 / 255.0,
                parseInt(rgbHex[2], 16) * 1.0 / 255.0,
                1.0
            );
        });

        document.getElementById("slider-x").addEventListener("input", function(event){
            var lx = parseFloat(event.target.value);
            lightPosition[0] = lx;
            document.getElementById("slider-x-value").innerHTML = lx;
        });

        document.getElementById("slider-y").addEventListener("input", function (event) {
            var ly = parseFloat(event.target.value);
            lightPosition[1] = ly;
            document.getElementById("slider-y-value").innerHTML = ly;
        });

        document.getElementById("slider-z").addEventListener("input", function (event) {
            var lz = parseFloat(event.target.value);
            lightPosition[2] = lz;
            document.getElementById("slider-z-value").innerHTML = lz;
        });

        document.getElementById("slider-radius").addEventListener("input", function(event){
            var r = parseFloat(event.target.value);
            radius = r;
            document.getElementById("slider-radius-value").innerHTML = r;
        });

        document.getElementById("slider-theta").addEventListener("input", function (event) {
            var t = parseFloat(event.target.value);
            theta = t;
            document.getElementById("slider-theta-value").innerHTML = t;
        });

        document.getElementById("slider-phi").addEventListener("input", function (event) {
            var p = parseFloat(event.target.value);
            phi = p;
            document.getElementById("slider-phi-value").innerHTML = p;
        });
    }

    function setupShaders(){
        // create shader
        vertID = gl.createShader(gl.VERTEX_SHADER);
        fragID = gl.createShader(gl.FRAGMENT_SHADER);

        // specify shader source
        gl.shaderSource(vertID, vertSrc);
        gl.shaderSource(fragID, fragSrc);

        // compile shader
        gl.compileShader(vertID);
        gl.compileShader(fragID);

        var error = false;
        if (!gl.getShaderParameter(vertID, gl.COMPILE_STATUS)) {
            document.getElementById("code_vert_error").innerHTML = "invalid vertex shader: " + gl.getShaderInfoLog(vertID);
            error = true;
        } else {
            document.getElementById("code_vert_error").innerHTML = "";
        }

        if (!gl.getShaderParameter(fragID, gl.COMPILE_STATUS)) {
            document.getElementById("code_frag_error").innerHTML = "invalid fragment shader: " + gl.getShaderInfoLog(fragID);
            error = true;
        } else {
            document.getElementById("code_frag_error").innerHTML = "";
        }

        if (error)
            return;

        // create program and attach shaders
        progID = gl.createProgram();
        gl.attachShader(progID, vertID);
        gl.attachShader(progID, fragID);

        // link the program
        gl.linkProgram(progID);
        if (!gl.getProgramParameter(progID, gl.LINK_STATUS)) {
            alert(gl.getProgramInfoLog(progID));
            return;
        }

        gl.useProgram( progID );

        vertexLoc = gl.getAttribLocation(progID, "vPosition");
        normalLoc = gl.getAttribLocation(progID, "vNormal");

        // retrieve the location of the uniform variables of the shader
        ambientProdLoc = gl.getUniformLocation(progID, "ambientProduct");
        diffuseProdLoc = gl.getUniformLocation(progID, "diffuseProduct");
        specularProdLoc = gl.getUniformLocation(progID, "specularProduct");

        modelViewMatrixLoc = gl.getUniformLocation(progID, "modelViewMatrix");
        projectionMatrixLoc = gl.getUniformLocation(progID, "projectionMatrix");
        normalMatrixLoc = gl.getUniformLocation(progID, "normalMatrix");

        lightPositionLoc = gl.getUniformLocation(progID, "lightPosition");
        shininessLoc = gl.getUniformLocation(progID, "shininess");

        materialKaLoc = gl.getUniformLocation(progID, "materialKa");
        materialKdLoc = gl.getUniformLocation(progID, "materialKd");
        materialKsLoc = gl.getUniformLocation(progID, "materialKs");
    }

    this.updateShader = function (newVertSrc, newFragSrc) {
        vertSrc = newVertSrc;
        fragSrc = newFragSrc;

        gl.deleteProgram(progID);
        gl.deleteShader(vertID);
        gl.deleteShader(fragID);

        setupShaders();
    }

    function initCoefficients() {
        // modeVal: use vert and frag shadders
        var d = parseInt( document.getElementById("select_shader_id").value );
        modeVal = d;

        // colorMode: ambient + diffuse + specular
        d = parseInt( document.getElementById( "select_color_id" ).value );
        colorMode = d;

        // material
        var mka = parseFloat( document.getElementById("slider-ka").value );
        materialKa = mka;

        var mkd = parseFloat( document.getElementById( "slider-kd" ).value );
        materialKd = mkd;

        var mks = parseFloat( document.getElementById( "slider-ks" ).value );
        materialKs = mks;

        materialShininess = parseInt( document.getElementById( "slider-sh" ).value );

        // set material color
        var ambhexcolor = document.getElementById( "ka-color" ).value.substring(1).match(/.{1,2}/g);
        materialAmbient = vec4.fromValues(
            parseInt(ambhexcolor[0], 16) * 1.0 / 255.0,
            parseInt(ambhexcolor[1], 16) * 1.0 / 255.0,
            parseInt(ambhexcolor[2], 16) * 1.0 / 255.0,
            1.0
        );

        var difhexcolor = document.getElementById( "kd-color" ).value.substring(1).match(/.{1,2}/g);
        materialDiffuse = vec4.fromValues(
            parseInt(difhexcolor[0], 16) * 1.0 / 255.0,
            parseInt(difhexcolor[1], 16) * 1.0 / 255.0,
            parseInt(difhexcolor[2], 16) * 1.0 / 255.0,
            1.0
        );

        var spehexcolor = document.getElementById( "ks-color" ).value.substring(1).match(/.{1,2}/g);
        materialSpecular = vec4.fromValues(
            parseInt(spehexcolor[0], 16) * 1.0 / 255.0,
            parseInt(spehexcolor[1], 16) * 1.0 / 255.0,
            parseInt(spehexcolor[2], 16) * 1.0 / 255.0,
            1.0
        );

        var ltx = parseFloat( document.getElementById( "slider-x" ).value );
        var lty = parseFloat( document.getElementById( "slider-y" ).value );
        var ltz = parseFloat( document.getElementById( "slider-z" ).value );
        lightPosition = vec4.fromValues( ltx, lty, ltz, 1.0 );

        // set light color
        var lambhexcolor = document.getElementById("lt-ambient-color").value.substring(1).match(/.{1,2}/g);
        lightAmbient = vec4.fromValues(
            parseInt(lambhexcolor[0], 16) * 1.0 / 255.0,
            parseInt(lambhexcolor[1], 16) * 1.0 / 255.0,
            parseInt(lambhexcolor[2], 16) * 1.0 / 255.0,
            1.0
        );

        var ldifhexcolor = document.getElementById("lt-diffuse-color").value.substring(1).match(/.{1,2}/g);
        lightDiffuse = vec4.fromValues(
            parseInt(ldifhexcolor[0], 16) * 1.0 / 255.0,
            parseInt(ldifhexcolor[1], 16) * 1.0 / 255.0,
            parseInt(ldifhexcolor[2], 16) * 1.0 / 255.0,
            1.0
        );

        var lspehexcolor = document.getElementById("lt-specular-color").value.substring(1).match(/.{1,2}/g);
        lightSpecular = vec4.fromValues(
            parseInt(lspehexcolor[0], 16) * 1.0 / 255.0,
            parseInt(lspehexcolor[1], 16) * 1.0 / 255.0,
            parseInt(lspehexcolor[2], 16) * 1.0 / 255.0,
            1.0
        );

        var cchexcolor = document.getElementById("bk-color").value.substring(1).match(/.{1,2}/g);
        clearColor = vec4.fromValues(
            parseInt(cchexcolor[0], 16) * 1.0 / 255.0,
            parseInt(cchexcolor[1], 16) * 1.0 / 255.0,
            parseInt(cchexcolor[2], 16) * 1.0 / 255.0,
            1.0
        );
        radius = parseFloat( document.getElementById("slider-radius").value);
        theta = parseFloat( document.getElementById("slider-theta").value);
        phi = parseFloat( document.getElementById("slider-phi").value);
    }

    this.initModel = function(){
        if( this.modelFile == null )
            return;
        
        var reader = new FileReader();
        reader.onload = function (event){
            meshdata = reader.result;
            initObj();
        }
        reader.readAsText( this.modelFile );
    }

    function initObj(){
        mesh = new OBJ.Mesh(meshdata);
        // mesh.normalBuffer, mesh.textureBuffer, mesh.vertexBuffer, mesh.indexBuffer
        OBJ.initMeshBuffers(gl, mesh);

        // init object vertices
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);

        gl.vertexAttribPointer(vertexLoc, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexLoc);
    
        gl.bindBuffer( gl.ARRAY_BUFFER, mesh.normalBuffer);

        gl.vertexAttribPointer(normalLoc, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray(normalLoc);
        useObjNormal = true;

        dx = -1.0 * (parseFloat(mesh.xmax) + parseFloat(mesh.xmin))/2.0;
        dy = -1.0 * (parseFloat(mesh.ymax) + parseFloat(mesh.ymin))/2.0;
        dz = -1.0 * (parseFloat(mesh.zmax) + parseFloat(mesh.zmin))/2.0;

        var maxScale;
        var scalex = Math.abs(parseFloat(mesh.xmax)-parseFloat(mesh.xmin));
        var scaley = Math.abs(parseFloat(mesh.ymax)-parseFloat(mesh.ymin));
        var scalez = Math.abs(parseFloat(mesh.zmax)-parseFloat(mesh.zmin));

        maxScale = Math.max(scalex, scaley, scalez);

        sx = 2.0/maxScale;
        sy = 2.0/maxScale;
        sz = 2.0/maxScale;

        dx = 0;
        dy = 0;
        dz = 0;
    }

    this.display = function () {
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        
        var ambientProduct = vec4.create();
        vec4.multiply(ambientProduct, lightAmbient, materialAmbient);

        var diffuseProduct = vec4.create();
        vec4.multiply(diffuseProduct, lightDiffuse, materialDiffuse);

        var specularProduct = vec4.create();
        vec4.multiply(specularProduct, lightSpecular, materialSpecular);

        vec3.set(eye, radius * Math.sin(theta * Math.PI / 180.0) * Math.cos(phi * Math.PI / 180.0),
           radius * Math.sin(theta * Math.PI / 180.0) * Math.sin(phi * Math.PI / 180.0),
           radius * Math.cos(theta * Math.PI / 180.0));    

        mat4.lookAt(modelViewMatrix, eye, at, up);
        //mat4.ortho(projectionMatrix, left, right, ybottom, ytop, near, far);

        mat4.scale( modelViewMatrix, modelViewMatrix, vec3.fromValues(sx, sy, sz));
        mat4.rotateY( modelViewMatrix, modelViewMatrix, dty * Math.PI / 180.0 );
        dty = (dty + stept) % 360;

        var aspect = 1;
        mat4.perspective(projectionMatrix, fovy, aspect, near, far);

        mat3.fromMat4(normalMatrix, modelViewMatrix);

        gl.uniform4fv(ambientProdLoc, new Float32Array(ambientProduct));
        gl.uniform4fv(diffuseProdLoc, new Float32Array(diffuseProduct));
        gl.uniform4fv(specularProdLoc, new Float32Array(specularProduct));
        gl.uniform4fv(lightPositionLoc, new Float32Array(lightPosition));
        gl.uniform1f(shininessLoc, materialShininess);
        gl.uniform1f(materialKaLoc, materialKa);
        gl.uniform1f(materialKdLoc, materialKd);
        gl.uniform1f(materialKsLoc, materialKs);

        gl.uniformMatrix4fv(modelViewMatrixLoc, false, new Float32Array(modelViewMatrix));
        gl.uniformMatrix4fv(projectionMatrixLoc, false, new Float32Array(projectionMatrix));
        gl.uniformMatrix3fv(normalMatrixLoc, false, new Float32Array(normalMatrix));

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
}