
precision mediump float;
uniform sampler2D sTexture1;
uniform sampler2D sTexture2;
uniform float uCompensation1;
uniform float uCompensation2;
uniform vec3  uLocalLuminParam;
varying vec2 vTexCoord1;
varying vec2 vTexCoord2;
varying float vWeight;

uniform float uDelta1;
uniform float uDelta2;

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
	vec4 color1 = texture2D(sTexture1,vTexCoord1);
	vec4 color2 = texture2D(sTexture2,vTexCoord2);

	//vec4 color =  vWeight * (color1 * vec4(uDelta1, uDelta1, uDelta1, 1.0)) + (1.0 - vWeight) * (color2 * vec4(uDelta2, uDelta2, uDelta2, 1.0));
	vec4 color = mix(color2 * vec4(uDelta2, uDelta2, uDelta2, 1.0), color1 * vec4(uDelta1, uDelta1, uDelta1, 1.0), vWeight);
	gl_FragColor = clamp(color, 0.0, 1.0);
}
