//
// Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;

// we keep all local parameters for the program in a single object
var ctx = {
    shaderProgram: -1,
    aVertexPositionId: -1,
    uColorId: -1,
    mWorldId: -1,
    mViewId: -1,
    mProjId: -1
};

var wiredCube;
/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();
    gl.clearColor(0,0,0,0.8);

    // add more necessary commands here
}

function setUpBuffers() {

    wiredCube = new WireFrameCube(gl, [1.0, 1.0, 1.0, 1.0]);

}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    // finds the index of the variable in the program
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");
    ctx.mWorldId = gl.getUniformLocation(ctx.shaderProgram, "mWorld");
    ctx.mViewId = gl.getUniformLocation(ctx.shaderProgram, "mView");
    ctx.mProjId = gl.getUniformLocation(ctx.shaderProgram, "mProj");
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    var worldMatrix = mat4.create();
    var modelView = mat4.create();
    var projectionMat = mat4.create();


    mat4.identity(worldMatrix);
    mat4.ortho(projectionMat, -2, 2, -2, 2, 0.1, 100);

    mat4.lookAt(modelView, [2,4,-8],[0,0,0],[0,1,0]);

    gl.uniformMatrix4fv(ctx.mWorldId, false, worldMatrix);
    gl.uniformMatrix4fv(ctx.mViewId, false, modelView);
    gl.uniformMatrix4fv(ctx.mProjId, false, projectionMat);

    // add drawing routines here
    wiredCube.draw(gl, ctx.aVertexPositionId, ctx.uColorID);


}