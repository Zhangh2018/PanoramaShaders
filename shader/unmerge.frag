precision mediump float;
uniform sampler2D sTexture;
uniform mat3 uProjMatrix;
uniform vec3 uLuminParam;
uniform float uCompensation;
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
    vec4 t1 = vec4(tmp,theta * theta * tmp);
    vec4 t2 = t1 * pow(theta,4.0);
    vec4 t3 = t2 * pow(theta,4.0);
    vec4 t4 = t3 * pow(theta,4.0);
    float rho = dot(t1,cameraParam.coff1) + dot(t2,cameraParam.coff2) + dot(t3,cameraParam.coff3) + dot(t4,cameraParam.coff4);
    vec2 point = calibPoint.xy * invnorm * rho;
	vec2 srcPoint = cameraParam.affineMat * point + cameraParam.imageCenter;
	vec2 textCoord = vec2(srcPoint.y / cameraParam.imageSize.x,srcPoint.x / cameraParam.imageSize.y);
    vec4 color = texture2D(sTexture,textCoord);
	return color;
}
float colorDiff(vec2 position,vec2 imageSize,vec3 luminParam)
{
   	const vec2 srcImageSize = vec2(640.0,480.0);
    vec2 ratio = vec2(imageSize.x / srcImageSize.x,imageSize.y / srcImageSize.y);
    float r = length(vec2(position.x / ratio.x,position.y / ratio.y) - srcImageSize / 2.0);
	float luminDiff = dot(luminParam,vec3(1.0,r,r * r));
	return -luminDiff / 255.0;
}
vec3 rgb2yuv(vec3 rgb)
{
    const vec3 yCoff = vec3(0.30078,0.58594,0.11328);
	const vec3 uCoff = vec3(-0.17188,-0.33984,0.51172);
	const vec3 vCoff = vec3(0.51172,-0.42969,-0.08203);
    vec3 yuv = vec3(dot(yCoff,rgb),dot(uCoff,rgb) + 0.50196,dot(vCoff,rgb) + 0.50196);
	yuv = clamp(yuv,vec3(0.0,0.0,0.0),vec3(1.0,1.0,1.0));
	return yuv;
}
vec3 yuv2rgb(vec3 yuv)
{
    const vec3 rCoff = vec3(1.164,0.0,1.596);
	const vec3 gCoff = vec3(1.164,-0.392,-0.813);
	const vec3 bCoff = vec3(1.164,2.017,0.0);
	vec3 yuvOffset = vec3(yuv.x - 0.062745,yuv.y - 0.50196,yuv.z - 0.50196);
    vec3 rgb = vec3(dot(rCoff,yuvOffset),dot(gCoff,yuvOffset),dot(bCoff,yuvOffset));
	rgb = clamp(rgb,0.0,1.0);
	return rgb;
}
uniform CameraParam uCameraParam;
varying vec2 vPosition;//接收从顶点着色器过来的剪切位置
void main()
{
   vec3 projPoint = uProjMatrix * vec3(vPosition,1.0);
   vec2 calibPoint = vec2(projPoint.x / projPoint.z,projPoint.y / projPoint.z);
   vec4 color = world2cam(calibPoint,uCameraParam);
   vec3 yuv = rgb2yuv(color.xyz);
   float lumin = colorDiff(vPosition,uCameraParam.srcImageSize,uLuminParam);
   yuv = vec3(clamp(yuv.x + lumin + uCompensation,0.0,1.0),yuv.y,yuv.z);
//  给此片元颜色值
   gl_FragColor=vec4(yuv2rgb(yuv),1.0);
}
