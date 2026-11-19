/**
 * Guru Construction - Core Firebase Config & Offline Fallback Bridge
 * Configured specifically for Google Firebase Spark Tier (100% Free)
 * Automatically falls back to high-fidelity LocalStorage / IndexedDB mock
 * if Firebase keys are unpopulated, ensuring zero-setup instant browser execution!
 */

// 1. Your Firebase Configuration (From Firebase Console: Project Settings > Web App)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "guru-construction-portal.firebaseapp.com",
  projectId: "guru-construction-portal",
  storageBucket: "guru-construction-portal.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// State flags
window.GURU_CONFIG = {
  appName: "Guru Construction & Architectural Solutions",
  tagline: "Premier Real-Time Construction Management & Client Delivery Portal",
  isFirebaseActive: false,
  currencySymbol: "₹",
  staffKey: "GURU_STAFF_2026", // Easy verification pass for shop admin setup
};

// Try initializing Firebase if keys are replaced, otherwise engage Mock Data Layer
try {
  if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY_HERE") {
    firebase.initializeApp(firebaseConfig);
    window.guruAuth = firebase.auth();
    window.guruDb = firebase.firestore();
    window.guruStorage = firebase.storage();
    window.GURU_CONFIG.isFirebaseActive = true;
    console.log("✅ [Guru Construction] Live Firebase Spark connected successfully!");
  } else {
    console.info("⚡ [Guru Construction] Running in Zero-Setup Offline/Demo Mode with Real-Time Local Storage engine.");
  }
} catch (err) {
  console.warn("⚠️ [Guru Construction] Firebase init skipped, engaging offline engine:", err);
}

/**
 * Universal Mock Storage and Realtime Repository
 * Guarantees that all client orders, staff uploads, cost quotes,
 * revision requests, and notification feeds work immediately out-of-the-box!
 */
class GuruLocalStore {
  constructor() {
    this.initDefaultData();
  }

  initDefaultData() {
    // Seed Sample Projects if empty
    if (!localStorage.getItem('guru_projects')) {
      const defaultProjects = [
        {
          id: "GC-2026-001",
          clientName: "Vikram Rathore",
          clientEmail: "vikram@example.com",
          clientPhone: "+91 98765 43210",
          projectTitle: "Modern Duplex Villa with Vastu North-East Entry",
          plotLength: 40,
          plotWidth: 60,
          totalFloors: 2,
          roomCount: 5,
          vastuCompliant: true,
          services: [
            "2D Vastu Planning",
            "3D Elevation Design",
            "RCC Structural Drawings",
            "3D Walkthrough Video"
          ],
          totalQuotation: 68500,
          amountPaid: 35000,
          paymentStatus: "Partial", // Pending, Partial, Paid
          status: "Drafting", // Submitted, Drafting, Review, Approved, Completed
          milestone: 2, // 1: Consultation, 2: 2D Draft, 3: 3D Visualization, 4: Structural & Revisions, 5: Final Vault Clearance
          createdAt: "2026-11-15T10:30:00.000Z",
          deliverables: [
            {
              id: "DEL-101",
              name: "Ground Floor Vastu Blueprint (Rev 1.2)",
              category: "2D Vastu Planning",
              isWatermarked: true,
              previewUrl: "assets/images/sample-blueprint.svg",
              finalVaultUrl: "assets/images/sample-blueprint-clean.svg",
              version: "1.2",
              uploadedAt: "2026-11-16T14:20:00.000Z"
            },
            {
              id: "DEL-102",
              name: "Contemporary Facade 3D Elevation Preview",
              category: "3D Elevation Design",
              isWatermarked: true,
              previewUrl: "assets/images/sample-elevation.svg",
              finalVaultUrl: "assets/images/sample-elevation-clean.svg",
              version: "1.0",
              uploadedAt: "2026-11-17T11:00:00.000Z"
            }
          ],
          revisions: [
            {
              id: "REV-01",
              date: "2026-11-17T16:00:00.000Z",
              author: "Client (Vikram Rathore)",
              notes: "Please shift the Pooja room slightly more towards Ishanya (North-East) corner and widen balcony.",
              status: "In-Progress"
            }
          ]
        },
        {
          id: "GC-2026-002",
          clientName: "Ananya Sharma",
          clientEmail: "ananya@example.com",
          clientPhone: "+91 99887 76655",
          projectTitle: "Commercial Showroom & Multi-Tier Office Complex",
          plotLength: 50,
          plotWidth: 80,
          totalFloors: 3,
          roomCount: 12,
          vastuCompliant: true,
          services: [
            "2D Vastu Planning",
            "3D Elevation Design",
            "Municipal Blueprint Approvals",
            "Electrical Layouts",
            "Plumbing Layouts",
            "Detailed Cost Estimations"
          ],
          totalQuotation: 145000,
          amountPaid: 145000,
          paymentStatus: "Paid",
          status: "Completed",
          milestone: 5,
          createdAt: "2026-11-10T09:15:00.000Z",
          deliverables: [
            {
              id: "DEL-201",
              name: "Sanctioned Municipal Approval Drawings",
              category: "Municipal Blueprint Approvals",
              isWatermarked: false,
              previewUrl: "assets/images/sample-blueprint.svg",
              finalVaultUrl: "assets/images/sample-blueprint-clean.svg",
              version: "Final",
              uploadedAt: "2026-11-14T10:00:00.000Z"
            }
          ],
          revisions: []
        }
      ];
      localStorage.setItem('guru_projects', JSON.stringify(defaultProjects));
    }

    // Seed Notifications
    if (!localStorage.getItem('guru_notifications')) {
      const defaultNotifs = [
        {
          id: "NOTIF-1",
          title: "New Draft Blueprint Uploaded",
          message: "Staff has uploaded Ground Floor Vastu Blueprint (Rev 1.2) with inspection watermark for GC-2026-001.",
          time: "2 hours ago",
          targetRole: "client",
          isRead: false
        },
        {
          id: "NOTIF-2",
          title: "Revision Request Received",
          message: "Client Vikram Rathore requested adjustments for Pooja room positioning.",
          time: "1 hour ago",
          targetRole: "staff",
          isRead: false
        }
      ];
      localStorage.setItem('guru_notifications', JSON.stringify(defaultNotifs));
    }

    // Current Session Store
    if (!sessionStorage.getItem('guru_session_user')) {
      // Default guest
      sessionStorage.setItem('guru_session_user', JSON.stringify({
        role: 'guest',
        name: 'Guest Visitor'
      }));
    }
  }

  // Get all projects
  getProjects() {
    return JSON.parse(localStorage.getItem('guru_projects') || '[]');
  }

  // Save project
  saveProject(project) {
    const list = this.getProjects();
    const idx = list.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      list[idx] = project;
    } else {
      list.unshift(project);
    }
    localStorage.setItem('guru_projects', JSON.stringify(list));
    this.addNotification("Project Updated", `Order ${project.id} updated successfully.`, "both");
    return project;
  }

  // Get project by ID
  getProjectById(id) {
    const list = this.getProjects();
    return list.find(p => p.id === id);
  }

  // Notifications
  getNotifications() {
    return JSON.parse(localStorage.getItem('guru_notifications') || '[]');
  }

  addNotification(title, message, targetRole = 'both') {
    const list = this.getNotifications();
    const newNotif = {
      id: "NOTIF-" + Date.now(),
      title,
      message,
      time: "Just now",
      targetRole,
      isRead: false
    };
    list.unshift(newNotif);
    localStorage.setItem('guru_notifications', JSON.stringify(list));
    if (window.showToast) {
      window.showToast(title, message, 'info');
    }
  }

  // Session
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('guru_session_user') || '{"role":"guest"}');
  }

  setCurrentUser(user) {
    sessionStorage.setItem('guru_session_user', JSON.stringify(user));
  }

  logout() {
    sessionStorage.removeItem('guru_session_user');
    window.location.href = 'index.html';
  }
}

window.guruStore = new GuruLocalStore();

// Utility: Toast Messenger
window.showToast = function(title, message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div style="font-size: 1.3rem;">
      ${type === 'success' ? '✅' : type === 'danger' ? '⚠️' : '📢'}
    </div>
    <div style="flex: 1;">
      <div style="font-weight: 700; font-size: 0.95rem; color: #1e293b;">${title}</div>
      <div style="font-size: 0.84rem; color: #64748b; margin-top: 2px;">${message}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:1.1rem;">&times;</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
};
