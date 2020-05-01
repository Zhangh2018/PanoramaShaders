precision mediump float;
uniform sampler2D sTexture[4];         //4个纹理图像,0表示前方，1表示后方，2表示左侧，3表示右侧
uniform mat4 uCameraMat[4];            //4个旋转平移矩阵
uniform vec2 uMergeAngleY;             //theta方向融合，x表示起始融合角，y表示结束融合角
varying vec2 vCylinder;
uniform float uDistToPanel2;
uniform int u2CmaeraStitch;
struct CameraParam
{
    mat2 affineMat;
    vec4 coff1;
    vec4 coff2;
    vec4 coff3;
    vec4 imageParam;
};
uniform CameraParam uCameraParam[4];   //4个摄像机内参
float getWeight(in float angle){
    float mergeAngle = max(-abs(angle - radians(180.0)) + uMergeAngleY.y,abs(angle - radians(180.0)) - radians(180.0) + uMergeAngleY.y);
    return clamp(mergeAngle / (uMergeAngleY.y - uMergeAngleY.x),0.0,1.0);
}
vec2 world2cam(in vec3 calibPoint,in CameraParam cameraParam)
{
    float invnorm = 1.0 / length(calibPoint.xy);
    float theta = atan(calibPoint.z * invnorm);
    vec2 tmp = vec2(1.0,theta);
    float theta2 = theta * theta;
    float theta4 = theta2 * theta2;
    vec4 t1 = vec4(tmp,theta2 * tmp);
    vec4 t2 = t1 * theta4;
    vec4 t3 = t2 * theta4;
    vec4 t4 = t3 * theta4;
    float rho = dot(t1,cameraParam.coff1) + dot(t2,cameraParam.coff2) + dot(t3,cameraParam.coff3);
    vec2 point = calibPoint.xy * invnorm * rho;
    vec2 srcPoint = cameraParam.affineMat * point + cameraParam.imageParam.xy;
    vec2 textCoord = vec2(srcPoint.y / cameraParam.imageParam.z,srcPoint.x / cameraParam.imageParam.w);
    return textCoord;
}
vec4 getColor(in vec3 point,in int direction){
    vec4 point4 = uCameraMat[direction] * vec4(point,1.0);
    vec2 tex = world2cam(-point4.yxz,uCameraParam[direction]);
    //vec4 color = vec4(tex.x,tex.y,0.0,1.0);
    vec4 color = texture2D(sTexture[direction],tex);
    return color;
}
vec4 stitch4Camera(){
   vec4 color = vec4(0.0,0.0,0.0,0.0);
   float angle = mod(vCylinder.x,radians(360.0));
   float height = vCylinder.y;
   float weight = getWeight(angle);
   vec3 point = vec3(uDistToPanel2 * cos(angle),uDistToPanel2 * sin(angle),height);
   if((angle < uMergeAngleY.y) || (angle > radians(360.0) - uMergeAngleY.y)){
	color = color + weight * getColor(point,3);           //右侧摄像头
   }
   else if((angle > radians(180.0) - uMergeAngleY.y) && (angle < radians(180.0) + uMergeAngleY.y)){
	color = color + weight * getColor(point,2);           //左侧摄像头
    }
    if((angle > uMergeAngleY.x) && (angle < radians(180.0) - uMergeAngleY.x)){
        color = color + (1.0 - weight) * getColor(point,0);   //前侧摄像头
    }
    else if((angle >= radians(180.0) + uMergeAngleY.x) && (angle <= radians(360.0) - uMergeAngleY.x)){
	color = color + (1.0 - weight) * getColor(point,1);   //后侧摄像头
   }
   return color;
}
vec4 stitch2Camera(){
   float angle = mod(vCylinder.x,radians(360.0));
   float height = vCylinder.y;
   vec3 point = vec3(uDistToPanel2 * cos(angle),uDistToPanel2 * sin(angle),height);
   if(angle <= radians(180.0)){
        return getColor(point,0);              //前侧摄像头
    }
    return getColor(point,1);                  //后侧摄像头
}
void main()
{
   if(u2CmaeraStitch == 1){
       gl_FragColor = stitch2Camera();
   }else{
       gl_FragColor = stitch4Camera();
   }
}
