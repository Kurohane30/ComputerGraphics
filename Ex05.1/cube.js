/**
 *
 * Define a wire frame cube with methods for drawing it.
 *
 * @param gl the webgl content
 * @param color the color of the cube
 * @returns object with draw method
 * @constructor
 **/

function WireFrameCube(gl){
    function defineVertices(gl){
        // define the vertices of the cube
        var vertices = [
            -1, 1, 1,
            -1, -1, 1,
            1, -1, 1,
            1, 1, 1,
            1, 1, -1,
            -1, 1, -1,
            -1, -1, -1,
            1, -1, -1
        ];

        var verticesColor = [
            // Top
            -1, 1, 1.0,
            1, 1, 1.0,
            1, 1, -1.0,
            -1, 1, -1.0,

            // Left
            -1, 1, 1.0,
            -1, -1, 1.0,
            -1, -1, -1.0,
            -1, 1, -1.0,

            // Right
            1, 1, 1.0,
            1, -1, 1.0,
            1, -1, -1.0,
            1, 1, -1.0,

            // Front
            -1,-1,1.0,
            1,-1,1.0,
            1,1,1.0,
            -1,1,1.0,

            // Back
            -1,1,-1.0,
            -1,-1,-1.0,
            1,-1,-1.0,
            1,1,-1.0,

            // Bottom
            -1, -1, 1.0,
            1, -1, 1.0,
            1, -1, -1.0,
            -1, -1, -1.0
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesColor), gl.STATIC_DRAW);
        return buffer;
    }

    function defineEdges(gl){
        // define the edges for the cube, there are 12 edges in a cube
        var vertexIndices = [
            //Front
            0,1,
            1,2,
            2,3,
            3,0,
            //Back
            4,5,
            5,6,
            6,7,
            7,4,
            //Lines in between
            0,5,
            1,6,
            2,7,
            3,4
        ];

        var vertexIndicesColor = [
            // Top
            0,1,
            1,3,
            3,0,
            1,2,
            2,3,

            // Left
            7,5,
            5,4,
            4,7,
            5,7,
            7,6,
            6,5,

            // Right
            8,9,
            9,11,
            11,8,
            9,10,
            10,11,
            11,9,

            // Front
            12,13,
            13,14,
            14,12,
            12,14,
            14,15,
            15,12,

            // Back
            16,18,
            18,17,
            17,16,
            19,18,
            18,16,
            19,18,

            // Bottom
            20,21,
            21,22,
            22,20,
            20,22,
            22,23,
            23,20
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndicesColor), gl.STATIC_DRAW);
        return buffer;
    }

    function defineColor(gl){
        var colorBuffer=[
            1,1,1,1,
            1,0,1,1,
            1,0,0,1,
            1,1,0,1,
            0,1,1,1,
            0,1,0,1,
            0,0,1,1,
            0,0,0,0,
            1,1,1,1,
            1,0,1,1,
            1,0,0,1,
            1,1,0,1
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(colorBuffer), gl.STATIC_DRAW);
    }
    return {
        bufferVertices: defineVertices(gl),
        bufferEdges: defineEdges(gl),
        bufferColor: defineColor(gl),
        draw: function(gl, aVertexPositionId, uColorId){
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            gl.vertexAttribPointer(uColorId, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(uColorId);

            /*
            gl.frontFace(gl.CCW);
            gl.cullFace(gl.BACK);
            gl.enable(gl.CULL_FACE);
*/
            // set uni-color
            //gl.uniform4f(uColorId, 0.0, 0.0, 0.0, 1.0);

            gl.drawElements(gl.TRIANGLE_FAN, 36/* Number of Indices */, gl.UNSIGNED_SHORT, 0);

        }
    }
}