# 🏗️ Guru Construction: Internal Admin Operations Console

> Enterprise architectural management system engineered exclusively for internal shop staff and administrators. Replaces manual client logins and uploads with rule-based generative synthesis, parametric text prompts, and automated cross-category deliverable synchronization.

---

## 🌟 Key Architecture & Operational Updates

1. **Strictly Admin-Only Access:**
   - Removed all client logins, registrations, and client-facing interfaces.
   - The entire platform is now consolidated inside `index.html` as a dedicated **Internal Admin Operations Console**.

2. **Primary Entry Point (Client Details & Project Scope Banner):**
   - Positioned prominently at the very top of the dashboard upon loading.
   - Real-time display of active client name, contact details, plot dimensions, square footage, floor counts, room counts, cardinal Vastu facing, and commercial clearance status.
   - Includes an instant project switcher to swap between client files on the fly.

3. **Collapsible Left-Side Hamburger Menu:**
   - Streamlines category management by moving all 8 core deliverables out of dropdowns into a modern sidebar:
     1. **2D Vastu Planning**
     2. **3D Elevation Design**
     3. **3D Floor Plans**
     4. **RCC Structural Drawings**
     5. **Electrical Layouts**
     6. **Plumbing Layouts**
     7. **Municipal Blueprint Approvals**
     8. **3D Walkthrough Video**
   - Toggles smoothly between expanded and high-density icon mode via the top hamburger button (`☰`).

4. **Built-in Parametric Prompt Bar & Internal Architectural Database:**
   - Replaced manual file uploads with natural language prompt input (e.g., *"40x60 plot, 2 floors, 3BHK East facing with pooja room in Ishanya corner"*).
   - Powered by [arch-database.js](file:///c:/Users/Lenovo%20523/Desktop/constection/js/arch-database.js), encoding Vastu Purusha Mandala quadrant rules and structural engineering standards.
   - Automatically processes dimensions, floors, and notes to generate **two distinct Vastu-compliant 2D options**:
     - **Option A:** Classic Brahmasthan Vastu Courtyard Layout (98% compliance).
     - **Option B:** Contemporary Dynamic Split-Zone Layout (94% compliance).

5. **Cross-Category Propagation & 3D Synchronization:**
   - Selecting a preferred 2D option immediately locks its structural coordinates and automatically synthesizes:
     - Synced **3D Elevation Design** rendered in Three.js WebGL with 360° orbital controls.
     - **3D Floor Plans** with isometric material specifications.
     - **RCC Structural Schedules** (columns, Fe500D rebar quantities, concrete grade, cement bags).
     - **Electrical Layouts** (distribution boards, lighting loops, earthing).
     - **Plumbing Layouts** (NE underground water sump, SW overhead tank, drainage).
     - **Municipal Blueprint Approvals** (plot coverage, setbacks, FAR/FSI ratio).
     - **3D Walkthrough Video** flight paths and keyframe routes.

6. **Integrated Manual Correction Interface:**
   - Allows admins to fine-tune any specific parameter (e.g. wall thickness, balcony depth, column span) and seamlessly synchronize revisions across all downstream deliverables.

---

## 📂 File Directory

```
c:\Users\Lenovo 523\Desktop\constection\
│
├── index.html                  # Internal Admin Console & Integrated Operations Workspace
├── README.md                   # Operations Guide
│
├── css/
│   └── admin-style.css         # Clean, responsive high-density admin theme
│
├── js/
│   ├── arch-database.js        # Internal Architectural & Vastu Purusha Mandala knowledge base
│   ├── pipeline-engine.js      # Parametric text parser & cross-category synthesis engine
│   └── admin-studio-3d.js      # Three.js procedural 3D elevation renderer synced to 2D
│
└── assets/
    └── images/
        └── sample-blueprint-clean.svg # Architectural reference drawing
```

---

## 🚀 Instant Launch in Visual Studio Code

1. Open `c:\Users\Lenovo 523\Desktop\constection` in **VS Code**.
2. Right-click on [index.html](file:///c:/Users/Lenovo%20523/Desktop/constection/index.html) and select **"Open with Live Server"**.
3. Use the **Parametric Prompt Bar** to type custom plot specs or click quick tag presets.
4. Compare **Option A** vs. **Option B**, select your master plan, and toggle through the left sidebar to inspect all 8 synchronized deliverables!
