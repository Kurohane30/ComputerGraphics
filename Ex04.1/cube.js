/**
 *
 * Define a wire frame cube with methods for drawing it.
 *
 * @param gl the webgl content
 * @param color the color of the cube
 * @returns object with draw method
 * @constructor
 **/

function WireFrameCube(gl, color){
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
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
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
            1,2,
            2,3,
            0,3,

            // Left
            4,5,
            5,6,
            6,7,
            4,7,

            // Right
            8,9,
            9,10,
            10,11,
            8,11,

            // Front
            12,13,
            13,14,
            14,15,
            12,15,

            // Back
            16,17,
            17,18,
            18,19,
            16,19,

            // Bottom
            20,21,
            21,22,
            22, 23,
            20,23
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferEdges: defineEdges(gl),
        color: color,
        draw: function(gl, aVertexPositionId, aVertexColorId){
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);


            // set uni-color
            gl.uniform4f(aVertexColorId, 0.0, 0.0, 0.0, 1.0);

            gl.drawElements(gl.LINES, 24 /* Number of Indices */, gl.UNSIGNED_SHORT, 0);

        }
    }
}