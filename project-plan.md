# Project Plan: HSE Logistics Website

## 1. Initial Setup
- [ ] Scaffold Next.js app
- [ ] Add Tailwind CSS
- [ ] Set up Git (optional)

## 2. Firebase Setup
- [ ] Create Firebase project at https://console.firebase.google.com/
- [ ] Enable Firestore, Storage, Hosting, and (optionally) Authentication
- [ ] Download `firebaseConfig` from project settings for web
- [ ] Install Firebase SDK (`npm install firebase`)

## 3. Core Pages & Features
- [ ] Landing page (hero, services, about, footer)
- [ ] Document submission (file drop, upload to Firebase Storage)
- [ ] Careers page (driver application form, multi-section)
- [ ] Contact page (form, info)

## 4. Integration
- [ ] Connect forms to Firestore/Storage
- [ ] Add validation (React Hook Form + Zod)
- [ ] Add modals, dynamic sections

## 5. Deployment
- [ ] Deploy to Firebase Hosting (`firebase deploy`)
- [ ] Set up Cloudflare DNS to point to Firebase
- [ ] Enable SSL, caching, and performance settings

## 6. Polish & Launch
- [ ] SEO optimization
- [ ] Analytics (Firebase or Plausible)
- [ ] Final QA and launch

---

## Firebase Quickstart
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app, copy the config
4. Enable Firestore, Storage, Hosting
5. Use the Firebase CLI to initialize hosting locally

## Cloudflare Quickstart
1. Register or transfer your domain to Cloudflare
2. Set up DNS records to point to Firebase Hosting
3. Enable SSL (Flexible or Full)

---

## Next Steps
- Continue with scaffolding and initial commits
- Ask for Firebase config when ready to integrate backend
