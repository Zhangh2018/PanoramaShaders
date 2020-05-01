precision highp float;

//
// uniform sampler2D  uTexture1;   // 前一帧的fbo
// uniform sampler2D  uTexture2;   // 当前帧的fbo
//
// varying vec2 vTexCoord1;        // 前一帧的纹理坐标
// varying vec2 vTexCoord2;        // 当前帧的纹理坐标
// varying vec2 vTexCoord;
//
// void main(){
//
//         // 如果不在融合区域  0.255556 = 276 / 1080 0.744444 = (1080-276)/1080
//         if(vTexCoord.y > 0.255556 && vTexCoord.x > 0.364198 &&
//         vTexCoord.y < 0.744444 && vTexCoord.x < 0.635802){
//                 gl_FragColor = texture2D(uTexture1, vTexCoord1);
// //                gl_FragColor = vec4(0, 0, 1, 0);
//         }
// //      gl_FragColor = texture2D(uTexture1, vTexCoord1);
//         else {
// //                gl_FragColor = vec4(0, 1, 0, 0);
// //        }
//
//                 float minValue;
//                 float minCandidate1 = abs(vTexCoord.y * 1080.0 - 256.0);
//                 float minCandidate2 = abs(vTexCoord.x * 810.0 - 275.0);
//                 float minCandidate3 = abs(vTexCoord.y * 1080.0 - 824.0);
//                 float minCandidate4 = abs(vTexCoord.x * 810.0 - 535.0);
//
//                 minValue = min(minCandidate1, minCandidate2);
//                 minValue = min(minValue, minCandidate3);
//                 minValue = min(minValue, minCandidate4);
//
// //                minValue = minValue / 20.0;
// //                gl_FragColor = vec4(0, 0, minValue, 0);
//
//                 float weight = minValue / 20.0;
//
//                 vec4 color1 = texture2D(uTexture1,vTexCoord1);
//                 vec4 color2 = texture2D(uTexture2,vTexCoord2);
//
// //                vec4 color1 = vec4(0, 0, 1, 0);;
// //                vec4 color2 = vec4(0, 1, 0, 0);;
//                 vec4 tex = mix(color2, color1, weight);
// //                gl_FragColor = vec4(0, 1, 0, 0);
//                 gl_FragColor = tex;
//         }
//
//         //        if(vTexCoord.x > 0.5){
//         //                //                gl_FragColor = texture2D(uTexture1, vTexCoord1);
//         //                gl_FragColor = vec4(0, 0, 1, 0);
//         //        }
//         //        else {
//         //                gl_FragColor = vec4(0, 0, 0, 0);
//         //
//         //        }
//
// }

//没有融合区域的透明车底fragment渲染

uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

// 原始边界
uniform float uminX;
uniform float umaxX;
uniform float uminY;
uniform float umaxY;

// 对于放大了的边界
uniform float uminXF;
uniform float umaxXF;
uniform float uminYF;
uniform float umaxYF;

varying vec2 vTexCoord;     // Pre
varying vec2 vTexCoordOrigin;

// Blur
const float colOffset = 1.0 / 1920.0;
const float rowOffset = 1.0 / 1080.0;

void main(){

     // 在这个if小面的是没有做线性插值的区域
     if(vTexCoordOrigin.x > min(umaxX, uminX) && vTexCoordOrigin.x < max(umaxX, uminX) &&
        vTexCoordOrigin.y > min(umaxY, uminY) && vTexCoordOrigin.y < max(umaxY, uminY)){

         // 在此长方形中的fragment值不做插值运算
         // gl_FragColor = texture2D(uTexture1, vTexCoord);
         // gl_FragColor = texture2D(uTexture2, vTexCoordOrigin);
         // gl_FragColor = vec4(0,1,0,0);

    	vec3 col = vec3(0.0);
    	// col = 1.0/16.0 * vec3(texture2D(uTexture1, vTexCoord + vec2(-colOffset,  rowOffset)))
		// 	  + 2.0/16.0 * vec3(texture2D(uTexture1, vTexCoord + vec2( 0,  rowOffset)))
		// 	  + 1.0/16.0 * vec3(texture2D(uTexture1, vTexCoord + vec2( colOffset,  rowOffset)))
		// 	  + 2.0/16.0 * vec3(texture2D(uTexture1, vTexCoord + vec2( -colOffset,  0.0)))
		// 	  + 4.0/16.0 * vec3(texture2D(uTexture1, vTexCoord ))
		// 	  + 2.0/16.0 * vec3(texture2D(uTexture1, vTexCoord + vec2( colOffset,  0.0)))
		// 	  + 1.0/16.0 * vec3(texture2D(uTexture1, vTexCoord + vec2( -colOffset,  -rowOffset)))
		// 	  + 2.0/16.0 * vec3(texture2D(uTexture1, vTexCoord + vec2( 0.0,  -rowOffset)))
		// 	  + 1.0/16.0 * vec3(texture2D(uTexture1, vTexCoord + vec2( colOffset,  -rowOffset)));

    	col = 0.0947416 * vec3(texture2D(uTexture1, vTexCoord + vec2(-colOffset,  rowOffset)))
			  + 0.118318 * vec3(texture2D(uTexture1, vTexCoord + vec2( 0,  rowOffset)))
			  + 0.0947416 * vec3(texture2D(uTexture1, vTexCoord + vec2( colOffset,  rowOffset)))
			  + 0.118318 * vec3(texture2D(uTexture1, vTexCoord + vec2( -colOffset,  0.0)))
			  + 0.147761 * vec3(texture2D(uTexture1, vTexCoord ))
			  + 0.118318 * vec3(texture2D(uTexture1, vTexCoord + vec2( colOffset,  0.0)))
			  + 0.0947416 * vec3(texture2D(uTexture1, vTexCoord + vec2( -colOffset,  -rowOffset)))
			  + 0.118318 * vec3(texture2D(uTexture1, vTexCoord + vec2( 0.0,  -rowOffset)))
			  + 0.0947416 * vec3(texture2D(uTexture1, vTexCoord + vec2( colOffset,  -rowOffset)));

    	gl_FragColor = vec4(col, 1.0);
     }
     else{

         // 寻找距离外边界最小值
         float minValueX = min(abs(vTexCoordOrigin.x - min(umaxXF, uminXF)), abs(vTexCoordOrigin.x - max(umaxXF, uminXF)));
         float minValueY = min(abs(vTexCoordOrigin.y - min(umaxYF, uminYF)), abs(vTexCoordOrigin.y - max(umaxYF, uminYF)));

         minValueX = minValueX / abs(uminXF - uminX);
         minValueY = minValueY / abs(uminYF - uminY);

         float weight = min(minValueX, minValueY);

         weight = 1.0 - weight;

         // (1-weight) * preImage + weight * curImage
         if(texture2D(uTexture2, vTexCoordOrigin).xyz == vec3(0.0, 0.0, 0.0)){
             gl_FragColor = texture2D(uTexture2, vTexCoordOrigin);
         }
         else if(texture2D(uTexture1, vTexCoord).xyz == vec3(0.0, 0.0, 0.0)){
             gl_FragColor = texture2D(uTexture1, vTexCoord);

         }
         else{
             gl_FragColor = mix(texture2D(uTexture1, vTexCoord), texture2D(uTexture2, vTexCoordOrigin), weight);
             //gl_FragColor = mix(vec4(0, 1, 0, 0), vec4(0, 0, 1, 0), weight);
         }
     }


}


//没有融合区域的透明车底fragment渲染
//
//uniform sampler2D uTexture1;
//uniform sampler2D uTexture2;
//
//varying vec2 vTexCoord;
//varying vec2 vTexCoordOrigin;
//
//void main(){
//
//        gl_FragColor = texture2D(uTexture1, vTexCoord1);
//
//        //gl_FragColor = mix(texture2D(uTexture1, vTexCoord), texture2D(uTexture2, vTexCoordOrigin),0.05);
//
//        //gl_FragColor = vec4(0,0,1,0);
//
//}
