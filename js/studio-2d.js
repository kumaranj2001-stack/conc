/**
 * Guru Construction - 2D Interactive Floor Planner & Vastu Grid Engine
 * Features:
 * - HTML5 Canvas rendering with live grid snapping
 * - Draw walls, place architectural rooms, doors, and windows
 * - Traditional 9-Zone Vastu Purusha Mandala Compass Overlay (Ishanya, Agneya, Nairutya, Vayavya, Brahmasthan)
 * - Automatic square footage computation
 * - Export directly to image or push as custom technical deliverable!
 */

class GuruFloorPlanner2D {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.gridSize = 25; // 25px = 5 feet scale (1px = 0.2 ft)
    this.rooms = [];
    this.walls = [];
    this.currentTool = 'room'; // 'room', 'wall', 'door', 'select'
    this.selectedRoomType = 'Living Room';
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.showVastuOverlay = true;

    this.roomPalette = {
      'Living Room': { color: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', vastuNote: 'North/East quadrant - Enhances peace & prosperity' },
      'Master Bedroom': { color: 'rgba(236, 72, 153, 0.2)', stroke: '#db2777', vastuNote: 'South-West (Nairutya) - Gives stability & sound health' },
      'Kitchen': { color: 'rgba(249, 115, 22, 0.2)', stroke: '#ea580c', vastuNote: 'South-East (Agneya) - Governed by Fire God Agni' },
      'Pooja Room': { color: 'rgba(234, 179, 8, 0.3)', stroke: '#ca8a04', vastuNote: 'North-East (Ishanya) - Supreme divine & positive energy sector' },
      'Bathroom/Toilet': { color: 'rgba(100, 116, 139, 0.2)', stroke: '#475569', vastuNote: 'West/North-West - Optimal disposal of negativity' },
      'Balcony/Verandah': { color: 'rgba(16, 185, 129, 0.2)', stroke: '#059669', vastuNote: 'North or East - Maximum morning sunlight reception' }
    };

    this.initDefaultLayout();
    this.attachEvents();
    this.resizeCanvas();
    this.render();
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.clientWidth || 800;
      this.canvas.height = 500;
      this.render();
    }
  }

  initDefaultLayout() {
    // Populate starter floor plan matching typical 40x60 plot
    this.rooms = [
      { id: 1, type: 'Living Room', x: 50, y: 50, w: 250, h: 200 },
      { id: 2, type: 'Pooja Room', x: 300, y: 50, w: 125, h: 100 },
      { id: 3, type: 'Kitchen', x: 300, y: 150, w: 175, h: 150 },
      { id: 4, type: 'Master Bedroom', x: 50, y: 250, w: 250, h: 200 }
    ];
  }

  attachEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());

    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));

    // Touch support for shop tablets and phones
    this.canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      this.canvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      this.canvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      const mouseEvent = new MouseEvent('mouseup', {});
      this.canvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    }, { passive: false });
  }

  snapToGrid(val) {
    return Math.round(val / this.gridSize) * this.gridSize;
  }

  getCoords(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return {
      x: this.snapToGrid(x),
      y: this.snapToGrid(y),
      rawX: x,
      rawY: y
    };
  }

  onMouseDown(e) {
    const { x, y } = this.getCoords(e);
    this.isDrawing = true;
    this.startX = x;
    this.startY = y;
    this.currentX = x;
    this.currentY = y;
  }

  onMouseMove(e) {
    if (!this.isDrawing) return;
    const { x, y } = this.getCoords(e);
    this.currentX = x;
    this.currentY = y;
    this.render();
  }

  onMouseUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    const w = this.currentX - this.startX;
    const h = this.currentY - this.startY;

    if (Math.abs(w) >= this.gridSize && Math.abs(h) >= this.gridSize) {
      const rx = w > 0 ? this.startX : this.currentX;
      const ry = h > 0 ? this.startY : this.currentY;
      const rw = Math.abs(w);
      const rh = Math.abs(h);

      this.rooms.push({
        id: Date.now(),
        type: this.selectedRoomType,
        x: rx,
        y: ry,
        w: rw,
        h: rh
      });

      if (window.showToast) {
        window.showToast("Room Placed", `Added ${this.selectedRoomType} (${(rw/5)}' x ${(rh/5)}')`, 'success');
      }
    }
    this.render();
  }

  clearCanvas() {
    this.rooms = [];
    this.walls = [];
    this.render();
    if (window.showToast) window.showToast("Cleared", "Floor plan reset.", "warning");
  }

  toggleVastu() {
    this.showVastuOverlay = !this.showVastuOverlay;
    this.render();
  }

  render() {
    const { ctx, canvas } = this;
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background Grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += this.gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += this.gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 9-Zone Vastu Purusha Mandala Guidelines
    if (this.showVastuOverlay) {
      this.drawVastuZones();
    }

    // Render Placed Rooms
    this.rooms.forEach(room => {
      const meta = this.roomPalette[room.type] || { color: 'rgba(255,255,255,0.2)', stroke: '#ffffff' };
      ctx.fillStyle = meta.color;
      ctx.fillRect(room.x, room.y, room.w, room.h);

      ctx.strokeStyle = meta.stroke;
      ctx.lineWidth = 3;
      ctx.strokeRect(room.x, room.y, room.w, room.h);

      // Room Title & Dimensions (Scale: 5px = 1 foot)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(room.type, room.x + room.w / 2, room.y + room.h / 2 - 4);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px sans-serif';
      const ftW = Math.round(room.w / 5);
      const ftH = Math.round(room.h / 5);
      ctx.fillText(`${ftW}' x ${ftH}' (${ftW * ftH} sq.ft)`, room.x + room.w / 2, room.y + room.h / 2 + 15);
    });

    // Drawing preview rectangle
    if (this.isDrawing) {
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 2;
      ctx.strokeRect(this.startX, this.startY, this.currentX - this.startX, this.currentY - this.startY);
      ctx.setLineDash([]);
    }
  }

  drawVastuZones() {
    const { ctx, canvas } = this;
    const w3 = canvas.width / 3;
    const h3 = canvas.height / 3;

    ctx.save();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    // Draw 3x3 Vastu Mandala Matrix
    ctx.strokeRect(0, 0, w3, h3);
    ctx.strokeRect(w3, 0, w3, h3);
    ctx.strokeRect(w3*2, 0, w3, h3);
    ctx.strokeRect(0, h3, w3, h3);
    ctx.strokeRect(w3, h3, w3, h3);
    ctx.strokeRect(w3*2, h3, w3, h3);
    ctx.strokeRect(0, h3*2, w3, h3);
    ctx.strokeRect(w3, h3*2, w3, h3);
    ctx.strokeRect(w3*2, h3*2, w3, h3);

    // Vastu Quadrant Labels
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(251, 191, 36, 0.7)';
    ctx.textAlign = 'center';

    ctx.fillText('NORTH-WEST (VAYAVYA / AIR)', w3 * 0.5, 20);
    ctx.fillText('NORTH (KUBER / WEALTH)', w3 * 1.5, 20);
    ctx.fillText('NORTH-EAST (ISHANYA / WATER & DIVINE)', w3 * 2.5, 20);

    ctx.fillText('WEST (VARUN)', w3 * 0.5, h3 + 20);
    ctx.fillText('BRAHMASTHAN (ENERGY NUCLEUS - KEEP OPEN)', w3 * 1.5, h3 + 20);
    ctx.fillText('EAST (INDRA / SUNRISE)', w3 * 2.5, h3 + 20);

    ctx.fillText('SOUTH-WEST (NAIRUTYA / EARTH)', w3 * 0.5, h3 * 2 + 20);
    ctx.fillText('SOUTH (YAMA)', w3 * 1.5, h3 * 2 + 20);
    ctx.fillText('SOUTH-EAST (AGNEYA / FIRE - KITCHEN)', w3 * 2.5, h3 * 2 + 20);

    ctx.restore();
  }

  exportPlanAsImage() {
    return this.canvas.toDataURL('image/png');
  }
}

window.GuruFloorPlanner2D = GuruFloorPlanner2D;
