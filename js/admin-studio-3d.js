/**
 * Guru Construction - Dedicated Admin 3D Elevation & Studio Engine
 * Renders WebGL 3D architectural facade models procedurally synced with
 * chosen 2D layout parameters and user prompt specifications.
 */

class GuruAdminStudio3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container || typeof THREE === 'undefined') {
      console.warn("Three.js not found or container missing:", containerId);
      return;
    }

    this.floorLevels = 2;
    this.wallColor = 0xffffff;
    this.accentColor = 0xd97706; // Rich amber teakwood
    this.glassColor = 0x38bdf8;
    this.isWireframe = false;
    this.buildingGroup = new THREE.Group();

    this.init();
    this.buildModel();
    this.animate();
  }

  init() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 480;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f172a); // Deep slate studio backdrop

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(38, 28, 48);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(amb);

    const sun = new THREE.DirectionalLight(0xfffbeb, 1.25);
    sun.position.set(45, 60, 35);
    sun.castShadow = true;
    this.scene.add(sun);

    const fill = new THREE.DirectionalLight(0x93c5fd, 0.4);
    fill.position.set(-30, 20, -20);
    this.scene.add(fill);

    // Ground Plane
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Grid Floor
    const grid = new THREE.GridHelper(80, 40, 0x64748b, 0x334155);
    grid.position.y = 0.05;
    this.scene.add(grid);

    this.scene.add(this.buildingGroup);

    this.isDragging = false;
    this.prevMousePos = { x: 0, y: 0 };
    this.target = new THREE.Vector3(0, 8, 0);
    this.camera.lookAt(this.target);

    this.attachMouseEvents();
    window.addEventListener('resize', () => this.onResize());
  }

  attachMouseEvents() {
    const el = this.renderer.domElement;
    el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { this.isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.prevMousePos.x;
      const dy = e.clientY - this.prevMousePos.y;

      const r = Math.sqrt(this.camera.position.x ** 2 + this.camera.position.z ** 2);
      let angle = Math.atan2(this.camera.position.z, this.camera.position.x);
      angle -= dx * 0.008;

      this.camera.position.x = r * Math.cos(angle);
      this.camera.position.z = r * Math.sin(angle);
      this.camera.position.y = Math.max(3, Math.min(65, this.camera.position.y + dy * 0.12));

      this.camera.lookAt(this.target);
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    el.addEventListener('wheel', (e) => {
      const zoom = e.deltaY > 0 ? 1.05 : 0.95;
      this.camera.position.multiplyScalar(zoom);
      this.camera.lookAt(this.target);
      e.preventDefault();
    }, { passive: false });
  }

  onResize() {
    if (!this.container) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight || 480;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  buildModel() {
    while (this.buildingGroup.children.length > 0) {
      this.buildingGroup.remove(this.buildingGroup.children[0]);
    }

    const wallMat = new THREE.MeshStandardMaterial({
      color: this.wallColor,
      roughness: 0.35,
      wireframe: this.isWireframe
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: this.accentColor,
      roughness: 0.45,
      wireframe: this.isWireframe
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: this.glassColor,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      metalness: 0.15,
      wireframe: this.isWireframe
    });

    const floorH = 6;
    const width = 22;
    const depth = 18;

    for (let f = 0; f < this.floorLevels; f++) {
      const y = f * floorH;

      // Slab
      const slabGeo = new THREE.BoxGeometry(width + 2, 0.6, depth + 2);
      const slab = new THREE.Mesh(slabGeo, accentMat);
      slab.position.set(0, y + 0.3, 0);
      slab.castShadow = true;
      slab.receiveShadow = true;
      this.buildingGroup.add(slab);

      // Main Block
      const blockGeo = new THREE.BoxGeometry(width - 2, floorH - 0.6, depth - 2);
      const block = new THREE.Mesh(blockGeo, wallMat);
      block.position.set(0, y + (floorH - 0.6) / 2 + 0.6, 0);
      block.castShadow = true;
      block.receiveShadow = true;
      this.buildingGroup.add(block);

      // Architectural Louver Wall on Right
      const louverGeo = new THREE.BoxGeometry(5.5, floorH - 1, 0.4);
      const louver = new THREE.Mesh(louverGeo, accentMat);
      louver.position.set(width / 2 - 5, y + floorH / 2, depth / 2 + 0.1);
      this.buildingGroup.add(louver);

      // Glass Balcony or Windows
      const winGeo = new THREE.BoxGeometry(9, 3.6, 0.3);
      const win = new THREE.Mesh(winGeo, glassMat);
      win.position.set(-3.5, y + 3.2, depth / 2 + 0.2);
      this.buildingGroup.add(win);

      if (f > 0) {
        const railGeo = new THREE.BoxGeometry(width, 1.8, 0.1);
        const rail = new THREE.Mesh(railGeo, glassMat);
        rail.position.set(0, y + 1.2, depth / 2 + 1);
        this.buildingGroup.add(rail);
      }
    }

    // Modern Cantilevered Roof
    const roofY = this.floorLevels * floorH;
    const roofGeo = new THREE.BoxGeometry(width + 4, 0.8, depth + 4);
    const roof = new THREE.Mesh(roofGeo, accentMat);
    roof.position.set(0, roofY + 0.4, 0);
    roof.castShadow = true;
    this.buildingGroup.add(roof);

    // Pergola Beams
    for (let p = -8; p <= 8; p += 3.2) {
      const pGeo = new THREE.BoxGeometry(0.4, 0.6, depth + 2);
      const pMesh = new THREE.Mesh(pGeo, wallMat);
      pMesh.position.set(p, roofY + 2.4, 0);
      this.buildingGroup.add(pMesh);
    }
  }

  syncWith2DPlan(planData) {
    if (!planData) return;
    this.floorLevels = planData.floors || 2;
    this.buildModel();
  }

  setMaterialTheme(theme) {
    if (theme === 'luxury') {
      this.wallColor = 0xf8fafc;
      this.accentColor = 0xd97706; // Rich amber wood
    } else if (theme === 'minimalist') {
      this.wallColor = 0xffffff;
      this.accentColor = 0x334155; // Graphite stone
    } else if (theme === 'terracotta') {
      this.wallColor = 0xfef3c7;
      this.accentColor = 0xb45309; // Terracotta clay
    }
    this.buildModel();
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    this.buildModel();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (!this.isDragging) {
      this.buildingGroup.rotation.y += 0.0018;
    }
    this.renderer.render(this.scene, this.camera);
  }
}

window.GuruAdminStudio3D = GuruAdminStudio3D;
