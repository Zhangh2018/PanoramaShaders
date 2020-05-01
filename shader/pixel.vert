attribute vec2 aPosition;
attribute vec3 aColor;
uniform vec2 uImageBegin;
varying vec3 vColor;
void main(){
   const vec2 screenSize = vec2(1280.0,720.0);
   vColor = aColor;
   vec2 point = vec2((aPosition.x + uImageBegin.x) / screenSize.x,1.0 - (aPosition.y + uImageBegin.y + 1.0) / screenSize.y) * 2.0 - 1.0;
   gl_PointSize = 1.0;
   gl_Position = vec4(point,0.0,1.0);
}
