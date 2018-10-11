attribute vec3 aVertexPosition;
uniform mat3 uProjectionMat;
uniform mat3 uModelMat;

void main() {
    vec3 position = uProjectionMat*uModelMat*aVertexPosition;
    gl_Position = vec4(position.xy/position.z, 0, 1);
}