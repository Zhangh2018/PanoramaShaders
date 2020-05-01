attribute vec2 aPosition;
attribute vec2 aCut;
varying vec2 vCut;
void main(){
   const vec2 screenSize = vec2(1280.0,720.0);
   vec2 point = vec2(aPosition.x / screenSize.x,1.0 - (aPosition.y + 1.0) / screenSize.y) * 2.0 - 1.0;
   gl_Position = vec4(point,0.0,1.0);
   vCut = aCut;
}
