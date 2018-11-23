/**
 *
 * Define a wire frame cube with methods for drawing it.
 *
 * @param gl the webgl content
 * @param color the color of the cube
 * @returns object with draw method
 * @constructor
 **/

function WireFrameCube(gl, color) {
    function defineVertices(gl) {
        // define the vertices of the cube

        var vertices = [
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
            -1, -1, 1.0,
            1, -1, 1.0,
            1, 1, 1.0,
            -1, 1, 1.0,

            // Back
            -1, 1, -1.0,
            -1, -1, -1.0,
            1, -1, -1.0,
            1, 1, -1.0,

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

    function defineEdges(gl) {
        // define the edges for the cube, there are 12 edges in a cube
        var vertexIndices = [
            0, 1, 2, 0, 2, 3,    // vorne
            4, 5, 6, 4, 6, 7,    // hinten
            8, 9, 10, 8, 10, 11,   // oben
            12, 13, 14, 12, 14, 15,   // unten
            16, 17, 18, 16, 18, 19,   // rechts
            20, 21, 22, 20, 22, 23    // links
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineColor(gl) {
        var colors = [
            [1.0, 1.0, 1.0, 1.0],    // vordere Fläche: weiß
            [1.0, 0.0, 0.0, 1.0],    // hintere Fläche: rot
            [0.0, 1.0, 0.0, 1.0],    // obere Fläche: grün
            [0.0, 0.0, 1.0, 1.0],    // untere Fläche: blau
            [1.0, 1.0, 0.0, 1.0],    // rechte Fläche: gelb
            [1.0, 0.0, 1.0, 1.0]     // linke Fläche: violett
        ];

        var generatedColors = [];

        for (j = 0; j < 6; j++) {
            var c = colors[j];

            for (var i = 0; i < 4; i++) {
                generatedColors = generatedColors.concat(c);
            }
        }
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferEdges: defineEdges(gl),
        bufferColor: defineColor(gl),
        color: color,
        draw: function (gl, aVertexPositionId, aVertexColorId) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferColor);
            gl.vertexAttribPointer(aVertexColorId, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexColorId);

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.frontFace (gl.CCW);
            gl.cullFace(gl.BACK);
            gl.enable(gl.CULL_FACE);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferEdges);


            gl.drawElements(gl.TRIANGLES, 36 /* Number of Indices */, gl.UNSIGNED_SHORT, 0);

        }
    }
}