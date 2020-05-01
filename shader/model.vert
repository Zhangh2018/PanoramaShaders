uniform mat4 uMVPMatrix;
uniform mat4 uMMatirx;
uniform vec3 uCamera;
uniform float uShiness;
attribute vec3 aPosition;
attribute vec3 aNormal;
struct Light
{
   vec4 position;                        
   vec4 ambientColor;
   vec4 diffuseColor;
   vec4 specularColor;
   vec3 spotDirection;
   vec3 attenuationFactors;
   float spotExponent;
   float spotCutoffAngle;
   int computeDistanceAttenuation;
};
uniform Light uLightState;
varying vec4 vAmbient;
varying vec4 vDiffuse;
varying vec4 vSpecular;

void computeLight(
in Light light,
in vec3 position,
in vec3 normal,
in vec3 cameraPos,
in float shiness,
inout vec4 ambient,
inout vec4 diffuse,
inout vec4 specular
){
	vec3 vp;
    if(light.position.w != 0.0)
	{
	    vp = normalize(light.position.xyz - position);
	}
	else
	{
	    vp = light.position.xyz;
	}
	ambient = light.ambientColor;
	float ndot1 = max(0.0,dot(normal,vp));
    diffuse = ndot1 * light.diffuseColor;
	vec3 eye = normalize(cameraPos - position);
	vec3 halfVec = normalize(vp + eye);
	float ndoth = dot(normal,halfVec);
	specular = vec4(0.0,0.0,0.0,0.0);
	if(ndoth > 0.0)
		specular = pow(ndoth,shiness) * light.specularColor;	
}

void main()
{  
    gl_Position = uMVPMatrix * vec4(aPosition,1.0);                         //根据总变换矩阵计算此次绘制此顶点的位置 
	vec4 ambient,diffuse,specular;
	vec3 position = (uMMatirx * vec4(aPosition,1.0)).xyz;                   
	vec3 normalTarget = aPosition + normalize(aNormal);
	vec3 normal = (uMMatirx * vec4(normalTarget,1.0)).xyz - position;
	normal = normalize(normal);
	computeLight(uLightState,position,normal,uCamera,uShiness,ambient,diffuse,specular);
	vAmbient = ambient;
    vSpecular = specular;
    vDiffuse = diffuse;
}