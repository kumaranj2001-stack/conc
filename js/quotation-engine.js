/**
 * Guru Construction - Instant Interactive Quotation & Requirements Builder
 * Computes transparent, dynamic, itemized estimates based on plot specs,
 * floor count, walkthrough video length, vastu compliancy, and selected technical services.
 */

const GURU_SERVICES = [
  { id: 'srv-2d', name: '2D Vastu Planning', ratePerSqFt: 15, baseMin: 12000, desc: 'Detailed floor plans oriented accurately to traditional Vastu Shastra quadrants.' },
  { id: 'srv-3d-elev', name: '3D Elevation Design', ratePerSqFt: 22, baseMin: 18000, desc: 'Photorealistic multi-angle exterior facades with custom textures & lighting.' },
  { id: 'srv-3d-floor', name: '3D Floor Plans', ratePerSqFt: 14, baseMin: 12000, desc: 'Isometric 3D bird’s-eye perspective of furnished interior arrangements.' },
  { id: 'srv-interior', name: 'Interior Designs', ratePerSqFt: 28, baseMin: 25000, desc: 'Room-by-room modular false ceiling, furniture, paint, and lighting details.' },
  { id: 'srv-walkthrough', name: '3D Walkthrough Video', ratePerSqFt: 0, ratePerMinute: 8000, baseMin: 16000, desc: 'Ultra-HD animated walkthrough fly-through cinematic rendering.' },
  { id: 'srv-rcc', name: 'RCC Structural Drawings', ratePerSqFt: 18, baseMin: 15000, desc: 'Column footings, beam reinforcement schedules, slab details for structural stability.' },
  { id: 'srv-cost', name: 'Detailed Cost Estimations', ratePerSqFt: 8, baseMin: 8000, desc: 'Comprehensive BOQ (Bill of Quantities) itemizing cement, steel, bricks & labor.' },
  { id: 'srv-elec', name: 'Electrical Layouts', ratePerSqFt: 7, baseMin: 7000, desc: 'Conduit plans, switchboards, load calculations & distribution charts.' },
  { id: 'srv-plumb', name: 'Plumbing Layouts', ratePerSqFt: 7, baseMin: 7000, desc: 'Water supply pipelines, drainage slopes, rainwater harvesting, sewage schematics.' },
  { id: 'srv-muni', name: 'Municipal Blueprint Approvals', ratePerSqFt: 12, baseMin: 14000, desc: 'Government sanction drawings adhering to municipal by-laws & FAR/FSI norms.' },
  { id: 'srv-land', name: '3D Landscapes', ratePerSqFt: 12, baseMin: 10000, desc: 'Garden architecture, pergolas, driveway pavers, lighting, and foliage design.' }
];

window.GuruQuotationEngine = {
  services: GURU_SERVICES,

  calculateEstimate(params) {
    const {
      plotLength = 40,
      plotWidth = 50,
      totalFloors = 1,
      walkthroughMinutes = 2,
      selectedServiceIds = [],
      vastuConsultation = true
    } = params;

    const plotArea = Math.max(100, plotLength * plotWidth);
    const totalBuiltUpArea = plotArea * totalFloors;

    let subtotal = 0;
    const itemized = [];

    // Loop through selected services
    this.services.forEach(srv => {
      if (selectedServiceIds.includes(srv.id)) {
        let cost = 0;
        let calcNote = "";

        if (srv.id === 'srv-walkthrough') {
          cost = Math.max(srv.baseMin, walkthroughMinutes * srv.ratePerMinute);
          calcNote = `${walkthroughMinutes} Minute(s) 3D cinematic video @ ₹${srv.ratePerMinute.toLocaleString('en-IN')}/min`;
        } else {
          cost = Math.max(srv.baseMin, totalBuiltUpArea * srv.ratePerSqFt);
          calcNote = `${totalBuiltUpArea.toLocaleString('en-IN')} sq.ft built-up area @ ₹${srv.ratePerSqFt}/sq.ft`;
        }

        subtotal += cost;
        itemized.push({
          name: srv.name,
          cost: cost,
          note: calcNote
        });
      }
    });

    // Vastu Certification Surcharge if chosen
    let vastuFee = 0;
    if (vastuConsultation && selectedServiceIds.length > 0) {
      vastuFee = 3500;
      itemized.push({
        name: "Vastu Shastra Astrological Alignment Audit",
        cost: vastuFee,
        note: "Complete cardinal quadrant zoning, Brahmasthan clearance & energy grid report"
      });
      subtotal += vastuFee;
    }

    // GST standard rate (18% for technical architecture & consultancy services)
    const taxRate = 0.18;
    const tax = Math.round(subtotal * taxRate);
    const grandTotal = subtotal + tax;

    return {
      plotArea,
      totalBuiltUpArea,
      totalFloors,
      itemized,
      subtotal,
      tax,
      grandTotal
    };
  }
};
