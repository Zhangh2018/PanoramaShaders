precision mediump float;
uniform sampler2D my_Sampler;
varying vec3 v_Color;
varying vec2 vTexCoord;

uniform float uDelta;
uniform vec4 uMask;

void main()
{
    vec4 tex = texture2D(my_Sampler, vTexCoord);
	tex = clamp(tex * vec4(uDelta, uDelta, uDelta, 1.0), 0.0, 1.0);
	gl_FragColor = mix(tex, uMask, uMask[3]);
}
