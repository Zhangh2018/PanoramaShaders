
precision mediump float;
uniform sampler2D sTexture;
struct CameraParam
{
    vec2 imageCenter;
	vec2 imageSize;
	vec4 coff1;
    vec4 coff2;
	vec4 coff3;
    vec4 coff4;
	mat2 affineMat;
    vec2 srcImageSize;
    float calibSf;
};
vec4 world2cam(in vec2 calibImagePoint,in CameraParam cameraParam)
{
    vec2 centerImagePoint = calibImagePoint - cameraParam.imageSize / 2.0;
    vec3 calibPoint = vec3(centerImagePoint.yx,-cameraParam.imageSize.x / cameraParam.calibSf);
    float invnorm = 1.0 / length(calibPoint.xy);
	float theta = atan(calibPoint.z * invnorm);
	vec2 tmp = vec2(1.0,theta);
    float theta2 = theta * theta;
    float theta4 = theta2 * theta2;
    vec4 t1 = vec4(tmp,theta2 * tmp);
    vec4 t2	= t1 * theta4;
	vec4 t3 = t2 * theta4;
    vec4 t4 = t3 * theta4;
    float rho = dot(t1,cameraParam.coff1) + dot(t2,cameraParam.coff2) + dot(t3,cameraParam.coff3) + dot(t4,cameraParam.coff4);
    vec2 point = calibPoint.xy * invnorm * rho;
    vec2 srcPoint = cameraParam.affineMat * point + cameraParam.imageCenter;
	vec2 textCoord = vec2(srcPoint.y / cameraParam.srcImageSize.x,srcPoint.x / cameraParam.srcImageSize.y);
    vec4 color = texture2D(sTexture,textCoord);
	return color;
}
uniform CameraParam uCameraParam;
varying vec2 vCut;
void main()
{
   vec2 calibPoint = vec2(vCut.x,vCut.y);
   gl_FragColor=world2cam(calibPoint,uCameraParam);
}
