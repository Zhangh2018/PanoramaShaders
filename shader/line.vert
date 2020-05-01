attribute vec4 aPosition;
uniform mat4 uTransformMatrix;

void main()
{
    gl_Position = uTransformMatrix * aPosition;
}