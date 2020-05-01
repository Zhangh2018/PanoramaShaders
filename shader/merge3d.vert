attribute vec3 aPosition;
attribute float aWeight;
attribute vec2 aTexCoord1;
attribute vec2 aTexCoord2;
uniform mat4  uProjMatrix;
varying vec2 vTexCoord1;
varying vec2 vTexCoord2;
varying float vWeight;

void main(){
   vTexCoord1 = vec2(aTexCoord1.x, 1.0 - aTexCoord1.y);
   vTexCoord2 = vec2(aTexCoord2.x, 1.0 - aTexCoord2.y);
   vWeight = aWeight;

   gl_Position = uProjMatrix * vec4(aPosition,1.0);
}
