attribute vec3 aPosition;
attribute float aWeight;
attribute vec2 aTexCoord1;
attribute vec2 aTexCoord2;
attribute vec3 a_Color; 					
varying vec3 v_Color;
uniform mat4  uProjMatrix;
varying vec2 vTexCoord1;
varying vec2 vTexCoord2;
varying float vWeight;
varying vec3 v_Pos;
void main(){
    vTexCoord1 = aTexCoord1;
    vTexCoord2 = aTexCoord2;
    vWeight = aWeight;
     v_Color = a_Color;
    gl_Position = vec4(aPosition.x,-aPosition.y,aPosition.z,1.0);
    v_Pos = gl_Position.xyz;
}
