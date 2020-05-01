precision mediump float;
uniform sampler2D sTexture;
uniform float uCompensation;
uniform vec3  uLocalLuminParam;
varying vec2 vTexCoord;

uniform float uDelta;

float colorDiff(vec2 textCoord,vec3 luminParam)
{
   	const vec2 srcImageSize = vec2(640.0, 480.0);
	vec2 position = clamp(textCoord,0.0,1.0) - vec2(0.5,0.5);
	float r = length(vec2(position.x * srcImageSize.x,position.y * srcImageSize.y));
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
void main()
{
    vec4 color = texture2D(sTexture,vTexCoord);
//	gl_FragColor = color + vec4(uDelta, uDelta, uDelta, 0.0);
	gl_FragColor = clamp(color * vec4(uDelta, uDelta, uDelta, 1.0), 0.0, 1.0);
    //gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
