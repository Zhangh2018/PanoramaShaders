attribute vec3 aPosition;
attribute vec3 a_Color;
varying vec3 v_color;
void main()
{
    v_color = a_Color;
    gl_Position = vec4(aPosition,1.0);
	gl_PointSize = 10.0;
}
