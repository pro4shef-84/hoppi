# DriverConnect — Exact Testing Steps

## Phase 1: Firebase Console Setup (browser only, ~5 min)

Go to: https://console.firebase.google.com/project/crm-ride-35c9d

---

### 1A — Enable Authentication

1. Click **Authentication** in the left sidebar
2. Click **Get started**
3. Click the **Sign-in method** tab
4. Click **Email/Password** → toggle **Enable** ON → click **Save**
5. Click **Add new provider** → click **Google**
6. Toggle **Enable** ON
7. Set a **Project support email** (use your email) → click **Save**
8. Click **Settings** tab → scroll to **Authorized domains**
9. Confirm `crm-ride-35c9d.web.app` is listed (it should be automatically)

---

### 1B — Create Firestore Database

1. Click **Firestore Database** in the left sidebar
2. Click **Create database**
3. Select **Start in test mode** → click **Next**
4. Choose region: **us-central1 (Iowa)** → click **Enable**
5. Wait ~30 seconds for it to provision

---

### 1C — Enable Hosting

1. Click **Hosting** in the left sidebar
2. Click **Get started**
3. Click **Next** through all the screens (ignore the CLI instructions shown)
4. Click **Continue to console**

---

## Phase 2: Deploy from Your Computer (terminal, ~5 min)

Open Terminal (Mac) or Command Prompt (Windows).

**Step 1 — Install Firebase CLI** (skip if already installed)
```
npm install -g firebase-tools
```

**Step 2 — Navigate to the project folder**
```
cd path/to/driverconnect-app
```
*(Replace with the actual path where you saved the folder)*

**Step 3 — Log in to Firebase**
```
firebase login
```
A browser window opens — sign in with the Google account that owns the Firebase project.

**Step 4 — Deploy everything**
```
firebase deploy
```

You should see:
```
✔  Deploy complete!
Hosting URL: https://crm-ride-35c9d.web.app
```

If you see a Firestore index error, wait 2 minutes and run `firebase deploy` again.

---

## Phase 3: Test the Driver Flow (~3 min)

1. Open **https://crm-ride-35c9d.web.app** in your browser
2. Click **"Create your driver page — free →"**
3. On the login page — click **"Create Account"** tab
4. Enter your email + a password (6+ characters) → click **Create Account**
   - OR click **Continue with Google**
5. You land on the **Dashboard**
6. You should see the orange **"Complete your profile"** banner
7. Fill in all the fields:
   - Driver Name: your name
   - Business Name: e.g. "Marcus Rides"
   - City: your city
   - Vehicle: e.g. "Black Tesla Model 3"
   - WhatsApp/Phone: your real number in international format, e.g. `+13035550100`
   - Check the services you offer
   - Add Venmo/CashApp/Zelle handles
   - Pick a brand color
8. Click **Save Profile**
9. ✅ The dark banner at the top now shows your booking link:
   `https://crm-ride-35c9d.web.app/book.html?d=YOUR_UID`
10. Click **Copy Link** — paste it somewhere to save it

---

## Phase 4: Test the Rider Booking Flow (~2 min)

Do this in an **Incognito / Private window** so you're not logged in as the driver.

1. Paste your booking link into the incognito window and open it
2. ✅ You should see the driver's profile page — name, vehicle, services, brand color
3. Fill in the booking form:
   - Pickup: any address
   - Drop-off: any address
   - Date: tomorrow's date
   - Time: any time
   - Your name + phone number
   - (Optional) notes
4. Click **"Send Ride Request via WhatsApp"**
5. ✅ WhatsApp opens with the full ride details pre-filled and ready to send to the driver's number
6. ✅ The page shows a "Request Sent!" confirmation screen

---

## Phase 5: Verify Real-Time Dashboard (~1 min)

1. Switch back to your original browser window (where you're logged in as the driver)
2. Click the **🗓 Ride Requests** tab
3. ✅ The booking you just submitted appears **instantly** — no refresh needed
4. You'll see the rider's name, phone, pickup, dropoff, date/time
5. Click **✓ Confirm** — the card turns green
6. Click **💬 Reply on WhatsApp** — WhatsApp opens with the rider's number and a pre-filled reply

---

## Phase 6: Test with the Real Driver

Once you've verified everything above works:

1. Send the driver this URL: **https://crm-ride-35c9d.web.app**
2. Tell him to click "Create your driver page" and sign up
3. Have him fill in his real info (his actual WhatsApp number is critical)
4. He gets his own unique booking link
5. He texts that link to a rider he trusts → rider books → driver gets the WhatsApp ping + sees it in his dashboard

---

## Quick Troubleshooting

| Problem | Fix |
|---------|-----|
| Google sign-in says "unauthorized domain" | Go to Firebase Console → Authentication → Settings → Authorized Domains → add `crm-ride-35c9d.web.app` |
| "Missing permissions" error | Run `firebase deploy --only firestore` to push the security rules |
| Ride requests don't show up in dashboard | Wait 2 min for Firestore index to build, then refresh |
| WhatsApp doesn't open | Check the driver's phone number is in international format: `+1XXXXXXXXXX` |
| Page shows blank / broken | Open browser DevTools (F12) → Console tab → share any red errors |

---

## Sharing with multiple drivers

Each driver signs up at **https://crm-ride-35c9d.web.app** independently.
Each gets their own unique booking page at `/book.html?d=THEIR_UID`.
All their data is private — drivers only see their own ride requests.
