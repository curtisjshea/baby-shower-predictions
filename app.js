// Replace FIREBASE_CONFIG with your actual Firebase configuration object
const firebaseConfig = {
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
const predictionsTableBody = document.querySelector("#predictions-table tbody");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const dob = form.dob.value;
    const weight = form.weight.value;
    const sex = form.sex.value;
    const eyeColor = form.eyeColor.value;
    const hairColor = form.hairColor.value;
    const fullName = form.fullName.value;

    await db.collection("predictions").add({
      name,
      dob,
      weight,
      sex,
      eyeColor,
      hairColor,
      fullName
    });

    form.reset();
  });
}

if (predictionsTableBody) {
  // Load predictions from Firestore and display them in the table
  db.collection("predictions").onSnapshot((snapshot) => {
    predictionsTableBody.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const row = `
        <tr>
          <td>${data.name}</td>
          <td>${data.sex}</td>
          <td>${data.dob}</td>
          <td>${data.weight}</td>
          <td>${data.eyeColor}</td>
          <td>${data.hairColor}</td>
          <td>${data.fullName}</td>
        </tr>
      `;
      predictionsTableBody.innerHTML += row;
    });
  });
}
