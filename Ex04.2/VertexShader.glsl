attribute vec3 aVertexPosition;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main() {

    gl_Position=mProj*mView*mWorld*vec4(aVertexPosition, 1.0);
}