attribute vec2 aPosition;
uniform vec2 uDstImageSize;
uniform vec2 uDstImageBegin;
varying vec2 vPosition;
void main(){
   const vec2 screenSize = vec2(1280.0,720.0);
   vec2 point = vec2((uDstImageBegin.x + aPosition.x) / screenSize.x,1.0 - (uDstImageBegin.y + aPosition.y + 1.0) / screenSize.y) * 2.0 - 1.0;
   gl_Position = vec4(point,0.0,1.0);
   vPosition = aPosition;
}
