attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 a_Color;

varying vec3 v_Color;
varying vec2 vTexCoord;

void main(){
     vTexCoord = aTexCoord;
     v_Color = a_Color;
     gl_Position = vec4(aPosition,1.0);
}
