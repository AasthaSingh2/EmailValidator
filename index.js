// Get DOM elements
const validateBtn = document.getElementById('validateBtn');
const emailInput = document.getElementById('email');
const resultContainer = document.getElementById('resultContainer');
const loadingIndicator = document.getElementById('loading');
const themeToggleBtn = document.getElementById('themeToggle');
const emailFeedback = document.getElementById('emailFeedback');
const contactForm = document.getElementById('contactForm');

// API key
const apiKey = "ema_live_NEyMBsdPUPx9VuUspNcYFpEebiHRsgnhFw8KFrkE";

// Real-Time Email Validation
emailInput.addEventListener('input', () => {
    const emailValue = emailInput.value.trim();
    if (emailValue && !validateEmail(emailValue)) {
        emailFeedback.textContent = "Invalid email format!";
    } else {
        emailFeedback.textContent = "";
    }
});

// Validate Email on Button Click
validateBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();

    // Pre-validation: check if the email field is empty
    if (!email) {
        alert("Please enter an email address.");
        return;
    }

    // Show loading indicator
    loadingIndicator.style.display = 'block';
    resultContainer.innerHTML = ''; // Clear previous results

    try {
        // API request URL
        const url = `https://api.emailvalidation.io/v1/info?apikey=${apiKey}&email=${email}`;

        // Fetch data from API
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse API response
        const result = await response.json();
        console.log(result); // Debugging: log the API response

        // Hide loading indicator
        loadingIndicator.style.display = 'none';

        // Display the result
        let output = `<h3>Validation Results:</h3>`;
        for (let key in result) {
            if (result[key]) {
                let className = 'valid';
                if (key === 'state' && result[key] === 'undeliverable') {
                    className = 'invalid';
                } else if (key === 'disposable' && result[key] === true) {
                    className = 'warning';
                }
                output += `<div class="${className}"><strong>${key}:</strong> ${result[key]}</div>`;
            }
        }

        // Display the results in the result container
        resultContainer.innerHTML = output;

    } catch (error) {
        console.error("Error during API call:", error);
        loadingIndicator.style.display = 'none';
        resultContainer.innerHTML = "<div class='invalid'>Error fetching data. Please try again later.</div>";
    }
});

// Email Validation Regex (Basic Format Validation)
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Dark Mode Toggle
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme); // Save theme preference to localStorage
});

// On page load, apply saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// Contact Form Submission
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Thank you for your message!");
});
