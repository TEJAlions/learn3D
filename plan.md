# 🎨 3D & React-Three-Fiber Learning Roadmap

## 🎯 1. Three.js Fundamentals

### 🔹 Core Concepts
- Coordinate system (X/Y/Z)
- Units & scale
- Radians vs degrees
- Scene → Mesh → Geometry → Material

### 🔹 Cameras & Lights
- PerspectiveCamera, OrthographicCamera
- Ambient, Directional, Point, Spot lights

### 🔹 Loading 3D Models
- GLTF / GLB formats
- Using GLTFLoader

### 📘 Deep-Dive Resources
- **DiscoverThreeJS (free book)**  
  https://discoverthreejs.com
- **Learn Three.js (traditional book)**  
  https://www.packtpub.com/product/learning-threejs-the-javascript-3d-library-for-webgl-second-edition

---

## ⚛️ 2. React Three Fiber (R3F) — Your Main Toolkit

### 🔹 Core Components
- `<Canvas>`
- `<mesh>`
- `<ambientLight>`, `<spotLight>` etc.

### 🔹 Essential Hooks
- `useFrame` – per-frame animation
- `useThree` – access renderer, camera, viewport
- `useGLTF` – load models easily

### 🔹 Composition
- Split 3D objects into small React components
- Reusable scene structures

### 🎛️ Drei Helpers (Highly Useful)
- `OrbitControls`
- `Environment`
- `ContactShadows`
- `Html`
- `Float`
- `Sky`

Docs: https://github.com/pmndrs/drei

---

## 🎬 3. Animation & Interaction

### 🔹 Animation
- Manual animations with `useFrame`
- Using time, delta, easing functions
- Keyframe animations (GLTF)

### 🔹 User Interaction
- `onPointerOver`
- `onPointerOut`
- `onClick`
- `onPointerMove`

### 🔹 Scroll-Based Effects
- `ScrollControls`
- Section transitions & parallax

Docs: https://docs.pmnd.rs/react-three-fiber

---

## 🎨 4. Integrating UI with 3D
- Framer Motion transitions for UI + 3D
- React Spring for animated props
- Using `<Html>` from Drei for tooltips, overlays
- Blending 2D UI with WebGL scenes

---

## 🌈 5. Advanced Visuals

### 🔹 Lighting & Environments
- HDRIs
- Environment maps
- Light baking

### 🔹 Post-Processing (react-postprocessing)
- Bloom
- Depth-of-field
- Color correction
- God rays (light scattering)

### 🔹 Custom Shaders
- GLSL basics
- ShaderMaterial
- Node-based materials

---

## 🏆 Deep Mastery Resource
### Three.js Journey (Premium course)
The most complete course for 3D web — classic Three.js + R3F sections.  
https://threejs-journey.com

---

## ⚡ 6. Performance & Optimization

### 🔹 Model Optimization
- Reduce poly count
- Compress textures (Basis/WEBP)
- Use Draco compression

### 🔹 Rendering Optimization
- Bake lighting when possible
- Avoid expensive materials
- Use instancing for repeated objects
- Suspense + lazy loading

### 🔹 Mobile Performance
- Dynamic resolution
- Lower shadow quality
- GPU-friendly materials

---

## 🏗️ 7. Full-Site Architecture

### 🔹 Routing & Scene Switching
- React Router
- Multiple Canvas setups
- Shared state using Zustand or Context

### 🔹 Deployment
- Vercel
- Netlify
- GitHub Pages

### 🔹 SEO & Fallbacks
- Serve fallback UI for no-WebGL browsers
- Preloading models
- Progressive enhancement
