attribute vec3 aPosition;  						
attribute vec2 aTexCoord;  						
uniform mat4  uProjMatrix;
varying vec2 vTexCoord;
void main(){  
     vTexCoord = vec2(aTexCoord.x,1.0 - aTexCoord.y);
     gl_Position = uProjMatrix * vec4(aPosition,1.0); 	
}
