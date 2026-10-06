import * as THREE from 'three';
import { storyPose } from './spatial-layout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// One render-on-demand scene. Real portfolio assets, no video textures or postprocessing.
export function mountScene(host,root,{onReady,onError}) {
  let renderer;
  try { renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'}); }
  catch {onError();return()=>{};}
  let alive=true;
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.setClearColor(0x182423,1);
  host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  scene.fog=new THREE.Fog(0x182423,12,28);
  const camera=new THREE.PerspectiveCamera(38,1,.1,50);
  const ambient=new THREE.HemisphereLight(0xfff3dd,0x294340,2.2);scene.add(ambient);
  const key=new THREE.DirectionalLight(0xffd2a4,3);key.position.set(-3,6,8);scene.add(key);
  const rim=new THREE.DirectionalLight(0x77a8a8,2);rim.position.set(5,2,-4);scene.add(rim);
  const table=new THREE.Mesh(new THREE.CylinderGeometry(7.5,7.5,.2,64),new THREE.MeshStandardMaterial({color:0x20312e,roughness:.85}));table.position.y=-2.5;scene.add(table);
  const assembly=new THREE.Group();scene.add(assembly);
  const sources=['/media/portrait-960.webp','/media/jungle-960.webp','/selected-films/social-01.jpg','/selected-films/social-02.jpg','/selected-films/ckb-hogan.jpg','/selected-films/ckb-july.jpg'];
  const cards=[],textures=[];
  const backing=new THREE.MeshStandardMaterial({color:0x344a45,metalness:.35,roughness:.45});
  const progress={value:0};
  const geometry=new THREE.BoxGeometry(2.25,2.9,.09);
  const frontGeometry=new THREE.PlaneGeometry(2.09,2.74);
  const loader=new THREE.TextureLoader();
  sources.forEach((src,i)=>{
    const group=new THREE.Group(),frame=new THREE.Mesh(geometry,backing);group.add(frame);
    const mat=new THREE.MeshBasicMaterial({color:0xeeebd9});
    const face=new THREE.Mesh(frontGeometry,mat);face.position.z=.052;group.add(face);assembly.add(group);cards.push(group);
    loader.load(src,texture=>{
      if(!alive){texture.dispose();return;}
      texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
      // Contain the whole frame on a dark mount, rather than crop captions or faces.
      const aspect=texture.image.width/texture.image.height,frameAspect=2.09/2.74;
      if(aspect>frameAspect)face.scale.y=frameAspect/aspect;else face.scale.x=aspect/frameAspect;
      mat.map=texture;mat.color.set(0xffffff);mat.needsUpdate=true;textures.push(texture);render();if(i===0)onReady();
    },undefined,()=>{if(i===0&&alive)onError();});
  });
  const connectors=new THREE.Group();assembly.add(connectors);
  for(let i=0;i<5;i++){
    const line=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,1,8),new THREE.MeshBasicMaterial({color:0xf4a261}));connectors.add(line);
  }
  const lerp=THREE.MathUtils.lerp;

  function render(){
    if(!alive)return;
    const mobile=host.clientWidth<700;
    const t=progress.value*3;
    cards.forEach((card,i)=>{const p=storyPose(i,progress.value);card.position.set(p.x,p.y,p.z);card.rotation.set(p.rx,p.ry,p.rz);});
    assembly.position.set(mobile?0:2,0,0);assembly.rotation.y=lerp(-.15,.15,progress.value);
    const last=Math.max(0,(t-2));connectors.visible=last>.05;
    connectors.children.forEach((line,i)=>{const a=cards[i].position,b=cards[i+1].position;line.position.copy(a).lerp(b,.5);line.scale.y=a.distanceTo(b);line.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize());line.material.opacity=last;line.material.transparent=true;});
    camera.position.set(mobile?0:.3,lerp(.6,1.8,progress.value),mobile?14:12);camera.lookAt(mobile?0:1.2,0,0);
    renderer.render(scene,camera);
  }
  const resize=()=>{if(!alive||!host.clientWidth||!host.clientHeight)return;renderer.setSize(host.clientWidth,host.clientHeight,false);camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();render();};
  const observer=new ResizeObserver(resize);observer.observe(host);
  const ctx=gsap.context(()=>{gsap.to(progress,{value:1,ease:'none',onUpdate:render,scrollTrigger:{trigger:root,start:'top top',end:'bottom bottom',scrub:.65}});});
  const lost=e=>{e.preventDefault();onError();};renderer.domElement.addEventListener('webglcontextlost',lost);
  resize();
  return()=>{alive=false;ctx.revert();observer.disconnect();renderer.domElement.removeEventListener('webglcontextlost',lost);textures.forEach(t=>t.dispose());scene.traverse(o=>{if(o.isMesh){o.geometry.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}});renderer.dispose();renderer.domElement.remove();};
}
