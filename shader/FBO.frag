precision mediump float;
uniform sampler2D my_Sampler;
varying vec3 v_Color;
varying vec2 vTexCoord;
void main()
{
    vec4 tex = texture2D(my_Sampler, vTexCoord);
	float weight = min((v_Color.x+v_Color.y+v_Color.z)*0.7,0.7);
	gl_FragColor = tex;
	//gl_FragColor = vec4((1.0-weight)*tex.xyz+weight*v_Color,1.0);
}
