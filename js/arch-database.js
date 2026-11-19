/**
 * Guru Construction - Pre-Stored Internal Architectural & Vastu Knowledge Base
 * Powers rule-based generative synthesis for Vastu-compliant 2D plans, 3D elevations,
 * RCC schedules, Electrical, Plumbing, and Municipal Approvals.
 */

window.ARCH_DATABASE = {
  // Traditional Vastu Purusha Mandala Cardinal Rules
  vastuZones: {
    NE: { name: "Ishanya (North-East)", element: "Water / Divine", idealRooms: ["Pooja Room", "Water Sump", "Open Verandah", "Study"], prohibited: ["Toilet", "Kitchen", "Master Bedroom", "Heavy Staircase"], advice: "Supreme positive energy gateway; keep clutter-free and lightweight." },
    E:  { name: "Indra / Surya (East)", element: "Solar Energy", idealRooms: ["Living Room", "Main Entrance", "Balcony", "Bathroom (without WC)"], prohibited: ["Master Bedroom", "Septic Tank"], advice: "Receives morning ultraviolet beneficial solar radiation." },
    SE: { name: "Agneya (South-East)", element: "Agni (Fire)", idealRooms: ["Kitchen", "Electrical Meter / Inverter", "Generator Room"], prohibited: ["Pooja Room", "Master Bedroom", "Underground Water Tank"], advice: "The kitchen burner must face East so the cook faces sunrise." },
    S:  { name: "Yama (South)", element: "Earth / Stability", idealRooms: ["Staircase", "Heavy Storage", "Bedroom"], prohibited: ["Underground Sump", "Main Gate"], advice: "Requires elevated structures and thicker load-bearing walls." },
    SW: { name: "Nairutya (South-West)", element: "Prithvi (Earth / Heaviness)", idealRooms: ["Master Bedroom", "Overhead Water Tank", "Wardrobes", "Safe"], prohibited: ["Pooja Room", "Kitchen", "Toilets", "Open Courtyard"], advice: "Highest and heaviest zone of the building for stability and leadership." },
    W:  { name: "Varun (West)", element: "Water / Sunset", idealRooms: ["Children's Bedroom", "Dining Room", "Study Room", "Overhead Tank"], prohibited: ["Main Sump"], advice: "Good for family dining and children's intellectual focus." },
    NW: { name: "Vayavya (North-West)", element: "Vayu (Air / Movement)", idealRooms: ["Guest Bedroom", "Toilets", "Parking Garage", "Finished Goods Storage"], prohibited: ["Master Bedroom", "Pooja"], advice: "Zone of motion; ideal for toilets and guest turnover." },
    N:  { name: "Kuber (North)", element: "Mercury / Wealth", idealRooms: ["Living Room", "Cash Safe", "North Portico", "Garden"], prohibited: ["Kitchen", "Heavy Stairs", "Toilet"], advice: "Lord of Wealth; maximize openings, windows and light." },
    Center: { name: "Brahmasthan (Core)", element: "Akash (Ether / Space)", idealRooms: ["Open Courtyard", "Central Hall (Clear Space)"], prohibited: ["Pillars", "Walls", "Toilets", "Kitchen"], advice: "The cosmic navel of the house; must remain open, clean and structurally unburdened." }
  },

  // Standard Dimension & Structural Ratios
  structuralStandards: {
    minCeilingHeightFt: 10.5,
    wallThicknessExternalInches: 9,
    wallThicknessInternalInches: 4.5,
    rccColumnDimensionsInches: "9x15",
    rccMainRebars: "4 Nos 16mm TMT Fe500D + 2 Nos 12mm TMT",
    rccTies: "8mm Stirrups @ 6 inches c/c spacing",
    concreteGrade: "M20 / M25",
    plinthBeamHeightInches: 18,
    slabThicknessInches: 5
  },

  // Rule-based Parametric Layout Synthesizer
  generateOptions(params) {
    const {
      plotLength = 50,
      plotWidth = 40,
      totalFloors = 2,
      bhk = 3,
      facing = "East",
      customNotes = ""
    } = params;

    const plotArea = plotLength * plotWidth;
    const builtUpArea = plotArea * 0.72; // Standard FAR coverage leaving setbacks

    // Option A: Classic Vastu Centric Courtyard Layout
    const optionA = {
      optionId: "OPT-A",
      title: "Option A: Classic Brahmasthan Vastu Courtyard Layout",
      concept: "Centralized open-flow Brahmasthan hall with strictly isolated Agneya Kitchen (SE) and Ishanya Pooja (NE). Maximizes natural cross-ventilation and morning solar influx.",
      vastuScore: 98,
      facing: facing,
      builtUpArea: Math.round(builtUpArea),
      floors: totalFloors,
      rooms: [
        { id: "R1", name: "Grand Living & Brahmasthan Hall", zone: "Center / North", x: 15, y: 15, w: 45, h: 40, color: "#e0f2fe", stroke: "#0284c7", vastuNotes: "Central energy circulation; unobstructed light corridor" },
        { id: "R2", name: "Pooja Room (Ishanya)", zone: "NE", x: 62, y: 15, w: 23, h: 22, color: "#fef9c3", stroke: "#ca8a04", vastuNotes: "North-East divine corner; marble pedestal layout" },
        { id: "R3", name: "Modular Kitchen & Utility (Agneya)", zone: "SE", x: 62, y: 55, w: 23, h: 30, color: "#ffedd5", stroke: "#ea580c", vastuNotes: "South-East Fire quadrant; platform oriented East" },
        { id: "R4", name: "Master Bedroom & Dress (Nairutya)", zone: "SW", x: 15, y: 55, w: 32, h: 30, color: "#fce7f3", stroke: "#db2777", vastuNotes: "South-West Earth corner; headrest oriented South" },
        { id: "R5", name: "Attached Bath / WC", zone: "NW / West", x: 48, y: 65, w: 13, h: 20, color: "#f1f5f9", stroke: "#64748b", vastuNotes: "West sanitary alignment with exterior shaft" },
        { id: "R6", name: "Covered Portico & Parking", zone: "East", x: 62, y: 38, w: 23, h: 16, color: "#dcfce7", stroke: "#16a34a", vastuNotes: "East-facing grand entrance lobby" }
      ],
      structuralSummary: {
        totalColumns: 14,
        columnSpanFt: "14'0\" to 16'6\"",
        slabAreaPerFloor: Math.round(builtUpArea),
        estimatedSteelMT: ((builtUpArea * totalFloors * 3.8) / 1000).toFixed(1),
        estimatedCementBags: Math.round((builtUpArea * totalFloors * 0.42))
      }
    };

    // Option B: Contemporary Compact Modernist Vastu Layout
    const optionB = {
      optionId: "OPT-B",
      title: "Option B: Contemporary Dynamic Split-Zone Layout",
      concept: "Optimized for maximum room dimensions, expanded master suites, double-height living room facade, and integrated cantilever balconies on upper floors while retaining cardinal Vastu orientation.",
      vastuScore: 94,
      facing: facing,
      builtUpArea: Math.round(builtUpArea * 1.05),
      floors: totalFloors,
      rooms: [
        { id: "R1", name: "Drawing Room & Foyer", zone: "North / East", x: 15, y: 15, w: 40, h: 35, color: "#eff6ff", stroke: "#2563eb", vastuNotes: "Welcoming North-East formal foyer" },
        { id: "R2", name: "Dining & Family Lounge", zone: "Center", x: 15, y: 52, w: 40, h: 33, color: "#f0fdf4", stroke: "#15803d", vastuNotes: "Connected directly to kitchen" },
        { id: "R3", name: "Designer Kitchen & Pantry", zone: "SE", x: 57, y: 52, w: 28, h: 33, color: "#fff7ed", stroke: "#c2410c", vastuNotes: "South-East Agneya fire alignment" },
        { id: "R4", name: "Pooja Sanctuary", zone: "NE", x: 57, y: 15, w: 28, h: 18, color: "#fefce8", stroke: "#eab308", vastuNotes: "Pure North-East Ishanya alignment" },
        { id: "R5", name: "Guest Bedroom / Study", zone: "NW", x: 57, y: 34, w: 28, h: 17, color: "#f8fafc", stroke: "#475569", vastuNotes: "Vayavya air zone, multi-functional" },
        { id: "R6", name: "Master Suite with Walk-In Closet", zone: "SW", x: 15, y: 65, w: 40, h: 25, color: "#fdf2f8", stroke: "#be185d", vastuNotes: "Heavy South-West position for tranquility" }
      ],
      structuralSummary: {
        totalColumns: 16,
        columnSpanFt: "15'0\" to 18'0\"",
        slabAreaPerFloor: Math.round(builtUpArea * 1.05),
        estimatedSteelMT: ((builtUpArea * 1.05 * totalFloors * 4.0) / 1000).toFixed(1),
        estimatedCementBags: Math.round((builtUpArea * 1.05 * totalFloors * 0.44))
      }
    };

    return { optionA, optionB };
  }
};
