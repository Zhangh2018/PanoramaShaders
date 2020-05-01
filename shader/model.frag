precision mediump float;
varying vec4 vAmbient;
varying vec4 vDiffuse;
varying vec4 vSpecular;

uniform vec4 uDiffuseColor;
uniform vec4 uAmbientColor;
uniform vec4 uSpecularColor;
uniform vec4 uEmissiveColor;
uniform float uOpacity;
void main()
{
    gl_FragColor.xyz = (uAmbientColor * vAmbient + uDiffuseColor * vDiffuse + uSpecularColor * vSpecular + uEmissiveColor).xyz;
    gl_FragColor.a = 1.0;
}
