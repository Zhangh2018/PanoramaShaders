attribute vec4 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
uniform mat4 uTransformMatrix;

void main()
{
    gl_Position = uTransformMatrix * aPosition;
    vTexCoord = aTexCoord;
}
