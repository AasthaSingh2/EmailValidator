document.getElementById("validateBtn").addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();

    if (!email) {
        alert("Please enter an email address.");
        return;
    }

    const key = "ema_live_NEyMBsdPUPx9VuUspNcYFpEebiHRsgnhFw8KFrkE";
    const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        let resultContainer = document.getElementById("resultContainer");
        let output = "<h3>Validation Details:</h3>";
        for (let key in result) {
            output += `<div><strong>${key}:</strong> ${result[key]}</div>`;
        }
        resultContainer.innerHTML = output;

    } catch (error) {
        console.error("Error during API call:", error);
        alert("Failed to validate the email. Please try again later.");
    }
});
