# DriverConnect — Deployment Guide

## What you're deploying

| File | Purpose |
|------|---------|
| `public/index.html` | Landing / marketing page |
| `public/login.html` | Driver sign-up & sign-in |
| `public/dashboard.html` | Driver dashboard (profile + ride requests) |
| `public/book.html` | Public booking page riders visit |
| `public/firebase-config.js` | Shared Firebase init (loaded by all pages) |
| `firebase.json` | Firebase Hosting config |
| `.firebaserc` | Links project to `crm-ride-35c9d` |
| `firestore.rules` | Security rules for Firestore |
| `firestore.indexes.json` | Composite indexes for queries |

---

## Step 1 — Enable Firebase services (console, one-time)

Open https://console.firebase.google.com/project/crm-ride-35c9d

### Authentication
1. Click **Authentication** → **Get started**
2. **Sign-in method** tab → enable **Email/Password**
3. Enable **Google** (set a support email when prompted)
4. Under **Settings → Authorized domains** — `crm-ride-35c9d.web.app` should already be listed. Add `localhost` too for local testing.

### Firestore Database
1. Click **Firestore Database** → **Create database**
2. Choose **Start in test mode** (we'll deploy the real rules in Step 3)
3. Pick your region (us-central1 is fine)

### Hosting
1. Click **Hosting** → **Get started** → skip the CLI steps shown — just click through to finish.

---

## Step 2 — Install Firebase CLI (one-time)

You need Node.js installed. Then run:

```bash
npm install -g firebase-tools
```

Verify it works:
```bash
firebase --version
```

---

## Step 3 — Log in & deploy

In your terminal, navigate to the `driverconnect-app` folder:

```bash
cd path/to/driverconnect-app
```

Log in to Firebase:
```bash
firebase login
```

Deploy everything (hosting + Firestore rules + indexes):
```bash
firebase deploy
```

You'll see output like:
```
✔  Deploy complete!
Hosting URL: https://crm-ride-35c9d.web.app
```

---

## Step 4 — Test the full flow

1. **Open** https://crm-ride-35c9d.web.app
2. Click **"Create your driver page"** → sign up with email or Google
3. Fill in the profile form → **Save Profile**
4. Your booking link appears at the top: `https://crm-ride-35c9d.web.app/book.html?d=YOUR_UID`
5. **Copy the link** and open it in a private/incognito window
6. Fill in the booking form → **Send Request**
7. WhatsApp opens with pre-filled ride details → the request also appears in your **Ride Requests** tab instantly (real-time)

---

## Step 5 — Connect GitHub for auto-deploy (optional but recommended)

In Firebase Console → Hosting → **Add GitHub connection**

Every `git push` to your main branch will automatically re-deploy. Zero manual deploys.

Or from CLI:
```bash
firebase init hosting:github
```

---

## Sharing with your first driver

Once deployed, the flow for each driver is:
1. Go to `https://crm-ride-35c9d.web.app` → Create account
2. Build their profile (name, vehicle, services, WhatsApp number, payment links, brand color)
3. Get their unique link: `https://crm-ride-35c9d.web.app/book.html?d=THEIR_UID`
4. Text/WhatsApp that link to their riders

No driver needs to install anything. Riders just open the link.

---

## Troubleshooting

**Google sign-in fails locally** → You must test on the deployed URL, not by opening the HTML file directly. Run `firebase serve` for local HTTPS testing.

**"Missing or insufficient permissions"** → The Firestore rules haven't deployed yet. Run `firebase deploy --only firestore`.

**Booking requests don't appear in dashboard** → The composite index may still be building (takes ~2 min after first deploy). Check Firebase Console → Firestore → Indexes.

**WhatsApp link doesn't open correctly** → Make sure the driver's phone number is saved in international format, e.g. `+13035550100`.

---

## What's next (roadmap)

- [ ] Email notifications when a new booking arrives (Firebase Functions + SendGrid)
- [ ] SMS reminders 24h and 2h before a ride
- [ ] Driver photo upload (Firebase Storage)
- [ ] Custom domain (e.g. `book.driverconnect.app`)
- [ ] Rider accounts + booking history
- [ ] Deposit/cancellation policy enforcement
- [ ] Driver teams & backup routing
