attribute vec2 aCylinder;   
varying vec2 vCylinder;
uniform float uDistToPanel;	
uniform vec2 uMinAngleHeight;
uniform vec2 uMaxAngleHeight;
uniform mat4  uProjMatrix;		
void main(){
   vec2 cylinder = aCylinder * (uMaxAngleHeight - uMinAngleHeight) + uMinAngleHeight;
   vec2 center = (uMaxAngleHeight + uMinAngleHeight) / 2.0;
   vCylinder = cylinder;
   gl_Position = uProjMatrix * vec4((cylinder.x - center.x) * uDistToPanel,uDistToPanel,cylinder.y - center.y,1.0);
}


