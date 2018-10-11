//
// DI Computer Graphics
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
    uProjectionMatId: -1,
    uModelMatId: -1
};

// we keep all the parameters for drawing a specific object together
var rectangleObject = {
    buffer: -1
};


/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    window.addEventListener('keyup', onKeyup, false);
    window.addEventListener('keydown', onKeydown, false);
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
    
    gl.clearColor(0.1, 0.1, 0.1, 1);
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat"); // Für 3D in 2D
    ctx.uModelMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelMat"); // Für transformation
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
    "use strict";
    rectangleObject.buffer = gl.createBuffer();
    var vertices = [
        -0.5, -0.5, 1,
        0.5, -0.5, 1,
        0.5, 0.5, 1,
        -0.5, 0.5, 1];
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);

    gl.uniform4f(ctx.uColorId, 1, 1, 1, 1);

    // Set up the world coordinates
    var projectMat = mat3.create();
    mat3.fromScaling(projectMat, [2.0/gl.drawingBufferWidth, 2.0/gl.drawingBufferHeight]);
    gl.uniformMatrix3fv(ctx.uProjectionMatId, false, projectMat);

    //Draw rectangle no.1
    var paddle1 = mat3.create();
    mat3.fromTranslation(paddle1, [380, 50]);
    mat3.scale(paddle1, paddle1, [10, 100]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, paddle1);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    // draw rectangle no.2
    var paddle2 = mat3.create();
    mat3.fromTranslation(paddle2, [-380, -150]);
    mat3.scale(paddle2, paddle2, [10, 100]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, paddle2);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    var playline = mat3.create();
    mat3.fromScaling(playline, [1, gl.drawingBufferHeight]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, playline);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    var ball = mat3.create();
    mat3.fromTranslation(ball, [280, 20]);
    mat3.scale(ball, ball, [10, 10]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, ball);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

// Key Handling
var key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

function isDown (keyCode) {
    return key._pressed[keyCode];
}

function onKeydown(event) {
    key._pressed[event.keyCode] = true;
}

function onKeyup(event) {
    delete key._pressed[event.keyCode];
}
