import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

import bgTexture1 from './images/1.webp';
import bgTexture2 from './images/2.webp';
import bgTexture3 from './images/3.webp';
import bgTexture4 from './images/4.webp';
import sunTexture from './images/sun.webp';
import mercuryTexture from './images/mercurymap.webp';
import mercuryBump from './images/mercurybump.webp';
import venusTexture from './images/venusmap.webp';
import venusBump from './images/venusmap.webp';
import venusAtmosphere from './images/venus_atmosphere.webp';
import earthTexture from './images/earth_daymap.webp';
import earthNightTexture from './images/earth_nightmap.webp';
import earthAtmosphere from './images/earth_atmosphere.webp';
import earthMoonTexture from './images/moonmap.webp';
import earthMoonBump from './images/moonbump.webp';
import marsTexture from './images/marsmap.webp';
import marsBump from './images/marsbump.webp';
import jupiterTexture from './images/jupiter.webp';
import ioTexture from './images/jupiterIo.webp';
import europaTexture from './images/jupiterEuropa.webp';
import ganymedeTexture from './images/jupiterGanymede.webp';
import callistoTexture from './images/jupiterCallisto.webp';
import saturnTexture from './images/saturnmap.webp';
import satRingTexture from './images/saturn_ring.webp';
import uranusTexture from './images/uranus.webp';
import uraRingTexture from './images/uranus_ring.webp';
import neptuneTexture from './images/neptune.webp';
import plutoTexture from './images/plutomap.webp';

export function initSolarSystem(container, onPlanetClick) {
  const scene = new THREE.Scene();
  
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 1000 );
  camera.position.set(-175, 115, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.75;
  controls.screenSpacePanning = false;

  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const loadTexture = new THREE.TextureLoader();

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
  outlinePass.edgeStrength = 3;
  outlinePass.edgeGlow = 1;
  outlinePass.visibleEdgeColor.set(0xffffff);
  outlinePass.hiddenEdgeColor.set(0x190a05);
  composer.addPass(outlinePass);

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1, 0.4, 0.85);
  bloomPass.threshold = 1;
  bloomPass.radius = 0.9;
  composer.addPass(bloomPass);

  const lightAmbient = new THREE.AmbientLight(0x222222, 6); 
  scene.add(lightAmbient);

  scene.background = cubeTextureLoader.load([
    bgTexture3.src, bgTexture1.src, bgTexture2.src, bgTexture2.src, bgTexture4.src, bgTexture2.src
  ]);

  const settings = {
    accelerationOrbit: 1,
    acceleration: 1,
    sunIntensity: 1.9
  };

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function updateMouseCoords(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  }

  function onMouseMove(event) {
      event.preventDefault();
      updateMouseCoords(event.clientX, event.clientY);
  }

  let selectedPlanet = null;
  let isMovingTowardsPlanet = false;
  let isZoomingOut = false;
  let targetCameraPosition = new THREE.Vector3();
  let targetControlsTarget = new THREE.Vector3();
  let zoomOutTargetPosition = new THREE.Vector3(-175, 115, 5);
  let offset;

  // The rest of the implementation...
  // We will build the planets and then hook up the interaction loop.

  let sunMat;
  const sunSize = 697/40;
  const sunGeom = new THREE.SphereGeometry(sunSize, 32, 20);
  sunMat = new THREE.MeshStandardMaterial({
    emissive: 0xFFF88F,
    emissiveMap: loadTexture.load(sunTexture.src),
    emissiveIntensity: settings.sunIntensity
  });
  const sun = new THREE.Mesh(sunGeom, sunMat);
  scene.add(sun);

  const pointLight = new THREE.PointLight(0xFDFFD3 , 1200, 400, 1.4);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  scene.add(pointLight);

  function createPlanet(planetName, size, position, tilt, texture, bump, ring, atmosphere, moons){
    let material;
    if (texture instanceof THREE.Material){
      material = texture;
    } else if(bump){
      material = new THREE.MeshPhongMaterial({
        map: loadTexture.load(texture.src),
        bumpMap: loadTexture.load(bump.src),
        bumpScale: 0.7
      });
    } else {
      material = new THREE.MeshPhongMaterial({
        map: loadTexture.load(texture.src)
      });
    } 

    const geometry = new THREE.SphereGeometry(size, 32, 20);
    const planet = new THREE.Mesh(geometry, material);
    const planet3d = new THREE.Object3D();
    const planetSystem = new THREE.Group();
    planetSystem.add(planet);
    let Atmosphere;
    let Ring;
    planet.position.x = position;
    planet.rotation.z = tilt * Math.PI / 180;

    const orbitPath = new THREE.EllipseCurve(0, 0, position, position, 0, 2 * Math.PI, false, 0);
    const pathPoints = orbitPath.getPoints(100);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.03 });
    const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    planetSystem.add(orbit);

    if(ring){
      const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius,30);
      const RingMat = new THREE.MeshStandardMaterial({
        map: loadTexture.load(ring.texture.src),
        side: THREE.DoubleSide
      });
      Ring = new THREE.Mesh(RingGeo, RingMat);
      planetSystem.add(Ring);
      Ring.position.x = position;
      Ring.rotation.x = -0.5 *Math.PI;
      Ring.rotation.y = -tilt * Math.PI / 180;
    }
    
    if(atmosphere){
      const atmosphereGeom = new THREE.SphereGeometry(size+0.1, 32, 20);
      const atmosphereMaterial = new THREE.MeshPhongMaterial({
        map:loadTexture.load(atmosphere.src),
        transparent: true, opacity: 0.4, depthTest: true, depthWrite: false
      })
      Atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMaterial)
      Atmosphere.rotation.z = 0.41;
      planet.add(Atmosphere);
    }

    if(moons){
      moons.forEach(moon => {
        let moonMaterial = new THREE.MeshStandardMaterial({
          map: loadTexture.load(moon.texture.src),
          ...(moon.bump ? { bumpMap: loadTexture.load(moon.bump.src), bumpScale: 0.5 } : {})
        });
        const moonGeometry = new THREE.SphereGeometry(moon.size, 32, 20);
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonMesh.position.set(size * 1.5, 0, 0);
        planetSystem.add(moonMesh);
        moon.mesh = moonMesh;
      });
    }

    // For smaller planets, make the hitbox significantly larger relative to their size
    // to allow easy targeting. For larger planets, keep it close to their actual size.
    // We increase the hitbox sizes significantly to make targeting very forgiving on mobile touch screens
    let hitboxSize = size;
    if (size < 5) {
      hitboxSize = Math.max(size * 3.5, 12.0);
    } else if (size < 10) {
      hitboxSize = size * 2.2;
    } else {
      hitboxSize = size * 1.4;
    }
    const hitboxGeom = new THREE.SphereGeometry(hitboxSize, 16, 16);
    const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitbox = new THREE.Mesh(hitboxGeom, hitboxMat);
    hitbox.name = planetName + "_hitbox";
    planet.add(hitbox);

    planet3d.add(planetSystem);
    scene.add(planet3d);
    return {name: planetName, planet, planet3d, Atmosphere, moons, planetSystem, Ring, hitbox};
  }

  const earthMaterial = new THREE.ShaderMaterial({
    uniforms: {
      dayTexture: { type: "t", value: loadTexture.load(earthTexture.src) },
      nightTexture: { type: "t", value: loadTexture.load(earthNightTexture.src) },
      sunPosition: { type: "v3", value: sun.position }
    },
    vertexShader: `
      varying vec3 vNormal; varying vec2 vUv; varying vec3 vSunDirection;
      uniform vec3 sunPosition;
      void main() {
        vUv = uv;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
        vSunDirection = normalize(sunPosition - worldPosition.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D dayTexture; uniform sampler2D nightTexture;
      varying vec3 vNormal; varying vec2 vUv; varying vec3 vSunDirection;
      void main() {
        float intensity = max(dot(vNormal, vSunDirection), 0.0);
        vec4 dayColor = texture2D(dayTexture, vUv);
        vec4 nightColor = texture2D(nightTexture, vUv)* 0.2;
        gl_FragColor = mix(nightColor, dayColor, intensity);
      }
    `
  });

  const mercury = createPlanet('Mercury', 2.4, 40, 0, mercuryTexture, mercuryBump);
  const venus = createPlanet('Venus', 6.1, 65, 3, venusTexture, venusBump, null, venusAtmosphere);
  const earth = createPlanet('Earth', 6.4, 90, 23, earthMaterial, null, null, earthAtmosphere, [{size: 1.6, texture: earthMoonTexture, bump: earthMoonBump, orbitSpeed: 0.001, orbitRadius: 10}]);
  const mars = createPlanet('Mars', 3.4, 115, 25, marsTexture, marsBump);
  const jupiter = createPlanet('Jupiter', 69/4, 200, 3, jupiterTexture, null, null, null, [
    {size: 1.6, texture: ioTexture, orbitRadius: 20, orbitSpeed: 0.0005},
    {size: 1.4, texture: europaTexture, orbitRadius: 24, orbitSpeed: 0.00025},
    {size: 2, texture: ganymedeTexture, orbitRadius: 28, orbitSpeed: 0.000125},
    {size: 1.7, texture: callistoTexture, orbitRadius: 32, orbitSpeed: 0.00006}
  ]);
  const saturn = createPlanet('Saturn', 58/4, 270, 26, saturnTexture, null, {innerRadius: 18, outerRadius: 29, texture: satRingTexture});
  const uranus = createPlanet('Uranus', 25/4, 320, 82, uranusTexture, null, {innerRadius: 6, outerRadius: 8, texture: uraRingTexture});
  const neptune = createPlanet('Neptune', 24/4, 340, 28, neptuneTexture);
  const pluto = createPlanet('Pluto', 1, 350, 57, plutoTexture);

  const sunHitboxGeom = new THREE.SphereGeometry(sunSize * 1.15, 16, 16);
  const sunHitboxMat = new THREE.MeshBasicMaterial({ visible: false });
  const sunHitbox = new THREE.Mesh(sunHitboxGeom, sunHitboxMat);
  sunHitbox.name = "Sun_hitbox";
  sun.add(sunHitbox);

  const raycastTargets = [
    sunHitbox, mercury.hitbox, venus.hitbox, earth.hitbox, mars.hitbox, 
    jupiter.hitbox, saturn.hitbox, uranus.hitbox, neptune.hitbox, pluto.hitbox
  ];

  function identifyPlanet(clickedObject) {
    if (clickedObject === sunHitbox) return { planet: { name: 'Sun', planet: sun }, offset: 45 };
    if (clickedObject === mercury.hitbox) return { planet: mercury, offset: 10 };
    if (clickedObject === venus.hitbox) return { planet: venus, offset: 25 };
    if (clickedObject === earth.hitbox) return { planet: earth, offset: 25 };
    if (clickedObject === mars.hitbox) return { planet: mars, offset: 15 };
    if (clickedObject === jupiter.hitbox) return { planet: jupiter, offset: 50 };
    if (clickedObject === saturn.hitbox) return { planet: saturn, offset: 50 };
    if (clickedObject === uranus.hitbox) return { planet: uranus, offset: 25 };
    if (clickedObject === neptune.hitbox) return { planet: neptune, offset: 20 };
    if (clickedObject === pluto.hitbox) return { planet: pluto, offset: 10 };
    return null;
  }

  let mouseDownPos = { x: 0, y: 0 };
  let mouseDownTime = 0;

  function onDocumentMouseDown(event) {
    mouseDownPos.x = event.clientX;
    mouseDownPos.y = event.clientY;
    mouseDownTime = performance.now();
    updateMouseCoords(event.clientX, event.clientY);
  }

  function onDocumentMouseUp(event) {
    // Determine the coordinates to use. If event has clientX/clientY, use them.
    // However, on mobile pointerup, clientX/clientY can sometimes be missing or 0.
    // If so, fallback to mouseDownPos.
    const clientX = (event.clientX !== undefined && event.clientX !== 0) ? event.clientX : mouseDownPos.x;
    const clientY = (event.clientY !== undefined && event.clientY !== 0) ? event.clientY : mouseDownPos.y;

    // Only trigger if it was a quick click with minimal movement (not a drag)
    // We increase the threshold from 5px to 15px to account for normal finger shift during touch taps on mobile
    const moveX = Math.abs(clientX - mouseDownPos.x);
    const moveY = Math.abs(clientY - mouseDownPos.y);
    const duration = performance.now() - mouseDownTime;

    if (moveX < 15 && moveY < 15 && duration < 300) {
      event.preventDefault();
      updateMouseCoords(clientX, clientY);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastTargets);
      if (intersects.length > 0) {
        const match = identifyPlanet(intersects[0].object);
        if (match) {
          selectedPlanet = match.planet;
          offset = match.offset;
          settings.accelerationOrbit = 0;
          const planetPosition = new THREE.Vector3();
          selectedPlanet.planet.getWorldPosition(planetPosition);
          targetControlsTarget.copy(planetPosition);
          targetCameraPosition.copy(planetPosition).add(camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset));
          isMovingTowardsPlanet = true;
          isZoomingOut = false;
          if (onPlanetClick) onPlanetClick(selectedPlanet.name);
        }
      }
    }
  }

  window.addEventListener('pointermove', onMouseMove, false);
  window.addEventListener('pointerdown', onDocumentMouseDown, false);
  window.addEventListener('pointerup', onDocumentMouseUp, false);

  let animationId;
  function animate(){
    sun.rotateY(0.001 * settings.acceleration);
    mercury.planet.rotateY(0.001 * settings.acceleration); mercury.planet3d.rotateY(0.004 * settings.accelerationOrbit);
    venus.planet.rotateY(0.0005 * settings.acceleration); if(venus.Atmosphere) venus.Atmosphere.rotateY(0.0005 * settings.acceleration); venus.planet3d.rotateY(0.0006 * settings.accelerationOrbit);
    earth.planet.rotateY(0.005 * settings.acceleration); if(earth.Atmosphere) earth.Atmosphere.rotateY(0.001 * settings.acceleration); earth.planet3d.rotateY(0.001 * settings.accelerationOrbit);
    mars.planet.rotateY(0.01 * settings.acceleration); mars.planet3d.rotateY(0.0007 * settings.accelerationOrbit);
    jupiter.planet.rotateY(0.005 * settings.acceleration); jupiter.planet3d.rotateY(0.0003 * settings.accelerationOrbit);
    saturn.planet.rotateY(0.01 * settings.acceleration); saturn.planet3d.rotateY(0.0002 * settings.accelerationOrbit);
    uranus.planet.rotateY(0.005 * settings.acceleration); uranus.planet3d.rotateY(0.0001 * settings.accelerationOrbit);
    neptune.planet.rotateY(0.005 * settings.acceleration); neptune.planet3d.rotateY(0.00008 * settings.accelerationOrbit);
    pluto.planet.rotateY(0.001 * settings.acceleration); pluto.planet3d.rotateY(0.00006 * settings.accelerationOrbit);

    const time = performance.now();
    if (earth.moons) {
      earth.moons.forEach(m => {
        m.mesh.position.set(earth.planet.position.x + m.orbitRadius * Math.cos(time * m.orbitSpeed), m.orbitRadius * Math.sin(time * m.orbitSpeed) * Math.sin(5*Math.PI/180), earth.planet.position.z + m.orbitRadius * Math.sin(time * m.orbitSpeed) * Math.cos(5*Math.PI/180));
        m.mesh.rotateY(0.01);
      });
    }
    if (jupiter.moons) {
      jupiter.moons.forEach(m => {
        m.mesh.position.set(jupiter.planet.position.x + m.orbitRadius * Math.cos(time * m.orbitSpeed), m.orbitRadius * Math.sin(time * m.orbitSpeed), jupiter.planet.position.z + m.orbitRadius * Math.sin(time * m.orbitSpeed));
        m.mesh.rotateY(0.01);
      });
    }

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(raycastTargets);
    outlinePass.selectedObjects = [];
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (obj === sunHitbox) {
        outlinePass.selectedObjects = [sun];
      } else if (obj === mercury.hitbox) {
        outlinePass.selectedObjects = [mercury.planet];
      } else if (obj === venus.hitbox) {
        outlinePass.selectedObjects = [venus.planet];
      } else if (obj === earth.hitbox) {
        outlinePass.selectedObjects = [earth.planet];
      } else if (obj === mars.hitbox) {
        outlinePass.selectedObjects = [mars.planet];
      } else if (obj === jupiter.hitbox) {
        outlinePass.selectedObjects = [jupiter.planet];
      } else if (obj === saturn.hitbox) {
        outlinePass.selectedObjects = [saturn.planet];
      } else if (obj === uranus.hitbox) {
        outlinePass.selectedObjects = [uranus.planet];
      } else if (obj === neptune.hitbox) {
        outlinePass.selectedObjects = [neptune.planet];
      } else if (obj === pluto.hitbox) {
        outlinePass.selectedObjects = [pluto.planet];
      }
    }

    if (isMovingTowardsPlanet) {
      camera.position.lerp(targetCameraPosition, 0.04);
      controls.target.lerp(targetControlsTarget, 0.04);
      if (camera.position.distanceTo(targetCameraPosition) < 1) isMovingTowardsPlanet = false;
    } else if (isZoomingOut) {
      camera.position.lerp(zoomOutTargetPosition, 0.04);
      controls.target.lerp(new THREE.Vector3(0,0,0), 0.04);
      if (camera.position.distanceTo(zoomOutTargetPosition) < 1) isZoomingOut = false;
    }

    controls.update();
    composer.render();
    animationId = requestAnimationFrame(animate);
  }

  animate();

  function onWindowResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
  }
  window.addEventListener('resize', onWindowResize, false);

  return {
    cleanup: function() {
      cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('pointerdown', onDocumentMouseDown);
      window.removeEventListener('pointerup', onDocumentMouseUp);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    },
    resetCamera: function() {
      isMovingTowardsPlanet = false;
      isZoomingOut = true;
      settings.accelerationOrbit = 1;
    }
  };
}
