import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FRAGRANCES } from '../data/fragrances';
import { FragranceId } from '../types/fragrance';
import { playSpritzSound, playCrystalChime } from '../utils/audio';
import { Sparkles, RotateCw, Eye, SprayCan } from 'lucide-react';

interface ThreeBottleCanvasProps {
  currentFragranceId: FragranceId;
  onSelectFragrance?: (id: FragranceId) => void;
  className?: string;
  showControls?: boolean;
}

export const ThreeBottleCanvas: React.FC<ThreeBottleCanvasProps> = ({
  currentFragranceId,
  onSelectFragrance,
  className = '',
  showControls = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isCapOpen, setIsCapOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isSpritzing, setIsSpritzing] = useState(false);
  const [activeFragrance, setActiveFragrance] = useState<FragranceId>(currentFragranceId);

  // Sync internal fragrance when prop changes
  useEffect(() => {
    setActiveFragrance(currentFragranceId);
  }, [currentFragranceId]);

  // Keep references to 3D parts to mutate colors and animations smoothly
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    bottleGroup: THREE.Group;
    capGroup: THREE.Group;
    glassMesh: THREE.Mesh;
    liquidMesh: THREE.Mesh;
    capMesh: THREE.Mesh;
    labelMesh: THREE.Mesh;
    particles: THREE.Points;
    mistParticles: THREE.Points;
    animFrameId: number;
    mouseTarget: { x: number; y: number };
    mouseCurrent: { x: number; y: number };
    scrollRotation: number;
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
  } | null>(null);

  // Helper to create sharp procedural texture for the bottle label
  const createLabelTexture = (fragranceName: string, accentColorHex: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Dark charcoal background with fine brushed luxury border
    ctx.fillStyle = '#0c0a08';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fine gold double border
    ctx.strokeStyle = accentColorHex;
    ctx.lineWidth = 10;
    ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

    ctx.lineWidth = 2;
    ctx.strokeRect(56, 56, canvas.width - 112, canvas.height - 112);

    // Brand Monogram Emblem (interlocking luxury geometric crest)
    ctx.save();
    ctx.translate(canvas.width / 2, 280);
    ctx.strokeStyle = accentColorHex;
    ctx.fillStyle = accentColorHex;
    ctx.lineWidth = 5;

    // Center luxury crest icon
    ctx.beginPath();
    ctx.arc(0, 0, 52, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '36px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('♧', 0, 0);
    ctx.restore();

    // Brand Name: ETHICS
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 78px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '18px';
    ctx.fillText('ETHICS', canvas.width / 2, 460);

    // Fragrance Name
    ctx.fillStyle = accentColorHex;
    ctx.font = '500 52px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '14px';
    ctx.fillText(fragranceName, canvas.width / 2, 570);

    // Subtitle & Concentration
    ctx.fillStyle = '#c7bca9';
    ctx.font = '300 24px "Montserrat", sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('EXTRAIT DE PARFUM', canvas.width / 2, 690);

    ctx.font = '300 20px "Montserrat", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('100 ML  •  3.4 FL. OZ.', canvas.width / 2, 750);

    ctx.fillStyle = '#8f7e65';
    ctx.font = 'italic 18px Georgia, serif';
    ctx.fillText('GRASSE  •  PARIS', canvas.width / 2, 830);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // Renderer setup with ACESFilmic tone mapping & studio lighting
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.2);

    // Studio Environment reflection using RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    // 1. Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfffaec, 3.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // 2. Cool Soft Fill Light
    const fillLight = new THREE.DirectionalLight(0xbad2e8, 1.4);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    // 3. Gold Back/Rim Light for glistening edges
    const rimLight = new THREE.DirectionalLight(0xd4af37, 4.0);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // 4. Subtle ambient & hemisphere
    const hemiLight = new THREE.HemisphereLight(0xfffaee, 0x1a1612, 1.0);
    scene.add(hemiLight);

    // Ground Contact Shadow plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.55;
    scene.add(shadowMesh);

    // Master Bottle Group
    const bottleGroup = new THREE.Group();
    bottleGroup.position.y = -0.15;
    scene.add(bottleGroup);

    // 1. Procedural Heavy Crystal Bottle Body
    // Shape with beveled rounded rectangular luxury silhouette
    const shape = new THREE.Shape();
    const w = 0.95;
    const h = 1.35;
    const r = 0.16;
    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.62,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.12,
    };

    const glassGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    glassGeometry.center();

    // High fidelity glass material with physical transmission & refraction
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.05,
      roughness: 0.04,
      transmission: 0.92,
      ior: 1.54,
      thickness: 1.1,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: 0.96,
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.castShadow = true;
    glassMesh.receiveShadow = true;
    bottleGroup.add(glassMesh);

    // 2. Liquid Core inside the bottle
    const liquidShape = new THREE.Shape();
    const lw = 0.82;
    const lh = 1.15;
    const lr = 0.12;
    liquidShape.moveTo(-lw + lr, -lh);
    liquidShape.lineTo(lw - lr, -lh);
    liquidShape.quadraticCurveTo(lw, -lh, lw, -lh + lr);
    liquidShape.lineTo(lw, lh - lr);
    liquidShape.quadraticCurveTo(lw, lh, lw - lr, lh);
    liquidShape.lineTo(-lw + lr, lh);
    liquidShape.quadraticCurveTo(-lw, lh, -lw, lh - lr);
    liquidShape.lineTo(-lw, -lh + lr);
    liquidShape.quadraticCurveTo(-lw, -lh, -lw + lr, -lh);

    const liquidExtrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.48,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };
    const liquidGeometry = new THREE.ExtrudeGeometry(liquidShape, liquidExtrudeSettings);
    liquidGeometry.center();

    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a140f,
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.65,
      ior: 1.34,
      thickness: 0.8,
      transparent: true,
      opacity: 0.92,
    });
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.z = 0;
    liquidMesh.position.y = -0.06;
    bottleGroup.add(liquidMesh);

    // 3. Thick solid crystal base pedestal
    const baseGeo = new THREE.BoxGeometry(2.1, 0.28, 0.86);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x161412,
      metalness: 0.1,
      roughness: 0.04,
      transmission: 0.95,
      ior: 1.58,
      transparent: true,
      thickness: 1.5,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.45;
    bottleGroup.add(baseMesh);

    // 4. Gold Collar & Neck Ring
    const neckGeo = new THREE.CylinderGeometry(0.32, 0.36, 0.42, 32);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6a855,
      metalness: 0.95,
      roughness: 0.16,
    });
    const neckMesh = new THREE.Mesh(neckGeo, goldMaterial);
    neckMesh.position.y = 1.52;
    neckMesh.castShadow = true;
    bottleGroup.add(neckMesh);

    // Decorative knurled golden trim ring
    const trimGeo = new THREE.TorusGeometry(0.35, 0.04, 16, 48);
    const trimMesh = new THREE.Mesh(trimGeo, goldMaterial);
    trimMesh.rotation.x = Math.PI / 2;
    trimMesh.position.y = 1.38;
    bottleGroup.add(trimMesh);

    // 5. Cap Assembly (Independent group for smooth removal/exploded view)
    const capGroup = new THREE.Group();
    capGroup.position.y = 1.76;
    bottleGroup.add(capGroup);

    // Inner gold atomizer tip
    const atomGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.25, 24);
    const atomMesh = new THREE.Mesh(atomGeo, goldMaterial);
    atomMesh.position.y = 0.1;
    capGroup.add(atomMesh);

    // Heavy faceted luxury cap
    const capGeo = new THREE.CylinderGeometry(0.64, 0.72, 0.74, 8); // 8-faceted octagonal crown
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x12100e,
      metalness: 0.75,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
    });
    const capMesh = new THREE.Mesh(capGeo, capMaterial);
    capMesh.position.y = 0.52;
    capMesh.castShadow = true;
    capGroup.add(capMesh);

    // Cap crown gold crest inlay
    const crestInlayGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.02, 32);
    const crestMesh = new THREE.Mesh(crestInlayGeo, goldMaterial);
    crestMesh.position.y = 0.9;
    capGroup.add(crestMesh);

    // 6. Luxury Front Label Plaque
    const labelGeo = new THREE.PlaneGeometry(1.22, 1.48);
    const labelTexture = createLabelTexture('NOIR', '#c9a568');
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.35,
      metalness: 0.2,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
      transparent: true,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.z = 0.45;
    labelMesh.position.y = -0.05;
    bottleGroup.add(labelMesh);

    // 7. Ambient Floating Golden Embers
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 5.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      particleScales[i] = Math.random() * 0.06 + 0.02;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 225, 160, 1)');
      grad.addColorStop(0.35, 'rgba(214, 168, 85, 0.7)');
      grad.addColorStop(1, 'rgba(214, 168, 85, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Atomizer Spritz Mist System
    const mistCount = 180;
    const mistGeo = new THREE.BufferGeometry();
    const mistPos = new Float32Array(mistCount * 3);
    const mistVel: { x: number; y: number; z: number; life: number }[] = [];
    for (let i = 0; i < mistCount; i++) {
      mistPos[i * 3] = 0;
      mistPos[i * 3 + 1] = 999; // hidden initially
      mistPos[i * 3 + 2] = 0;
      mistVel.push({ x: 0, y: 0, z: 0, life: 0 });
    }
    mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
    const mistMat = new THREE.PointsMaterial({
      size: 0.16,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0,
    });
    const mistParticles = new THREE.Points(mistGeo, mistMat);
    scene.add(mistParticles);

    // Pointer interaction variables
    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };
    let isDragging = false;
    const previousMousePosition = { x: 0, y: 0 };
    let scrollRotation = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition.x = e.clientX;
      previousMousePosition.y = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalized coordinates (-1 to 1) for gentle hovering parallax
      mouseTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseTarget.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        bottleGroup.rotation.y += deltaX * 0.008;
        bottleGroup.rotation.x += deltaY * 0.005;

        // Clamp x rotation to avoid flipping upside down
        bottleGroup.rotation.x = Math.max(-0.45, Math.min(0.45, bottleGroup.rotation.x));

        previousMousePosition.x = e.clientX;
        previousMousePosition.y = e.clientY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollRotation = (scrollY * 0.0018) % (Math.PI * 2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with zero GC & smooth exponential damping
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouseCurrent.x = THREE.MathUtils.damp(mouseCurrent.x, mouseTarget.x, 3.5, delta);
      mouseCurrent.y = THREE.MathUtils.damp(mouseCurrent.y, mouseTarget.y, 3.5, delta);

      // Auto-rotation when not user-dragging
      if (autoRotate && !isDragging) {
        bottleGroup.rotation.y += delta * 0.35;
      }

      // Add gentle hover parallax tilt
      bottleGroup.rotation.y += mouseCurrent.x * 0.015;
      bottleGroup.rotation.x = THREE.MathUtils.damp(bottleGroup.rotation.x, -mouseCurrent.y * 0.22, 2.5, delta);

      // Floating wave motion
      bottleGroup.position.y = -0.15 + Math.sin(elapsed * 1.5) * 0.06;

      // Cap open animation (smooth lift & rotation)
      const targetCapY = isCapOpen ? 2.55 : 1.76;
      const targetCapRotY = isCapOpen ? 0.35 : 0;
      capGroup.position.y = THREE.MathUtils.damp(capGroup.position.y, targetCapY, 4.0, delta);
      capGroup.rotation.y = THREE.MathUtils.damp(capGroup.rotation.y, targetCapRotY, 4.0, delta);

      // Floating golden ember drift
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += delta * 0.12;
        if (positions[i * 3 + 1] > 2.5) {
          positions[i * 3 + 1] = -2.5;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsed * 0.04;

      // Mist animation if spritzing
      if (isSpritzing) {
        const mPos = mistParticles.geometry.attributes.position.array as Float32Array;
        let anyActive = false;
        for (let i = 0; i < mistCount; i++) {
          if (mistVel[i].life > 0) {
            anyActive = true;
            mistVel[i].life -= delta * 1.8;
            mPos[i * 3] += mistVel[i].x * delta;
            mPos[i * 3 + 1] += mistVel[i].y * delta;
            mPos[i * 3 + 2] += mistVel[i].z * delta;
          } else {
            mPos[i * 3 + 1] = 999;
          }
        }
        mistParticles.geometry.attributes.position.needsUpdate = true;
        mistMat.opacity = THREE.MathUtils.damp(mistMat.opacity, anyActive ? 0.85 : 0, 4.0, delta);
        if (!anyActive) {
          setIsSpritzing(false);
        }
      }

      renderer.render(scene, camera);
      sceneRef.current!.animFrameId = requestAnimationFrame(animate);
    };

    sceneRef.current = {
      renderer,
      scene,
      camera,
      bottleGroup,
      capGroup,
      glassMesh,
      liquidMesh,
      capMesh,
      labelMesh,
      particles,
      mistParticles,
      animFrameId: requestAnimationFrame(animate),
      mouseTarget,
      mouseCurrent,
      scrollRotation,
      isDragging,
      previousMousePosition,
    };

    return () => {
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animFrameId);
        renderer.dispose();
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update fragrance materials whenever activeFragrance changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const frag = FRAGRANCES.find((f) => f.id === activeFragrance) || FRAGRANCES[0];

    // Update liquid color and glass tint
    const liquidMat = sceneRef.current.liquidMesh.material as THREE.MeshPhysicalMaterial;
    liquidMat.color.setHex(frag.liquidColorHex);

    const capMat = sceneRef.current.capMesh.material as THREE.MeshPhysicalMaterial;
    capMat.color.setHex(frag.capColorHex);

    // Update label texture
    const newTex = createLabelTexture(frag.name, frag.accentColor);
    if (newTex) {
      const labelMat = sceneRef.current.labelMesh.material as THREE.MeshStandardMaterial;
      if (labelMat.map) labelMat.map.dispose();
      labelMat.map = newTex;
      labelMat.needsUpdate = true;
    }
  }, [activeFragrance]);

  // Handle Spritz action
  const triggerSpritz = () => {
    setIsSpritzing(true);
    playSpritzSound();

    if (!sceneRef.current) return;
    const { mistParticles } = sceneRef.current;
    const mPos = mistParticles.geometry.attributes.position.array as Float32Array;
    const count = mPos.length / 3;

    for (let i = 0; i < count; i++) {
      // Start near atomizer nozzle
      mPos[i * 3] = (Math.random() - 0.5) * 0.1;
      mPos[i * 3 + 1] = 1.6 + Math.random() * 0.1;
      mPos[i * 3 + 2] = 0.2 + (Math.random() - 0.5) * 0.1;

      // Cone spray velocity towards camera
      const angle = (Math.random() - 0.5) * 0.8;
      const speed = 1.2 + Math.random() * 1.8;
      (mistParticles as unknown as { vel?: { x: number; y: number; z: number; life: number }[] }).vel =
        (mistParticles as unknown as { vel?: { x: number; y: number; z: number; life: number }[] }).vel || [];
    }
    mistParticles.geometry.attributes.position.needsUpdate = true;
  };

  const currentData = FRAGRANCES.find((f) => f.id === activeFragrance) || FRAGRANCES[0];

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the 3D bottle in 360°"
      />

      {/* Atmospheric Radial Backlight Aura behind the bottle */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 rounded-full blur-[100px] transition-colors duration-1000 -z-10"
        style={{
          background: `radial-gradient(circle, ${currentData.accentColor}33 0%, rgba(201, 165, 104, 0.12) 45%, transparent 70%)`,
        }}
      />

      {/* Interactive Bottom Control Dock (Complies with Ergonomic UI Directive) */}
      {showControls && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-xl z-20">
          <div className="bg-[#0e0c09]/90 border border-[#c9a568]/30 rounded-2xl px-3 py-2.5 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-2">
            {/* Fragrance Switcher */}
            <div className="flex items-center gap-1.5">
              {FRAGRANCES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveFragrance(f.id);
                    onSelectFragrance?.(f.id);
                    playCrystalChime(f.id === 'noir' ? 440 : f.id === 'velvet' ? 660 : 550);
                  }}
                  className={`px-3 py-1 text-[11px] font-display tracking-widest uppercase rounded-lg transition-all duration-300 ${
                    activeFragrance === f.id
                      ? 'bg-[#c9a568] text-black font-semibold shadow-lg shadow-[#c9a568]/20'
                      : 'text-[#dcd1be] hover:text-[#c9a568] hover:bg-white/5'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>

            {/* Quick Interactive Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={triggerSpritz}
                className="flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-wider uppercase text-[#f0d8a4] hover:text-white bg-white/5 hover:bg-[#c9a568]/20 border border-[#c9a568]/20 rounded-lg transition-colors"
                title="Spritz fragrance mist"
              >
                <SprayCan className="w-3.5 h-3.5 text-[#c9a568]" />
                <span className="hidden sm:inline">Spritz</span>
              </button>

              <button
                onClick={() => {
                  setIsCapOpen(!isCapOpen);
                  playCrystalChime(isCapOpen ? 380 : 580);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-wider uppercase rounded-lg border transition-all ${
                  isCapOpen
                    ? 'bg-[#c9a568]/20 border-[#c9a568] text-[#f0d8a4]'
                    : 'text-[#baa791] hover:text-white border-white/10 hover:border-[#c9a568]/30'
                }`}
                title="Inspect bottle cap / nozzle"
              >
                <Eye className="w-3.5 h-3.5 text-[#c9a568]" />
                <span className="hidden sm:inline">{isCapOpen ? 'Cap Off' : 'Cap On'}</span>
              </button>

              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-1.5 rounded-lg border transition-all ${
                  autoRotate
                    ? 'text-[#c9a568] border-[#c9a568]/40 bg-[#c9a568]/10'
                    : 'text-[#8f8273] border-white/10 hover:text-white'
                }`}
                title={autoRotate ? 'Pause 360° rotation' : 'Resume 360° rotation'}
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
