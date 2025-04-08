document.getElementById('symptomForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const symptoms = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value;
    const previous = document.getElementById('previous').value;
    const conditions = document.getElementById('conditions').value;
    const travel = document.getElementById('travel').value;
    const allergies = document.getElementById('allergies').value;
    const additional = document.getElementById('additional').value;
    const medications = document.getElementById('medications').value;
    const family = document.getElementById('family').value;
    const food = document.getElementById('food').value;

    const resultDiv = document.getElementById('result');
    const printButton = document.getElementById('printButton');
    resultDiv.innerHTML = "<p>Analyzing symptoms...</p>";

    const analysisResult = analyzeSymptoms(symptoms, duration, previous, conditions, travel, allergies, additional, medications, family, food);
    resultDiv.innerHTML = analysisResult;

    printButton.style.display = 'block';
});
function analyzeSymptoms(symptoms, duration, previous, conditions, travel, allergies, additional, medications, family, food) {

    let result = "<h3>Possible Conditions:</h3>";

    if (symptoms.includes("fever") && symptoms.includes("cough")) {
        result += "<p>Common cold, Flu, COVID-19</p>";
    }
    if (symptoms.includes("headache") && symptoms.includes("dizziness")) {
        result += "<p>Migraine, Dehydration</p>";
    }
    if (symptoms.includes("stomach pain") && symptoms.includes("nausea")) {
        result += "<p>Food Poisoning</p>";
    }

    result += "<h3>Recommended Actions:</h3>";

    if (symptoms.includes("fever") && symptoms.includes("cough")) {
        result += "<p>Rest, stay hydrated</p>";
    }
    if (symptoms.includes("headache") && symptoms.includes("dizziness")) {
        result += "<p>Rest, pain relief medication</p>";
    }
    if (symptoms.includes("stomach pain") && symptoms.includes("nausea")) {
        result += "<p>Hydration, rest</p>";
    }

    result += "<h3>Disclaimer:</h3><p>This is a preliminary assessment. Consult a doctor.</p>";

    return result;
}