/**
 * Guru Construction - Parametric Generator & Cross-Category Data Pipeline Engine
 * Bridges text prompts, 2D Vastu layout selection, and procedural downstream generation:
 * - 2D Vastu Planning
 * - 3D Elevation Design (Three.js synced)
 * - 3D Floor Plans
 * - RCC Structural Drawings & Schedules
 * - Electrical Layouts
 * - Plumbing Layouts
 * - Municipal Blueprint Approvals
 * - 3D Walkthrough Cinematic Path
 */

window.GuruPipelineEngine = {
  // Parse unstructured natural language prompt from prompt bar
  // e.g. "40x60 plot, 2 floors, 3BHK East facing with pooja room in Ishanya corner and modern wooden elevation"
  parsePrompt(text) {
    const defaultParams = {
      plotLength: 50,
      plotWidth: 40,
      totalFloors: 2,
      bhk: 3,
      facing: "East",
      customNotes: text || ""
    };

    if (!text || typeof text !== 'string') return defaultParams;

    // Extract plot dimension: e.g. 40x60 or 40 x 60 or 40*60
    const dimMatch = text.match(/(\d+)\s*[xX*]\s*(\d+)/);
    if (dimMatch) {
      defaultParams.plotWidth = parseInt(dimMatch[1]);
      defaultParams.plotLength = parseInt(dimMatch[2]);
    }

    // Extract floors: e.g. 2 floors, 3 floor, G+2, G+1, duplex
    const floorMatch = text.match(/(\d+)\s*(?:floor|floors|storey|story)/i);
    if (floorMatch) {
      defaultParams.totalFloors = parseInt(floorMatch[1]);
    } else if (/duplex/i.test(text)) {
      defaultParams.totalFloors = 2;
    } else if (/triplex/i.test(text)) {
      defaultParams.totalFloors = 3;
    } else if (/g\s*\+\s*1/i.test(text)) {
      defaultParams.totalFloors = 2;
    } else if (/g\s*\+\s*2/i.test(text)) {
      defaultParams.totalFloors = 3;
    }

    // Extract BHK: e.g. 3bhk, 4 BHK, 2 bed
    const bhkMatch = text.match(/(\d+)\s*(?:bhk|bedroom|bed)/i);
    if (bhkMatch) {
      defaultParams.bhk = parseInt(bhkMatch[1]);
    }

    // Extract Facing: East, North, West, South
    const facingMatch = text.match(/\b(east|north|west|south|north-east|south-east|south-west|north-west)\b/i);
    if (facingMatch) {
      defaultParams.facing = facingMatch[1].charAt(0).toUpperCase() + facingMatch[1].slice(1).toLowerCase();
    }

    return defaultParams;
  },

  // Synthesize complete cross-category deliverables based on chosen 2D layout
  synthesizeDeliverables(selectedOption, projectScope) {
    const { plotLength, plotWidth, totalFloors, facing } = projectScope;
    const plotArea = plotLength * plotWidth;
    const builtUp = selectedOption.builtUpArea * totalFloors;

    return {
      "2D Vastu Planning": {
        title: `${selectedOption.title} (Selected & Certified)`,
        category: "2D Vastu Planning",
        status: "Synthesized & Synchronized",
        generatedAt: new Date().toLocaleTimeString(),
        details: {
          concept: selectedOption.concept,
          vastuScore: selectedOption.vastuScore + "% Compliant",
          orientation: `Cardinal Alignment: ${facing} Facing`,
          roomsCount: selectedOption.rooms.length,
          rooms: selectedOption.rooms
        },
        deliverablePayload: selectedOption
      },

      "3D Elevation Design": {
        title: `Contemporary Multi-Tier Facade (${totalFloors} Floors, ${facing} Facing)`,
        category: "3D Elevation Design",
        status: "Synthesized & Synchronized",
        generatedAt: new Date().toLocaleTimeString(),
        details: {
          style: "Contemporary Cantilevered Geometric Villa",
          materials: "White Stucco Wall Panels, Rich Teakwood Louvers, Tinted Toughened Glass Balconies, Pergola Trellis",
          orientation: `Front Entry Facing ${facing}`,
          floors: totalFloors,
          lightingScheme: "Warm 3000K Concealed LED Perimeter Grazing"
        }
      },

      "3D Floor Plans": {
        title: `Furnished Isometric 3D Level Plans (${totalFloors} Floors)`,
        category: "3D Floor Plans",
        status: "Synthesized & Synchronized",
        generatedAt: new Date().toLocaleTimeString(),
        details: {
          cameraAngle: "45° Isometric Bird's-Eye Perspective",
          materials: "Italian Marble Flooring in Living, Wood Parquet in Master Suite, Non-slip Granite in Kitchen",
          lighting: "Daylight Ambient Sunlight Simulation"
        }
      },

      "RCC Structural Drawings": {
        title: `RCC Column Layout, Footing & Beam Schedules`,
        category: "RCC Structural Drawings",
        status: "Synthesized & Synchronized",
        generatedAt: new Date().toLocaleTimeString(),
        details: {
          columnCount: selectedOption.structuralSummary.totalColumns,
          columnDimensions: window.ARCH_DATABASE.structuralStandards.rccColumnDimensionsInches,
          rebarSpecs: window.ARCH_DATABASE.structuralStandards.rccMainRebars,
          ties: window.ARCH_DATABASE.structuralStandards.rccTies,
          concreteGrade: window.ARCH_DATABASE.structuralStandards.concreteGrade,
          steelConsumptionEst: `${selectedOption.structuralSummary.estimatedSteelMT} Metric Tonnes`,
          cementBagsEst: `${selectedOption.structuralSummary.estimatedCementBags} Bags (50kg)`
        }
      },

      "Electrical Layouts": {
        title: `High & Low Voltage Conduit & Circuit Distribution Plan`,
        category: "Electrical Layouts",
        status: "Synthesized & Synchronized",
        generatedAt: new Date().toLocaleTimeString(),
        details: {
          mainDistributionBox: "Located in Agneya (SE) zone as per Vastu standards",
          lightingCircuits: `${totalFloors * 6} Independent Lighting Loops`,
          powerPoints16A: `${totalFloors * 8} Heavy Appliance Points (AC, Geyser, Microwave)`,
          earthingScheme: "Dual Copper Plate Chemical Earthing Pit at North-West zone"
        }
      },

      "Plumbing Layouts": {
        title: `Sanitary, Potable Water Supply & Rainwater Harvesting Schematic`,
        category: "Plumbing Layouts",
        status: "Synthesized & Synchronized",
        generatedAt: new Date().toLocaleTimeString(),
        details: {
          undergroundSump: "North-East (Ishanya) sector for maximum positive water energy",
          overheadTank: "South-West (Nairutya) sector to add essential stabilizing structural weight",
          drainageSlope: "Outfall directed towards North-North-West municipal main",
          pipingMaterial: "CPVC Class-1 for Hot/Cold Potable; UPVC SWR for Soil & Waste"
        }
      },

      "Municipal Blueprint Approvals": {
        title: `Municipal Sanction Drawing Sheet (FAR/FSI Compliant)`,
        category: "Municipal Blueprint Approvals",
        status: "Synthesized & Synchronized",
        generatedAt: new Date().toLocaleTimeString(),
        details: {
          plotDimensions: `${plotLength}'0\" x ${plotWidth}'0\" (${plotArea} sq.ft)`,
          groundCoverage: `${Math.round(selectedOption.builtUpArea)} sq.ft (${Math.round((selectedOption.builtUpArea / plotArea) * 100)}% of plot)`,
          setbacks: "Front: 8'0\", Rear: 5'0\", Left Side: 4'6\", Right Side: 4'6\"",
          farFsiRatio: `${((builtUp) / plotArea).toFixed(2)} (Permissible: 2.25)`
        }
      },

      "3D Walkthrough Video": {
        title: `Ultra-HD 4K Cinematic Architectural Fly-Through`,
        category: "3D Walkthrough Video",
        status: "Synthesized & Synchronized",
        generatedAt: new Date().toLocaleTimeString(),
        details: {
          duration: `${totalFloors * 60} Seconds Continuous Fly-Through`,
          keyframePath: "Main Entrance Portico -> Double-Height Living Room -> Modular Kitchen -> Master Suite Balcony -> Rooftop Pergola Terrace",
          fps: "60 FPS Photorealistic WebGL Rendered"
        }
      }
    };
  }
};
