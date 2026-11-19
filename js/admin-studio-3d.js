/**
 * Guru Construction - Dedicated Admin 3D Elevation & Studio Engine
 * Renders WebGL 3D architectural models dynamically synchronized with
 * iterative 2D prompt synthesis and real-time room/story modifications.
 */

class GuruAdminStudio3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container || typeof THREE === 'undefined') {
      console.warn("Three.js not found or container missing:", containerId);
      return;
    }

    this.floorLevels = 2;
    this.plotWidth = 40;
    this.plotLength = 60;
    this.facing = "East";
    this.wallColor = 0xf8fafc;
    this.accentColor = 0xd97706; // Rich amber teakwood
    this.glassColor = 0x38bdf8;
    this.roofColor = 0x334155;
    this.isWireframe = false;
    this.buildingGroup = new THREE.Group();
    this.currentPlanData = null;

    this.init();
    this.buildModel();
    this.animate();
  }

  init() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 480;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0f1d); // Deep architectural slate backdrop

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(42, 32, 52);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // Realistic Architectural Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.35);
    sunLight.position.set(50, 75, 40);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;
    const d = 50;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    this.scene.add(sunLight);

    const skyFill = new THREE.DirectionalLight(0x93c5fd, 0.45);
    skyFill.position.set(-40, 30, -30);
    this.scene.add(skyFill);

    // Landscaped Ground Plane
    const groundGeo = new THREE.PlaneGeometry(120, 120);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0x166534, 
      roughness: 0.9,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Paved Pathway / Driveway
    const driveGeo = new THREE.PlaneGeometry(18, 50);
    const driveMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
    const drive = new THREE.Mesh(driveGeo, driveMat);
    drive.rotation.x = -Math.PI / 2;
    drive.position.set(0, 0.02, 28);
    drive.receiveShadow = true;
    this.scene.add(drive);

    // Precision Grid
    const grid = new THREE.GridHelper(100, 50, 0x38bdf8, 0x1e293b);
    grid.position.y = 0.04;
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
      angle -= dx * 0.007;

      this.camera.position.x = r * Math.cos(angle);
      this.camera.position.z = r * Math.sin(angle);
      this.camera.position.y = Math.max(4, Math.min(75, this.camera.position.y + dy * 0.14));

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
      metalness: 0.05,
      wireframe: this.isWireframe
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: this.accentColor,
      roughness: 0.5,
      metalness: 0.1,
      wireframe: this.isWireframe
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: this.glassColor,
      transparent: true,
      opacity: 0.68,
      roughness: 0.08,
      metalness: 0.2,
      reflectivity: 0.85,
      wireframe: this.isWireframe
    });

    const roofMat = new THREE.MeshStandardMaterial({
      color: this.roofColor,
      roughness: 0.4,
      wireframe: this.isWireframe
    });

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.85,
      wireframe: this.isWireframe
    });

    // Scale dimensions based on plot specs
    const scaleFactor = Math.min(1.4, Math.max(0.7, (this.plotWidth * this.plotLength) / 2400));
    const width = 22 * scaleFactor;
    const depth = 20 * scaleFactor;
    const floorH = 6.2;

    // Plinth Foundation Beam
    const plinthGeo = new THREE.BoxGeometry(width + 3, 1.2, depth + 3);
    const plinth = new THREE.Mesh(plinthGeo, concreteMat);
    plinth.position.set(0, 0.6, 0);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    this.buildingGroup.add(plinth);

    // Multi-tier Stories
    for (let f = 0; f < this.floorLevels; f++) {
      const y = 1.2 + f * floorH;

      // Reinforced Concrete Floor Slab
      const slabGeo = new THREE.BoxGeometry(width + 2, 0.7, depth + 2);
      const slab = new THREE.Mesh(slabGeo, woodMat);
      slab.position.set(0, y + 0.35, 0);
      slab.castShadow = true;
      slab.receiveShadow = true;
      this.buildingGroup.add(slab);

      // Main Living Volume
      const blockW = width - 2.5;
      const blockD = depth - 2.5;
      const blockGeo = new THREE.BoxGeometry(blockW, floorH - 0.7, blockD);
      const block = new THREE.Mesh(blockGeo, wallMat);
      block.position.set(0, y + (floorH - 0.7) / 2 + 0.7, 0);
      block.castShadow = true;
      block.receiveShadow = true;
      this.buildingGroup.add(block);

      // Contemporary Vertical Louver Screening
      const louverGeo = new THREE.BoxGeometry(6.5 * scaleFactor, floorH - 1.2, 0.5);
      const louver = new THREE.Mesh(louverGeo, woodMat);
      louver.position.set(blockW / 2 - (3.5 * scaleFactor), y + floorH / 2, blockD / 2 + 0.2);
      louver.castShadow = true;
      this.buildingGroup.add(louver);

      // Large Architectural Glass Windows (Double-Height Glazing look)
      const winGeo = new THREE.BoxGeometry(8 * scaleFactor, 3.8, 0.3);
      const win = new THREE.Mesh(winGeo, glassMat);
      win.position.set(-4 * scaleFactor, y + 3.4, blockD / 2 + 0.2);
      this.buildingGroup.add(win);

      // Modern Balcony with Toughened Glass Railing
      if (f > 0) {
        const balcSlabGeo = new THREE.BoxGeometry(width, 0.5, 4.5);
        const balcSlab = new THREE.Mesh(balcSlabGeo, concreteMat);
        balcSlab.position.set(0, y + 0.25, blockD / 2 + 2.25);
        balcSlab.castShadow = true;
        this.buildingGroup.add(balcSlab);

        const railGeo = new THREE.BoxGeometry(width, 1.8, 0.15);
        const rail = new THREE.Mesh(railGeo, glassMat);
        rail.position.set(0, y + 1.25, blockD / 2 + 4.3);
        this.buildingGroup.add(rail);

        // Steel handrail bar
        const handrailGeo = new THREE.BoxGeometry(width, 0.15, 0.2);
        const handrail = new THREE.Mesh(handrailGeo, woodMat);
        handrail.position.set(0, y + 2.15, blockD / 2 + 4.3);
        this.buildingGroup.add(handrail);
      }
    }

    // Modern Cantilevered Parapet / Rooftop Terrace
    const roofY = 1.2 + this.floorLevels * floorH;
    const roofGeo = new THREE.BoxGeometry(width + 3.5, 0.9, depth + 3.5);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, roofY + 0.45, 0);
    roof.castShadow = true;
    this.buildingGroup.add(roof);

    // Rooftop Pergola Trellis Feature
    for (let p = -8; p <= 8; p += 3.2) {
      const pGeo = new THREE.BoxGeometry(0.4, 0.7, depth + 1.5);
      const pMesh = new THREE.Mesh(pGeo, woodMat);
      pMesh.position.set(p * scaleFactor, roofY + 2.4, 0);
      pMesh.castShadow = true;
      this.buildingGroup.add(pMesh);
    }

    // Vastu OHWT in Nairutya (South-West corner)
    const tankGeo = new THREE.CylinderGeometry(2, 2, 3.5, 16);
    const tank = new THREE.Mesh(tankGeo, concreteMat);
    tank.position.set(-width / 3, roofY + 2.5, -depth / 3);
    tank.castShadow = true;
    this.buildingGroup.add(tank);

    // Target Camera to Centroid
    this.target.set(0, (roofY) / 2, 0);
  }

  // Iteratively sync with structural plan modifications
  syncWith2DPlan(planData, scope) {
    if (!planData) return;
    this.currentPlanData = planData;
    if (scope) {
      this.floorLevels = scope.totalFloors || 2;
      this.plotWidth = scope.plotWidth || 40;
      this.plotLength = scope.plotLength || 60;
      this.facing = scope.facing || "East";
    } else if (planData.floors) {
      this.floorLevels = planData.floors;
    }
    this.buildModel();
  }

  setMaterialTheme(theme) {
    if (theme === 'luxury') {
      this.wallColor = 0xf8fafc;
      this.accentColor = 0xd97706; // Rich amber teakwood
      this.roofColor = 0x334155;
    } else if (theme === 'minimalist') {
      this.wallColor = 0xffffff;
      this.accentColor = 0x475569; // Slate graphite
      this.roofColor = 0x0f172a;
    } else if (theme === 'terracotta') {
      this.wallColor = 0xfef3c7;
      this.accentColor = 0xb45309; // Warm rustic clay
      this.roofColor = 0x78350f;
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
