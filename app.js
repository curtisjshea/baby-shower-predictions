// Replace FIREBASE_CONFIG with your actual Firebase configuration object
const firebaseConfig = {
    // ...
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("prediction-form");
const predictionsList = document.getElementById("predictions-list");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const dob = form.dob.value;
    const weight = form.weight.value;
    const sex = form.sex.value;
    const eyeColor = form["eye-color"].value;
    const hairColor = form["hair-color"].value;
    const fullName = form["full-name"].value;

    await db.collection("predictions").add({
        name,
        dob,
        weight,
        sex,
        eyeColor,
        hairColor,
        fullName,
    });

    form.reset();
});

// Function to create a list item for a prediction
function createPredictionItem(prediction) {
    const li = document.createElement("li");
    li.textContent = `${prediction.name} predicts ${prediction.fullName} will be born on ${prediction.dob} weighing ${prediction.weight} lbs, with ${prediction.eyeColor} eyes, ${prediction.hairColor} hair, and will be a ${prediction.sex}.`;
    return li;
}

// Fetch and display the predictions
db.collection("predictions").orderBy("name").onSnapshot((snapshot) => {
    predictionsList.innerHTML = "";
    snapshot.forEach((doc) => {
        const prediction = doc.data();
        const li = createPredictionItem(prediction);
        predictionsList.appendChild(li);
    });
});
