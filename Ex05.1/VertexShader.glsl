attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
varying vec4 vColor;

void main() {
    gl_Position=mProj*mView*mWorld*vec4(aVertexPosition, 1.0);
    vColor = aVertexColor;

}