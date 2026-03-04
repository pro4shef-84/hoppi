// DriverConnect — Firebase Initialization (shared across all pages)
// ─────────────────────────────────────────────────────────────────
// This file is loaded by every page before any Firebase calls.
// Firebase web API keys are safe to include in client-side code;
// access is controlled by Firestore Security Rules.

const firebaseConfig = {
  apiKey:            "AIzaSyBU0bHROzzfdp7sv4kJbzhjlcNPfxwkSFA",
  authDomain:        "crm-ride-35c9d.firebaseapp.com",
  projectId:         "crm-ride-35c9d",
  storageBucket:     "crm-ride-35c9d.firebasestorage.app",
  messagingSenderId: "829090672629",
  appId:             "1:829090672629:web:f10ee291943e1997a7babc",
  measurementId:     "G-66CL3WBQ0S"
};

firebase.initializeApp(firebaseConfig);

const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

// ── Helpers used across pages ──────────────────────────────────────

/** Return the public booking URL for a given driver UID. */
function bookingUrl(uid) {
  return `${location.origin}/book.html?d=${uid}`;
}

/** Format a Firestore Timestamp or ISO string for display. */
function fmtDateTime(val) {
  if (!val) return '—';
  const d = val.toDate ? val.toDate() : new Date(val);
  return d.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });
}

/** Format time string "HH:MM" → "10:30 AM" */
function fmtTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

/** Format date string "YYYY-MM-DD" → "Wednesday, Dec 15" */
function fmtDate(d) {
  if (!d) return '';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
}

/** Get initials from a string (max 2 chars). */
function initials(str) {
  return (str || '?').split(' ').map(w => w[0] || '').join('').toUpperCase().slice(0, 2);
}

/** Copy text to clipboard and briefly update a button label. */
function copyToClipboard(text, btn, label = 'Copied! ✓') {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = label;
    setTimeout(() => { btn.textContent = orig; }, 2200);
  });
}

/** Open WhatsApp with a pre-filled message. */
function openWhatsApp(phone, message) {
  const clean = phone.replace(/\D/g, '');
  window.open(`https://wa.me/${clean}?text=${encodeURIComponent(message)}`, '_blank');
}

/**
 * Create a stable, normalized route key from pickup and dropoff strings.
 * A→B and B→A produce the same key (round-trip deduplication).
 * Used to look up / write route price history in the routePrices subcollection.
 */
function normalizeRoute(pickup, dropoff) {
  const clean = s => (s || '').toLowerCase().trim()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9 ,.\-]/g, '');
  const parts = [clean(pickup), clean(dropoff)].sort();
  return btoa(parts.join('|||'))
    .replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '')
    .slice(0, 100);
}
