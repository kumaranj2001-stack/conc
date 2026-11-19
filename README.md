# 🏗️ Guru Construction: Enterprise Architectural Portal & Client Delivery Vault

> A real-time, responsive construction operations portal engineered for shop counters, mobile tablets, and desktop workstations. Built exclusively using **100% free, zero-cost technologies**: Standard HTML5, CSS3, Vanilla JavaScript, Three.js WebGL, GitHub, and Google Firebase Spark tier.

---

## 🌟 Key Functional Highlights

1. **Lightweight Responsive Design:** Modern, clean, high-contrast, light-themed user interface fully responsive across smartphones, shop tablets, and desktop displays.
2. **Instant Quotation & Scope Builder:** Real-time dynamic calculation of architectural and structural services based on plot length, width, floor levels, walkthrough video duration, and Vastu compliance.
3. **Integrated 2D Vastu Floor Planner:** Interactive HTML5 Canvas tool with grid snapping, room placement (Living Room, Master Bed, Kitchen, Pooja, etc.), and traditional **9-Zone Vastu Purusha Mandala Guidelines** (Ishanya, Agneya, Nairutya, Vayavya, Brahmasthan).
4. **Native 3D Elevation Studio (Three.js):** Real-time 3D WebGL villa visualization supporting orbital 360° rotation, dynamic multi-tier floor levels, contemporary materials (timber, slate, terracotta), and structural wireframe modes.
5. **AI-Assisted Sketch-to-3D Synthesis:** Ingests hand-drawn conceptual sketches or rough blueprints and procedurally generates realistic, dimensionally accurate 3D elevations.
6. **Watermarked Drafting & Version Control:** Shop staff can upload iterative draft drawings with prominent security watermarks for client inspection.
7. **Payment-Gated Digital Vault:** Final high-resolution, unwatermarked CAD and print-ready blueprints unlock automatically only after full payment clearance is verified.
8. **Live Milestone Stepper & Revision Engine:** 5-stage project tracking (Brief → 2D Vastu → 3D Facade → Structural & Revisions → Vault Release) with a collaborative feedback thread.
9. **Zero-Setup Local Engine:** Runs out-of-the-box locally via browser storage, with seamless plug-and-play connection to Google Firebase Spark Tier when ready.

---

## 📂 Project Structure & Hierarchy

```
c:\Users\Lenovo 523\Desktop\constection\
│
├── index.html                  # Public portal, quotation calculator & 2D/3D studio
├── client-portal.html          # Client delivery dashboard, revision thread & digital vault
├── admin.html                  # Shop staff CAD management, project creation & payment override
│
├── css/
│   └── style.css               # Clean enterprise design system with responsive layouts
│
├── js/
│   ├── firebase-config.js      # Firebase Spark config + instant offline storage fallback
│   ├── quotation-engine.js     # Real-time itemized cost calculation engine
│   ├── studio-2d.js            # HTML5 Canvas 2D Floor Planner with Vastu Mandala overlay
│   └── studio-3d.js            # Three.js 3D WebGL procedural elevation renderer & AI sketch parser
│
├── assets/
│   └── images/
│       ├── sample-blueprint-clean.svg # Clean production-ready Vastu blueprint
│       ├── sample-blueprint.svg       # Watermarked inspection draft blueprint
│       ├── sample-elevation-clean.svg # Clean high-res 3D contemporary elevation
│       └── sample-elevation.svg       # Watermarked draft 3D elevation
│
├── firebase.json               # Firebase Live Hosting and deployment configuration
├── firestore.rules             # Role-Based Access Control (RBAC) database security
├── storage.rules               # Payment-gated cloud storage security rules
└── README.md                   # Complete beginner's deployment & maintenance manual
```

---

## 🚀 Beginner's Step-by-Step Deployment Manual

### Step 1: Open and Run in Visual Studio Code (Zero Installation)

1. Open **Visual Studio Code**.
2. Click **File** > **Open Folder...** and select `c:\Users\Lenovo 523\Desktop\constection`.
3. In VS Code, install the free extension **"Live Server"** by Ritwick Dey:
   - Click the Extensions icon on the left sidebar (or press `Ctrl+Shift+X`).
   - Search for `Live Server` and click **Install**.
4. Right-click on `index.html` and select **"Open with Live Server"**.
5. Your default browser will instantly launch the application at `http://127.0.0.1:5500/index.html`!
   - You can test `index.html`, `client-portal.html`, and `admin.html` immediately. All data automatically synchronizes and persists in your browser.

---

### Step 2: Push Source Code to GitHub (Free Version Control)

1. Open PowerShell or the VS Code Integrated Terminal (`Ctrl+\``).
2. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Guru Construction enterprise portal"
   ```
3. Create a free repository on [GitHub.com](https://github.com) named `guru-construction`.
4. Link and push your repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/guru-construction.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 3: Deploy Live on Google Firebase (100% Free Spark Tier)

Google Firebase Spark Tier provides completely free hosting, database, authentication, and file storage with zero monthly fees.

1. Go to [Firebase Console](https://console.firebase.google.com/) and click **Add Project**. Name it `guru-construction`.
2. Under **Build**, enable:
   - **Authentication:** Enable *Email/Password* and *Google* sign-in providers.
   - **Firestore Database:** Click *Create database* in **Production mode**.
   - **Storage:** Click *Get Started* to create your free storage bucket.
   - **Hosting:** Click *Get Started*.
3. Go to **Project Settings** (gear icon) > **General** > **Your apps** > Click the Web icon `</>`.
4. Copy the `firebaseConfig` object and paste it into `js/firebase-config.js` to replace the placeholder keys.
5. In your VS Code terminal, install the free Firebase CLI tool:
   ```bash
   npm install -g firebase-tools
   ```
6. Log in and deploy with two commands:
   ```bash
   firebase login
   firebase deploy
   ```
7. Firebase will provide your live URL (e.g. `https://guru-construction.web.app`) accessible worldwide on any smartphone, tablet, or desktop computer!

---

## 🔒 Security & Payment-Gated Vault Operation

- **Inspection Drafts:** Whenever staff uploads blueprints or 3D renders, selecting "Draft" embeds a prominent copyright inspection watermark overlay.
- **Client Revision Workflow:** Clients can review watermarked drawings in their portal, submit targeted revision requests, and trace revision progress.
- **Digital Vault Unlock:** Once the client or staff records full payment clearance, the application unlocks unwatermarked, high-resolution CAD files, PDFs, and 3D videos for immediate download.

---

## 🛠️ Routine Maintenance & Business Scalability

- **Updating Service Pricing:** Open `js/quotation-engine.js` and edit the `ratePerSqFt` or `baseMin` values in `GURU_SERVICES`.
- **Adding Custom Rooms in 2D Studio:** Open `js/studio-2d.js` and add entries to the `this.roomPalette` dictionary with custom colors and Vastu quadrant descriptions.
- **Customizing 3D Architectural Materials:** Open `js/studio-3d.js` and extend `setMaterialTheme` to introduce stone, marble, or metallic facade finishes.
