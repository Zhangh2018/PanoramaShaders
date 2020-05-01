//attribute vec4 aPosition;
//attribute vec2 aTexCoord;
//varying vec2 vTexCoord1;
//varying vec2 vTexCoord2;
//varying vec2 vTexCoord; // 原始高为1080,宽为810的坐标
//uniform mat4 uTransformMatrix;
//
//void main()
//{
//    gl_Position =  uTransformMatrix * aPosition;
//
//    // 将纹理坐标做旋转
//    vTexCoord1 = (uTransformMatrix * vec4(aTexCoord, 0.0, 1.0)).xy;
//    // TODO: 暂时将速度等信息定位y轴0.05
//    vTexCoord2 = (uTransformMatrix * vec4(aTexCoord.x, aTexCoord.y-0.05, 0.0, 1.0)).xy;
//    vTexCoord = vec2(aTexCoord.x, aTexCoord.y-0.05);
//
//}

attribute vec4 aPosition;
attribute vec2 aTexCoord;
attribute vec2 aTexCoordOrigin;

varying vec2 vTexCoord;
varying vec2 vTexCoordOrigin;

uniform mat4 uTransformMatrix;

void main()
{
    gl_Position =  uTransformMatrix * aPosition;

    // 将纹理坐标做旋转
    vTexCoord = (uTransformMatrix * vec4(aTexCoord, 0.0, 1.0)).xy;

    vTexCoordOrigin = (uTransformMatrix * vec4(aTexCoordOrigin, 0.0, 1.0)).xy;
}
