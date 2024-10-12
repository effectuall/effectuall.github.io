import{r as n,j as c}from"./index-BAQI0JZo.js";import{ad as ge,V as l,ao as Rt,ap as Qe,aq as He,a8 as ue,ar as Ot,ae as wt,ag as zt,ah as Xe,as as Ye,h as bt,R as Ut,at as ye,_ as A,au as At,z as Dt,Q as St,aj as oe,C as me,am as Ne,$ as Pt,H as de,v as Ve,P as Et,av as Mt,a as je,u as It,b as Bt,O as Wt}from"./OrbitControls-BH8iRAIf.js";import{O as Ft}from"./Overlay-B5VU0t59.js";import{T as Tt}from"./Text-BzjAriu-.js";const Je=new ge,ve=new l;class $e extends Rt{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],r=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(r),this.setAttribute("position",new Qe(e,3)),this.setAttribute("uv",new Qe(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,r=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),r.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const r=new He(t,6,1);return this.setAttribute("instanceStart",new ue(r,3,0)),this.setAttribute("instanceEnd",new ue(r,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let r;e instanceof Float32Array?r=e:Array.isArray(e)&&(r=new Float32Array(e));const o=new He(r,t*2,1);return this.setAttribute("instanceColorStart",new ue(o,t,0)),this.setAttribute("instanceColorEnd",new ue(o,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Ot(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ge);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Je.setFromBufferAttribute(t),this.boundingBox.union(Je))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wt),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const r=this.boundingSphere.center;this.boundingBox.getCenter(r);let o=0;for(let s=0,a=e.count;s<a;s++)ve.fromBufferAttribute(e,s),o=Math.max(o,r.distanceToSquared(ve)),ve.fromBufferAttribute(t,s),o=Math.max(o,r.distanceToSquared(ve));this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class Ct extends $e{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,r=new Float32Array(2*t);for(let o=0;o<t;o+=3)r[2*o]=e[o],r[2*o+1]=e[o+1],r[2*o+2]=e[o+2],r[2*o+3]=e[o+3],r[2*o+4]=e[o+4],r[2*o+5]=e[o+5];return super.setPositions(r),this}setColors(e,t=3){const r=e.length-t,o=new Float32Array(2*r);if(t===3)for(let s=0;s<r;s+=t)o[2*s]=e[s],o[2*s+1]=e[s+1],o[2*s+2]=e[s+2],o[2*s+3]=e[s+3],o[2*s+4]=e[s+4],o[2*s+5]=e[s+5];else for(let s=0;s<r;s+=t)o[2*s]=e[s],o[2*s+1]=e[s+1],o[2*s+2]=e[s+2],o[2*s+3]=e[s+3],o[2*s+4]=e[s+4],o[2*s+5]=e[s+5],o[2*s+6]=e[s+6],o[2*s+7]=e[s+7];return super.setColors(o,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class qe extends zt{constructor(e){super({type:"LineMaterial",uniforms:Xe.clone(Xe.merge([Ye.common,Ye.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new bt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${parseInt(Ut.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const Ke=new l,Ze=new l,W=new ye,F=new ye,K=new ye,Re=new l,Oe=new A,k=new At,et=new l,we=new ge,be=new wt,Z=new ye;let ee,Ge,_t,ne;function tt(i,e,t){return Z.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),Z.multiplyScalar(1/Z.w),Z.x=ne/t.width,Z.y=ne/t.height,Z.applyMatrix4(i.projectionMatrixInverse),Z.multiplyScalar(1/Z.w),Math.abs(Math.max(Z.x,Z.y))}function kt(i,e){for(let t=0,r=Ge.count;t<r;t++){k.start.fromBufferAttribute(Ge,t),k.end.fromBufferAttribute(_t,t);const o=new l,s=new l;ee.distanceSqToSegment(k.start,k.end,s,o),s.distanceTo(o)<ne*.5&&e.push({point:s,pointOnLine:o,distance:ee.origin.distanceTo(s),object:i,face:null,faceIndex:t,uv:null,uv2:null})}}function Ht(i,e,t){const r=e.projectionMatrix,s=i.material.resolution,a=i.matrixWorld,u=i.geometry,h=u.attributes.instanceStart,C=u.attributes.instanceEnd,v=-e.near;ee.at(1,K),K.w=1,K.applyMatrix4(e.matrixWorldInverse),K.applyMatrix4(r),K.multiplyScalar(1/K.w),K.x*=s.x/2,K.y*=s.y/2,K.z=0,Re.copy(K),Oe.multiplyMatrices(e.matrixWorldInverse,a);for(let p=0,R=h.count;p<R;p++){if(W.fromBufferAttribute(h,p),F.fromBufferAttribute(C,p),W.w=1,F.w=1,W.applyMatrix4(Oe),F.applyMatrix4(Oe),W.z>v&&F.z>v)continue;if(W.z>v){const w=W.z-F.z,f=(W.z-v)/w;W.lerp(F,f)}else if(F.z>v){const w=F.z-W.z,f=(F.z-v)/w;F.lerp(W,f)}W.applyMatrix4(r),F.applyMatrix4(r),W.multiplyScalar(1/W.w),F.multiplyScalar(1/F.w),W.x*=s.x/2,W.y*=s.y/2,F.x*=s.x/2,F.y*=s.y/2,k.start.copy(W),k.start.z=0,k.end.copy(F),k.end.z=0;const E=k.closestPointToPointParameter(Re,!0);k.at(E,et);const j=St.lerp(W.z,F.z,E),O=j>=-1&&j<=1,b=Re.distanceTo(et)<ne*.5;if(O&&b){k.start.fromBufferAttribute(h,p),k.end.fromBufferAttribute(C,p),k.start.applyMatrix4(a),k.end.applyMatrix4(a);const w=new l,f=new l;ee.distanceSqToSegment(k.start,k.end,f,w),t.push({point:f,pointOnLine:w,distance:ee.origin.distanceTo(f),object:i,face:null,faceIndex:p,uv:null,uv2:null})}}}class Lt extends Dt{constructor(e=new $e,t=new qe({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,r=e.attributes.instanceEnd,o=new Float32Array(2*t.count);for(let a=0,u=0,h=t.count;a<h;a++,u+=2)Ke.fromBufferAttribute(t,a),Ze.fromBufferAttribute(r,a),o[u]=u===0?0:o[u-1],o[u+1]=o[u]+Ke.distanceTo(Ze);const s=new He(o,2,1);return e.setAttribute("instanceDistanceStart",new ue(s,1,0)),e.setAttribute("instanceDistanceEnd",new ue(s,1,1)),this}raycast(e,t){const r=this.material.worldUnits,o=e.camera;o===null&&!r&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;ee=e.ray;const a=this.matrixWorld,u=this.geometry,h=this.material;ne=h.linewidth+s,Ge=u.attributes.instanceStart,_t=u.attributes.instanceEnd,u.boundingSphere===null&&u.computeBoundingSphere(),be.copy(u.boundingSphere).applyMatrix4(a);let C;if(r)C=ne*.5;else{const p=Math.max(o.near,be.distanceToPoint(ee.origin));C=tt(o,p,h.resolution)}if(be.radius+=C,ee.intersectsSphere(be)===!1)return;u.boundingBox===null&&u.computeBoundingBox(),we.copy(u.boundingBox).applyMatrix4(a);let v;if(r)v=ne*.5;else{const p=Math.max(o.near,we.distanceToPoint(ee.origin));v=tt(o,p,h.resolution)}we.expandByScalar(v),ee.intersectsBox(we)!==!1&&(r?kt(this,t):Ht(this,o,t))}}class Nt extends Lt{constructor(e=new Ct,t=new qe({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Gt=new l,Vt=new l,$t=new l,qt=(i,e,t)=>{const r=t.width/2,o=t.height/2;e.updateMatrixWorld(!1);const s=i.project(e);return s.x=s.x*r+r,s.y=-(s.y*o)+o,s},Qt=(i,e,t,r=1)=>{const o=Gt.set(i.x/t.width*2-1,-(i.y/t.height)*2+1,r);return o.unproject(e),o},jt=(i,e,t,r)=>{const o=qt($t.copy(i),t,r);let s=0;for(let a=0;a<2;++a){const u=Vt.copy(o).setComponent(a,o.getComponent(a)+e),h=Qt(u,t,r,u.z);s=Math.max(s,i.distanceTo(h))}return s},Le=n.forwardRef(function({points:e,color:t=16777215,vertexColors:r,linewidth:o,lineWidth:s,segments:a,dashed:u,...h},C){var v,p;const R=oe(b=>b.size),D=n.useMemo(()=>a?new Lt:new Nt,[a]),[E]=n.useState(()=>new qe),j=(r==null||(v=r[0])==null?void 0:v.length)===4?4:3,O=n.useMemo(()=>{const b=a?new $e:new Ct,w=e.map(f=>{const P=Array.isArray(f);return f instanceof l||f instanceof ye?[f.x,f.y,f.z]:f instanceof bt?[f.x,f.y,0]:P&&f.length===3?[f[0],f[1],f[2]]:P&&f.length===2?[f[0],f[1],0]:f});if(b.setPositions(w.flat()),r){t=16777215;const f=r.map(P=>P instanceof me?P.toArray():P);b.setColors(f.flat(),j)}return b},[e,a,r,j]);return n.useLayoutEffect(()=>{D.computeLineDistances()},[e,D]),n.useLayoutEffect(()=>{u?E.defines.USE_DASH="":delete E.defines.USE_DASH,E.needsUpdate=!0},[u,E]),n.useEffect(()=>()=>O.dispose(),[O]),n.createElement("primitive",Ne({object:D,ref:C},h),n.createElement("primitive",{object:O,attach:"geometry"}),n.createElement("primitive",Ne({object:E,attach:"material",color:t,vertexColors:!!r,resolution:[R.width,R.height],linewidth:(p=o??s)!==null&&p!==void 0?p:1,dashed:u,transparent:j===4},h)))}),xe=n.createContext(null),Se=new l,nt=new l,Xt=(i,e,t,r)=>{const o=e.dot(e),s=e.dot(i)-e.dot(t),a=e.dot(r);return a===0?-s/o:(Se.copy(r).multiplyScalar(o/a).sub(e),nt.copy(r).multiplyScalar(s/a).add(t).sub(i),-Se.dot(nt)/Se.dot(Se))},Yt=new l(0,1,0),ot=new A,ze=({direction:i,axis:e})=>{const{translation:t,translationLimits:r,annotations:o,annotationsClass:s,depthTest:a,scale:u,lineWidth:h,fixed:C,axisColors:v,hoveredColor:p,opacity:R,onDragStart:D,onDrag:E,onDragEnd:j,userData:O}=n.useContext(xe),b=oe(g=>g.controls),w=n.useRef(null),f=n.useRef(null),P=n.useRef(null),x=n.useRef(0),[z,U]=n.useState(!1),H=n.useCallback(g=>{o&&(w.current.innerText=`${t.current[e].toFixed(2)}`,w.current.style.display="block"),g.stopPropagation();const d=new A().extractRotation(f.current.matrixWorld),m=g.point.clone(),L=new l().setFromMatrixPosition(f.current.matrixWorld),_=i.clone().applyMatrix4(d).normalize();P.current={clickPoint:m,dir:_},x.current=t.current[e],D({component:"Arrow",axis:e,origin:L,directions:[_]}),b&&(b.enabled=!1),g.target.setPointerCapture(g.pointerId)},[o,i,b,D,t,e]),$=n.useCallback(g=>{if(g.stopPropagation(),z||U(!0),P.current){const{clickPoint:d,dir:m}=P.current,[L,_]=(r==null?void 0:r[e])||[void 0,void 0];let M=Xt(d,m,g.ray.origin,g.ray.direction);L!==void 0&&(M=Math.max(M,L-x.current)),_!==void 0&&(M=Math.min(M,_-x.current)),t.current[e]=x.current+M,o&&(w.current.innerText=`${t.current[e].toFixed(2)}`),ot.makeTranslation(m.x*M,m.y*M,m.z*M),E(ot)}},[o,E,z,t,r,e]),G=n.useCallback(g=>{o&&(w.current.style.display="none"),g.stopPropagation(),P.current=null,j(),b&&(b.enabled=!0),g.target.releasePointerCapture(g.pointerId)},[o,b,j]),Y=n.useCallback(g=>{g.stopPropagation(),U(!1)},[]),{cylinderLength:q,coneWidth:Q,coneLength:I,matrixL:V}=n.useMemo(()=>{const g=C?h/u*1.6:u/20,d=C?.2:u/5,m=C?1-d:u-d,L=new Pt().setFromUnitVectors(Yt,i.clone().normalize()),_=new A().makeRotationFromQuaternion(L);return{cylinderLength:m,coneWidth:g,coneLength:d,matrixL:_}},[i,u,h,C]),S=z?p:v[e];return n.createElement("group",{ref:f},n.createElement("group",{matrix:V,matrixAutoUpdate:!1,onPointerDown:H,onPointerMove:$,onPointerUp:G,onPointerOut:Y},o&&n.createElement(de,{position:[0,-I,0]},n.createElement("div",{style:{display:"none",background:"#151520",color:"white",padding:"6px 8px",borderRadius:7,whiteSpace:"nowrap"},className:s,ref:w})),n.createElement("mesh",{visible:!1,position:[0,(q+I)/2,0],userData:O},n.createElement("cylinderGeometry",{args:[Q*1.4,Q*1.4,q+I,8,1]})),n.createElement(Le,{transparent:!0,raycast:()=>null,depthTest:a,points:[0,0,0,0,q,0],lineWidth:h,side:Ve,color:S,opacity:R,polygonOffset:!0,renderOrder:1,polygonOffsetFactor:-10,fog:!1}),n.createElement("mesh",{raycast:()=>null,position:[0,q+I/2,0],renderOrder:500},n.createElement("coneGeometry",{args:[Q,I,24,1]}),n.createElement("meshBasicMaterial",{transparent:!0,depthTest:a,color:S,opacity:R,polygonOffset:!0,polygonOffsetFactor:-10,fog:!1}))))},Ue=new l,Ae=new l,De=i=>i*180/Math.PI,Jt=i=>i*Math.PI/180,Kt=(i,e,t,r,o)=>{Ue.copy(i).sub(t),Ae.copy(e).sub(t);const s=r.dot(r),a=o.dot(o),u=Ue.dot(r)/s,h=Ue.dot(o)/a,C=Ae.dot(r)/s,v=Ae.dot(o)/a,p=Math.atan2(h,u);return Math.atan2(v,C)-p},Zt=(i,e)=>{let t=Math.floor(i/e);return t=t<0?t+1:t,i-t*e},rt=i=>{let e=Zt(i,2*Math.PI);return Math.abs(e)<1e-6?0:(e<0&&(e+=2*Math.PI),e)},Pe=new A,st=new l,Ee=new Mt,Ie=new l,Be=({dir1:i,dir2:e,axis:t})=>{const{rotationLimits:r,annotations:o,annotationsClass:s,depthTest:a,scale:u,lineWidth:h,fixed:C,axisColors:v,hoveredColor:p,opacity:R,onDragStart:D,onDrag:E,onDragEnd:j,userData:O}=n.useContext(xe),b=oe(S=>S.controls),w=n.useRef(null),f=n.useRef(null),P=n.useRef(0),x=n.useRef(0),z=n.useRef(null),[U,H]=n.useState(!1),$=n.useCallback(S=>{o&&(w.current.innerText=`${De(x.current).toFixed(0)}º`,w.current.style.display="block"),S.stopPropagation();const g=S.point.clone(),d=new l().setFromMatrixPosition(f.current.matrixWorld),m=new l().setFromMatrixColumn(f.current.matrixWorld,0).normalize(),L=new l().setFromMatrixColumn(f.current.matrixWorld,1).normalize(),_=new l().setFromMatrixColumn(f.current.matrixWorld,2).normalize(),M=new Et().setFromNormalAndCoplanarPoint(_,d);z.current={clickPoint:g,origin:d,e1:m,e2:L,normal:_,plane:M},D({component:"Rotator",axis:t,origin:d,directions:[m,L,_]}),b&&(b.enabled=!1),S.target.setPointerCapture(S.pointerId)},[o,b,D,t]),G=n.useCallback(S=>{if(S.stopPropagation(),U||H(!0),z.current){const{clickPoint:g,origin:d,e1:m,e2:L,normal:_,plane:M}=z.current,[T,N]=(r==null?void 0:r[t])||[void 0,void 0];Ee.copy(S.ray),Ee.intersectPlane(M,Ie),Ee.direction.negate(),Ee.intersectPlane(M,Ie);let y=Kt(g,Ie,d,m,L),X=De(y);S.shiftKey&&(X=Math.round(X/10)*10,y=Jt(X)),T!==void 0&&N!==void 0&&N-T<2*Math.PI?(y=rt(y),y=y>Math.PI?y-2*Math.PI:y,y=St.clamp(y,T-P.current,N-P.current),x.current=P.current+y):(x.current=rt(P.current+y),x.current=x.current>Math.PI?x.current-2*Math.PI:x.current),o&&(X=De(x.current),w.current.innerText=`${X.toFixed(0)}º`),Pe.makeRotationAxis(_,y),st.copy(d).applyMatrix4(Pe).sub(d).negate(),Pe.setPosition(st),E(Pe)}},[o,E,U,r,t]),Y=n.useCallback(S=>{o&&(w.current.style.display="none"),S.stopPropagation(),P.current=x.current,z.current=null,j(),b&&(b.enabled=!0),S.target.releasePointerCapture(S.pointerId)},[o,b,j]),q=n.useCallback(S=>{S.stopPropagation(),H(!1)},[]),Q=n.useMemo(()=>{const S=i.clone().normalize(),g=e.clone().normalize();return new A().makeBasis(S,g,S.clone().cross(g))},[i,e]),I=C?.65:u*.65,V=n.useMemo(()=>{const g=[];for(let d=0;d<=32;d++){const m=d*(Math.PI/2)/32;g.push(new l(Math.cos(m)*I,Math.sin(m)*I,0))}return g},[I]);return n.createElement("group",{ref:f,onPointerDown:$,onPointerMove:G,onPointerUp:Y,onPointerOut:q,matrix:Q,matrixAutoUpdate:!1},o&&n.createElement(de,{position:[I,I,0]},n.createElement("div",{style:{display:"none",background:"#151520",color:"white",padding:"6px 8px",borderRadius:7,whiteSpace:"nowrap"},className:s,ref:w})),n.createElement(Le,{points:V,lineWidth:h*4,visible:!1,userData:O}),n.createElement(Le,{transparent:!0,raycast:()=>null,depthTest:a,points:V,lineWidth:h,side:Ve,color:U?p:v[t],opacity:R,polygonOffset:!0,polygonOffsetFactor:-10,fog:!1}))},en=(i,e,t)=>{const r=Math.abs(i.x)>=Math.abs(i.y)&&Math.abs(i.x)>=Math.abs(i.z)?0:Math.abs(i.y)>=Math.abs(i.x)&&Math.abs(i.y)>=Math.abs(i.z)?1:2,o=[0,1,2].sort((E,j)=>Math.abs(e.getComponent(j))-Math.abs(e.getComponent(E))),s=r===o[0]?o[1]:o[0],a=i.getComponent(r),u=i.getComponent(s),h=e.getComponent(r),C=e.getComponent(s),v=t.getComponent(r),R=(t.getComponent(s)-v*(u/a))/(C-h*(u/a));return[(v-R*h)/a,R]},Me=new Mt,Ce=new l,it=new A,We=({dir1:i,dir2:e,axis:t})=>{const{translation:r,translationLimits:o,annotations:s,annotationsClass:a,depthTest:u,scale:h,lineWidth:C,fixed:v,axisColors:p,hoveredColor:R,opacity:D,onDragStart:E,onDrag:j,onDragEnd:O,userData:b}=n.useContext(xe),w=oe(m=>m.controls),f=n.useRef(null),P=n.useRef(null),x=n.useRef(null),z=n.useRef(0),U=n.useRef(0),[H,$]=n.useState(!1),G=n.useCallback(m=>{s&&(f.current.innerText=`${r.current[(t+1)%3].toFixed(2)}, ${r.current[(t+2)%3].toFixed(2)}`,f.current.style.display="block"),m.stopPropagation();const L=m.point.clone(),_=new l().setFromMatrixPosition(P.current.matrixWorld),M=new l().setFromMatrixColumn(P.current.matrixWorld,0).normalize(),T=new l().setFromMatrixColumn(P.current.matrixWorld,1).normalize(),N=new l().setFromMatrixColumn(P.current.matrixWorld,2).normalize(),y=new Et().setFromNormalAndCoplanarPoint(N,_);x.current={clickPoint:L,e1:M,e2:T,plane:y},z.current=r.current[(t+1)%3],U.current=r.current[(t+2)%3],E({component:"Slider",axis:t,origin:_,directions:[M,T,N]}),w&&(w.enabled=!1),m.target.setPointerCapture(m.pointerId)},[s,w,E,t]),Y=n.useCallback(m=>{if(m.stopPropagation(),H||$(!0),x.current){const{clickPoint:L,e1:_,e2:M,plane:T}=x.current,[N,y]=(o==null?void 0:o[(t+1)%3])||[void 0,void 0],[X,re]=(o==null?void 0:o[(t+2)%3])||[void 0,void 0];Me.copy(m.ray),Me.intersectPlane(T,Ce),Me.direction.negate(),Me.intersectPlane(T,Ce),Ce.sub(L);let[J,B]=en(_,M,Ce);N!==void 0&&(J=Math.max(J,N-z.current)),y!==void 0&&(J=Math.min(J,y-z.current)),X!==void 0&&(B=Math.max(B,X-U.current)),re!==void 0&&(B=Math.min(B,re-U.current)),r.current[(t+1)%3]=z.current+J,r.current[(t+2)%3]=U.current+B,s&&(f.current.innerText=`${r.current[(t+1)%3].toFixed(2)}, ${r.current[(t+2)%3].toFixed(2)}`),it.makeTranslation(J*_.x+B*M.x,J*_.y+B*M.y,J*_.z+B*M.z),j(it)}},[s,j,H,r,o,t]),q=n.useCallback(m=>{s&&(f.current.style.display="none"),m.stopPropagation(),x.current=null,O(),w&&(w.enabled=!0),m.target.releasePointerCapture(m.pointerId)},[s,w,O]),Q=n.useCallback(m=>{m.stopPropagation(),$(!1)},[]),I=n.useMemo(()=>{const m=i.clone().normalize(),L=e.clone().normalize();return new A().makeBasis(m,L,m.clone().cross(L))},[i,e]),V=v?1/7:h/7,S=v?.225:h*.225,g=H?R:p[t],d=n.useMemo(()=>[new l(0,0,0),new l(0,S,0),new l(S,S,0),new l(S,0,0),new l(0,0,0)],[S]);return n.createElement("group",{ref:P,matrix:I,matrixAutoUpdate:!1},s&&n.createElement(de,{position:[0,0,0]},n.createElement("div",{style:{display:"none",background:"#151520",color:"white",padding:"6px 8px",borderRadius:7,whiteSpace:"nowrap"},className:a,ref:f})),n.createElement("group",{position:[V*1.7,V*1.7,0]},n.createElement("mesh",{visible:!0,onPointerDown:G,onPointerMove:Y,onPointerUp:q,onPointerOut:Q,scale:S,userData:b},n.createElement("planeGeometry",null),n.createElement("meshBasicMaterial",{transparent:!0,depthTest:u,color:g,polygonOffset:!0,polygonOffsetFactor:-10,side:Ve,fog:!1})),n.createElement(Le,{position:[-S/2,-S/2,0],transparent:!0,depthTest:u,points:d,lineWidth:C,color:g,opacity:D,polygonOffset:!0,polygonOffsetFactor:-10,userData:b,fog:!1})))},he=new l,at=new l,tn=(i,e,t,r)=>{const o=e.dot(e),s=e.dot(i)-e.dot(t),a=e.dot(r);return a===0?-s/o:(he.copy(r).multiplyScalar(o/a).sub(e),at.copy(r).multiplyScalar(s/a).add(t).sub(i),-he.dot(at)/he.dot(he))},nn=new l(0,1,0),fe=new l,ct=new A,Fe=({direction:i,axis:e})=>{const{scaleLimits:t,annotations:r,annotationsClass:o,depthTest:s,scale:a,lineWidth:u,fixed:h,axisColors:C,hoveredColor:v,opacity:p,onDragStart:R,onDrag:D,onDragEnd:E,userData:j}=n.useContext(xe),O=oe(d=>d.size),b=oe(d=>d.controls),w=n.useRef(null),f=n.useRef(null),P=n.useRef(null),x=n.useRef(1),z=n.useRef(1),U=n.useRef(null),[H,$]=n.useState(!1),G=h?1.2:1.2*a,Y=n.useCallback(d=>{r&&(w.current.innerText=`${z.current.toFixed(2)}`,w.current.style.display="block"),d.stopPropagation();const m=new A().extractRotation(f.current.matrixWorld),L=d.point.clone(),_=new l().setFromMatrixPosition(f.current.matrixWorld),M=i.clone().applyMatrix4(m).normalize(),T=f.current.matrixWorld.clone(),N=T.clone().invert(),y=h?1/jt(f.current.getWorldPosition(he),a,d.camera,O):1;U.current={clickPoint:L,dir:M,mPLG:T,mPLGInv:N,offsetMultiplier:y},R({component:"Sphere",axis:e,origin:_,directions:[M]}),b&&(b.enabled=!1),d.target.setPointerCapture(d.pointerId)},[r,b,i,R,e,h,a,O]),q=n.useCallback(d=>{if(d.stopPropagation(),H||$(!0),U.current){const{clickPoint:m,dir:L,mPLG:_,mPLGInv:M,offsetMultiplier:T}=U.current,[N,y]=(t==null?void 0:t[e])||[1e-5,void 0],re=tn(m,L,d.ray.origin,d.ray.direction)*T,J=h?re:re/a;let B=Math.pow(2,J*.2);d.shiftKey&&(B=Math.round(B*10)/10),B=Math.max(B,N/x.current),y!==void 0&&(B=Math.min(B,y/x.current)),z.current=x.current*B,P.current.position.set(0,G+re,0),r&&(w.current.innerText=`${z.current.toFixed(2)}`),fe.set(1,1,1),fe.setComponent(e,B),ct.makeScale(fe.x,fe.y,fe.z).premultiply(_).multiply(M),D(ct)}},[r,G,D,H,t,e]),Q=n.useCallback(d=>{r&&(w.current.style.display="none"),d.stopPropagation(),x.current=z.current,U.current=null,P.current.position.set(0,G,0),E(),b&&(b.enabled=!0),d.target.releasePointerCapture(d.pointerId)},[r,b,E,G]),I=n.useCallback(d=>{d.stopPropagation(),$(!1)},[]),{radius:V,matrixL:S}=n.useMemo(()=>{const d=h?u/a*1.8:a/22.5,m=new Pt().setFromUnitVectors(nn,i.clone().normalize()),L=new A().makeRotationFromQuaternion(m);return{radius:d,matrixL:L}},[i,a,u,h]),g=H?v:C[e];return n.createElement("group",{ref:f},n.createElement("group",{matrix:S,matrixAutoUpdate:!1,onPointerDown:Y,onPointerMove:q,onPointerUp:Q,onPointerOut:I},r&&n.createElement(de,{position:[0,G/2,0]},n.createElement("div",{style:{display:"none",background:"#151520",color:"white",padding:"6px 8px",borderRadius:7,whiteSpace:"nowrap"},className:o,ref:w})),n.createElement("mesh",{ref:P,position:[0,G,0],renderOrder:500,userData:j},n.createElement("sphereGeometry",{args:[V,12,12]}),n.createElement("meshBasicMaterial",{transparent:!0,depthTest:s,color:g,opacity:p,polygonOffset:!0,polygonOffsetFactor:-10}))))},lt=new A,ut=new A,dt=new A,_e=new A,Te=new A,se=new A,ft=new A,pt=new A,mt=new A,ie=new ge,ke=new ge,ht=new l,gt=new l,yt=new l,xt=new l,pe=new l,ae=new l(1,0,0),ce=new l(0,1,0),le=new l(0,0,1),on=n.forwardRef(({enabled:i=!0,matrix:e,onDragStart:t,onDrag:r,onDragEnd:o,autoTransform:s=!0,anchor:a,disableAxes:u=!1,disableSliders:h=!1,disableRotations:C=!1,disableScaling:v=!1,activeAxes:p=[!0,!0,!0],offset:R=[0,0,0],rotation:D=[0,0,0],scale:E=1,lineWidth:j=4,fixed:O=!1,translationLimits:b,rotationLimits:w,scaleLimits:f,depthTest:P=!0,axisColors:x=["#ff2060","#20df80","#2080ff"],hoveredColor:z="#ffff40",annotations:U=!1,annotationsClass:H,opacity:$=1,visible:G=!0,userData:Y,children:q,...Q},I)=>{const V=oe(y=>y.invalidate),S=n.useRef(null),g=n.useRef(null),d=n.useRef(null),m=n.useRef(null),L=n.useRef([0,0,0]),_=n.useRef(new l(1,1,1)),M=n.useRef(new l(1,1,1));n.useLayoutEffect(()=>{a&&(m.current.updateWorldMatrix(!0,!0),_e.copy(m.current.matrixWorld).invert(),ie.makeEmpty(),m.current.traverse(y=>{y.geometry&&(y.geometry.boundingBox||y.geometry.computeBoundingBox(),se.copy(y.matrixWorld).premultiply(_e),ke.copy(y.geometry.boundingBox),ke.applyMatrix4(se),ie.union(ke))}),ht.copy(ie.max).add(ie.min).multiplyScalar(.5),gt.copy(ie.max).sub(ie.min).multiplyScalar(.5),yt.copy(gt).multiply(new l(...a)).add(ht),xt.set(...R).add(yt),d.current.position.copy(xt),V())});const T=n.useMemo(()=>({onDragStart:y=>{lt.copy(g.current.matrix),ut.copy(g.current.matrixWorld),t&&t(y),V()},onDrag:y=>{dt.copy(S.current.matrixWorld),_e.copy(dt).invert(),Te.copy(ut).premultiply(y),se.copy(Te).premultiply(_e),ft.copy(lt).invert(),pt.copy(se).multiply(ft),s&&g.current.matrix.copy(se),r&&r(se,pt,Te,y),V()},onDragEnd:()=>{o&&o(),V()},translation:L,translationLimits:b,rotationLimits:w,axisColors:x,hoveredColor:z,opacity:$,scale:E,lineWidth:j,fixed:O,depthTest:P,userData:Y,annotations:U,annotationsClass:H}),[t,r,o,L,b,w,f,P,E,j,O,...x,z,$,Y,s,U,H]),N=new l;return je(y=>{if(O){const X=jt(d.current.getWorldPosition(N),E,y.camera,y.size);_.current.setScalar(X)}e&&e instanceof A&&(g.current.matrix=e),g.current.updateWorldMatrix(!0,!0),mt.makeRotationFromEuler(d.current.rotation).setPosition(d.current.position).premultiply(g.current.matrixWorld),M.current.setFromMatrixScale(mt),pe.copy(_.current).divide(M.current),(Math.abs(d.current.scale.x-pe.x)>1e-4||Math.abs(d.current.scale.y-pe.y)>1e-4||Math.abs(d.current.scale.z-pe.z)>1e-4)&&(d.current.scale.copy(pe),y.invalidate())}),n.useImperativeHandle(I,()=>g.current,[]),n.createElement(xe.Provider,{value:T},n.createElement("group",{ref:S},n.createElement("group",Ne({ref:g,matrix:e,matrixAutoUpdate:!1},Q),n.createElement("group",{visible:G,ref:d,position:R,rotation:D},i&&n.createElement(n.Fragment,null,!u&&p[0]&&n.createElement(ze,{axis:0,direction:ae}),!u&&p[1]&&n.createElement(ze,{axis:1,direction:ce}),!u&&p[2]&&n.createElement(ze,{axis:2,direction:le}),!h&&p[0]&&p[1]&&n.createElement(We,{axis:2,dir1:ae,dir2:ce}),!h&&p[0]&&p[2]&&n.createElement(We,{axis:1,dir1:le,dir2:ae}),!h&&p[2]&&p[1]&&n.createElement(We,{axis:0,dir1:ce,dir2:le}),!C&&p[0]&&p[1]&&n.createElement(Be,{axis:2,dir1:ae,dir2:ce}),!C&&p[0]&&p[2]&&n.createElement(Be,{axis:1,dir1:le,dir2:ae}),!C&&p[2]&&p[1]&&n.createElement(Be,{axis:0,dir1:ce,dir2:le}),!v&&p[0]&&n.createElement(Fe,{axis:0,direction:ae}),!v&&p[1]&&n.createElement(Fe,{axis:1,direction:ce}),!v&&p[2]&&n.createElement(Fe,{axis:2,direction:le}))),n.createElement("group",{ref:m},q))))}),te={Steel:[7.85,new me(.3,.3,.3)],Stone:[2.6,new me(1,0,.5)],Plastic:[1,new me(0,.5,1)],Wood:[.3,new me(1,.5,0)]};function rn({start:i,end:e,v1:t=new l,v2:r=new l}){const o=n.useRef();return je(()=>{const s=i.current.getWorldPosition(t),a=e.current.getWorldPosition(r);o.current.geometry.setFromPoints([s,a])},[]),c.jsxs("line",{ref:o,children:[c.jsx("bufferGeometry",{}),c.jsx("lineBasicMaterial",{color:"#ff2060",linewidth:3})]})}function sn({start:i,v1:e=new l,v2:t=new l}){const r=n.useRef();return je(()=>{const o=i.current.getWorldPosition(e),s=new l(o.x,0,o.z);r.current.geometry.setFromPoints([o,s])},[]),c.jsxs("line",{ref:r,children:[c.jsx("bufferGeometry",{}),c.jsx("lineBasicMaterial",{color:"#20ff60",linewidth:3})]})}function an(i){const e=n.useRef(),t=n.useRef(),r=n.useRef(),[o,s]=n.useState(2),[a,u]=n.useState(1),[h,C]=n.useState(1),[v,p]=n.useState("Steel"),[R,D]=n.useState(te[v][0]*(o*a*h));n.useState(!1),n.useState([0,0,0]),n.useState(!1);const[E,j]=n.useState(0),[O,b]=n.useState(!1),[w,f]=n.useState(!1);It(O);function P(){f(!0)}return je((x,z)=>{const U=r.current.getWorldPosition(new l);j(U.y.toFixed(1))}),c.jsxs(c.Fragment,{children:[c.jsxs("group",{children:[c.jsxs("group",{children:[c.jsxs("mesh",{position:[0,-.5,0],scale:[100,1,100],children:[c.jsx("boxGeometry",{}),c.jsx("meshPhongMaterial",{color:"limegreen",transparent:!0,opacity:.7})]}),c.jsx(de,{name:"button",className:"content",distanceFactor:20,children:c.jsx("div",{className:"cursor-pointer  text-lg px-2 md:px-6 w-52 md:w-72",onClick:()=>P(),children:c.jsxs("div",{className:"absolute left-0 top-20 flex flex-col gap-4 select-none text-lg md:text-2xl",children:[c.jsxs("p",{className:"text-gray-800 font-semibold",children:["Mass = ",te[v][0]*o*a*h," g"]}),c.jsxs("p",{className:"text-gray-800 font-semibold",children:[" Gravitational Potential Energy (mgh), ",c.jsx("br",{}),w&&E>0?c.jsxs("a",{children:["P.E = ",(R*1e-4*9.8*E).toFixed(3)," J"]}):c.jsx("a",{className:"text-red-700",children:"P.E ~ 0 J (WHY?)"})]}),c.jsxs("label",{htmlFor:"density-el",className:"text-gray-800 font-semibold",children:["Density=  ",te[v][0]," g/cm",c.jsx("sup",{children:"3"})]}),c.jsx("select",{onChange:x=>(p(x.target.value),D(te[v][0]*o*a*h)),value:te[v][0],className:"w-48 md:w-64 p-2 border border-gray-300 bg-white rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500",children:Object.keys(te).map(x=>c.jsx("option",{value:x,children:x},x))})]})})})]}),c.jsxs("mesh",{position:[0,0,0],ref:t,scale:.05,children:[c.jsx("boxGeometry",{}),c.jsx("meshStandardMaterial",{color:"blue"})]}),c.jsx("group",{hovered:O,onPointerOver:x=>(x.stopPropagation(),b(!0)),onPointerOut:x=>b(!1),onClick:x=>(x.stopPropagation(),P()),children:c.jsx("group",{children:c.jsxs(on,{ref:e,anchor:[0,0,0],depthTest:!0,scale:5,lineWidth:2,disableRotations:!0,disableScaling:!0,children:[c.jsxs("group",{ref:r,children:[c.jsxs("mesh",{position:[0,a/2,0],scale:[o,a,h],children:[c.jsx("boxGeometry",{}),c.jsx("meshPhongMaterial",{color:te[v][1]})]}),c.jsx(vt,{col1:"cyan",col2:"red",rotation:[0,0,0],position:[0,2,0],tag:"Normal",factor:1}),c.jsx(vt,{col1:"blue",col2:"black",rotation:[0,0,3.14],position:[0,0,0],tag:"Weight",factor:-1})]}),c.jsx(de,{name:"button",className:"content",distanceFactor:20,position:[0,1,0],children:c.jsxs("div",{className:"cursor-pointer w-32 text-lg px-4 text-center text-white bg-cyan-900",onClick:()=>P(),children:["Height, ",c.jsx("br",{}),"h = ",E," cm"]})})]})})})]}),c.jsx(rn,{start:t,end:r}),c.jsx(sn,{start:r})]})}function vt(i){return c.jsx(c.Fragment,{children:c.jsxs("group",{...i,children:[c.jsxs("group",{children:[c.jsxs("mesh",{position:[0,2.5,0],children:[c.jsx("cylinderGeometry",{args:[.05,.05,5,6]}),c.jsx("meshPhongMaterial",{color:i.col1})]}),c.jsxs("mesh",{position:[0,5,0],children:[c.jsx("coneGeometry",{args:[.25,.5,6]}),c.jsx("meshPhongMaterial",{color:i.col2})]})]}),c.jsx(Tt,{position:[0,5.5,0],scale:i.factor,children:i.tag})]})})}const fn=()=>{const[i,e]=n.useState(""),[t,r]=n.useState(0),o=[["The goal of the project is to understand influence of gravity on Quantum Properties"],[" The velocity in the vertical direction begins to decrease as the object rises. At its highest point, the vertical velocity is zero. As the object falls toward Earth again, the vertical velocity increases again in magnitude but points in the opposite direction to the initial vertical velocity. "]];return n.useEffect(()=>{const s=o[1],a=setInterval(()=>{e(u=>u+s[t].charAt(u.length)),i.length===s[t].length&&r(u=>u<s.length-1?u+1:0)},25);return()=>{clearInterval(a)}},[t,i]),c.jsxs("div",{className:"bg-gradient-to-r from-cyan-900 to-cyan-500 h-screen ",children:[c.jsxs(Bt,{shadows:!0,camera:{position:[-25,12,25],fov:45},children:[c.jsx("ambientLight",{intensity:Math.PI/2}),c.jsx("spotLight",{position:[10,10,10],angle:.15,penumbra:1,decay:0,intensity:Math.PI}),c.jsx("pointLight",{position:[-10,-10,-10],decay:0,intensity:Math.PI}),c.jsx(Wt,{makeDefault:!0,target:[0,5,0]}),c.jsx(an,{}),c.jsx("gridHelper",{args:[100,10]})]}),c.jsx(Ft,{})]})};export{fn as default};
