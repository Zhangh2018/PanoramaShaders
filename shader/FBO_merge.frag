precision mediump float;
uniform sampler2D sTexture1;
uniform sampler2D sTexture2;
varying vec2 vTexCoord1;
varying vec2 vTexCoord2;
varying float vWeight;
varying vec3 v_Pos;
varying vec3 v_Color;
void main()
{
    vec4 color1 = texture2D(sTexture1,vTexCoord1);
    vec4 color2 = texture2D(sTexture2,vTexCoord2);
    vec4 tex = vWeight * color1 + (1.0 - vWeight)*color2;
    vec4 tex = mix(color2, color1, vWeight);
	gl_FragColor = tex;

	//float weight = min((v_Color.x+v_Color.y+v_Color.z)*0.7,0.7);
	//gl_FragColor = vec4((1.0-weight)*tex.xyz+weight*v_Color,1.0);
}
