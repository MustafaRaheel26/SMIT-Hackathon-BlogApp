
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGnvEQqVGdj9Y9xgHiC9ZTy3-xPC3MvDc",
  authDomain: "blogging-app-mustafa.firebaseapp.com",
  projectId: "blogging-app-mustafa",
  storageBucket: "blogging-app-mustafa.appspot.com",
  messagingSenderId: "549288433436",
  appId: "1:549288433436:web:a0137e336bf56a1e5bccd9",
  measurementId: "G-14M39PZJ3T"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);