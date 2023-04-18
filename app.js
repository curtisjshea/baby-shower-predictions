// Replace FIREBASE_CONFIG with your actual Firebase configuration object
const firebaseConfig = const firebaseConfig = {
  apiKey: "AIzaSyBe-7yurBiv1JQRPkeINtwCxDXUQXs6m5Y",
  authDomain: "baby-shea-predictions.firebaseapp.com",
  projectId: "baby-shea-predictions",
  storageBucket: "baby-shea-predictions.appspot.com",
  messagingSenderId: "263569611047",
  appId: "1:263569611047:web:e727099ffe322d17d57102",
  measurementId: "G-EY05RNJCEB"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("prediction-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const dob = form.dob.value;
    const weight = form
