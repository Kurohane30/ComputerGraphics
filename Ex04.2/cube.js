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
            -0.5,0,0,
            0.5,0,0,
            0.5,0.5,0,
            -0.5,0.5,0
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineEdges(gl){
        // define the edges for the cube, there are 12 edges in a cube
        var vertexIndices = [
            0,1,
            1,2,
            2,3,
            0,3
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

            gl.drawElements(gl.LINES, 8 /* Number of Indices */, gl.UNSIGNED_SHORT, 0);

        }
    }
}