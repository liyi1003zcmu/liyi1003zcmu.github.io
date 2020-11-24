function init(){
    var obj = loadObjFile('http://localhost:8080/teapot.obj');
    var normals = computeNormals(obj.vertices, obj.faces);
}