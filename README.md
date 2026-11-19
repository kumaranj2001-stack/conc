# 🏗️ Guru Construction: Centralized Architectural Management Console

> Enterprise architectural synthesis and engineering platform. Features a prompt-driven iterative design engine, direct 3D WebGL synchronization, and real-time parameter verification against authoritative industry regulatory standards (NBC 2016, IS 456, IS 13920, CEA, UPC-I, and Vedic Vastu Mandalas).

---

## 🌟 Key Architecture & Platform Overhaul

1. **Collapsible Responsive Sidebar & Centralized Management Dashboard:**
   - Replaced fragmented administrative desks with an uncluttered, unified **Centralized Management Dashboard** in [index.html](file:///c:/Users/Lenovo%20523/Desktop/github11/conc/index.html).
   - Completely eliminated the Staff Admin clutter and redundant legacy operational portals.
   - Smoothly collapsible sidebar (`☰`) toggles between detailed navigation and high-density icon mode with automatic mobile-responsive off-canvas drawer support.

2. **Prompt-Driven 2D Synthesis & Iterative Edits Engine:**
   - Upgraded the 2D planning module into an intelligent, prompt-driven synthesis engine ([pipeline-engine.js](file:///c:/Users/Lenovo%20523/Desktop/github11/conc/js/pipeline-engine.js)).
   - Supports natural language plot definitions (e.g., *"40x60 plot, 2 floors, 3BHK East facing with pooja room in Ishanya corner"*).
   - **Iterative prompt editing**: Directly accept refinement instructions (e.g. *"Expand master suite and shift kitchen strictly to South-East Agneya"*) and immediately re-synthesizes the structural footprint without manual redrawing.

3. **Dynamic External Regulatory Standards Verification:**
   - Sourced and verified all structural, architectural, and Vastu standards dynamically via [arch-database.js](file:///c:/Users/Lenovo%20523/Desktop/github11/conc/js/arch-database.js) against authoritative industry standards before generation occurs:
     - **NBC 2016 (National Building Code of India):** Setbacks, coverage, daylight, and life safety.
     - **IS 456:2000 & IS 13920:2016:** Limit state concrete design, ductile rebar detailing, and seismic confinement.
     - **Vastu Purusha Mandala (Brihat Samhita & Manasara):** 81-Pada cardinal energy grid alignment.
     - **Central Electricity Authority (CEA) & IS 732:2019:** Load balancing, diversity factor, dual earthing.
     - **Uniform Plumbing Code - India (UPC-I) & CPHEEO:** 135 LPCD potable water demand and drainage gradients.
     - **Model Building Bye-Laws (MBBL 2016):** Permissible FAR/FSI and ground coverage ratios.

4. **Dynamic 3D WebGL Model Synchronization:**
   - Synchronizes every 2D structural edit and story adjustment in real time with a fully realized Three.js WebGL model ([admin-studio-3d.js](file:///c:/Users/Lenovo%20523/Desktop/github11/conc/js/admin-studio-3d.js)).
   - Features 360° orbital controls, plinth foundation detailing, architectural wooden louvers, cantilevered glass balconies, rooftop pergolas, and Vastu water tanks.

5. **Integrated Downstream Deliverables Package:**
   - **RCC Structural Drawings & Schedules:** Column sizing, Fe500D rebar matrices, and seismic stirrups.
   - **Material Estimations (Civil BOQ):** Automated takeoff for concrete ($m^3$), cement bags, TMT steel tonnage, M-Sand, coarse aggregates, and bricks per BIS SP:27 handbook.
   - **MEP Layouts (Electrical & Plumbing):** Connected electrical load, 3-phase/single-phase demand, underground sumps, overhead tanks, and sanitary lines.
   - **Municipal Blueprint Sanction Sheets:** Coverage percentages, setbacks, and FAR calculation.
   - **3D Cinematic Walkthrough Keyframes:** Camera flight trajectories and render specifications.

---

## 📁 Project Structure

```
c:\Users\Lenovo 523\Desktop\github11\conc\
│
├── index.html                  # Centralized Management Dashboard & Operations Workspace
├── client-portal.html          # Clean Client View & Inspection Portal
├── README.md                   # System Architecture & Compliance Guide
│
├── css/
│   ├── admin-style.css         # Responsive dashboard styling & collapsible sidebar
│   └── style.css               # Core base stylesheet
│
├── js/
│   ├── arch-database.js        # Authoritative Industry Standards & Regulatory Verification Hub
│   ├── pipeline-engine.js      # Prompt-driven iterative synthesis & cross-category pipeline
│   ├── admin-studio-3d.js      # Synced Three.js 3D WebGL elevation studio
│   ├── quotation-engine.js     # Commercial quotation engine
│   └── firebase-config.js      # Cloud synchronization & data persistence layer
│
└── assets/
    └── images/                 # Architectural SVG blueprints & elevation drawings
```

---

## 🚀 How to Run & Verify

1. Open [index.html](file:///c:/Users/Lenovo%20523/Desktop/github11/conc/index.html) in your browser (or use VS Code Live Server).
2. Observe the **uncluttered Centralized Management Dashboard** with the responsive collapsible sidebar (`☰`).
3. View the **Live Industry Standards Telemetry Bar** verifying compliance against NBC 2016, IS 456, IS 13920, CEA, and UPC-I.
4. Input a prompt into the **Parametric Architectural Prompt Bar** or click a quick-action tag to synthesize verified 2D layout options.
5. Select a layout and switch categories in the sidebar to review synchronized **3D WebGL Models**, **RCC Structural Schedules**, **Civil BOQ Material Estimations**, **Electrical Layouts**, and **Plumbing Layouts**.
