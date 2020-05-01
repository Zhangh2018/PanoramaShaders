precision mediump float;
uniform sampler2D sTexture1;
uniform sampler2D sTexture2;
varying vec2 vTexCoord1;
varying vec2 vTexCoord2;
varying float vWeight;
varying vec3 v_Pos;
varying vec3 v_Color;

uniform float uDelta1;
uniform float uDelta2;

uniform vec4 uMask;

void main()
{
    vec4 color1 = texture2D(sTexture1,vTexCoord1);
    vec4 color2 = texture2D(sTexture2,vTexCoord2);
	//vec4 tex = vWeight * (color1 * vec4(uDelta1, uDelta1, uDelta1, 1.0)) + (1.0 - vWeight) * (color2 * vec4(uDelta2, uDelta2, uDelta2, 1.0));
    vec4 tex = mix(color2 * vec4(uDelta2, uDelta2, uDelta2, 1.0), color1 * vec4(uDelta1, uDelta1, uDelta1, 1.0), vWeight);
	gl_FragColor = mix(clamp(tex, 0.0, 1.0), uMask, uMask[3]);
}
