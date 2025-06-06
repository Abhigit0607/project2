// Check if user has completed onboarding
document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
        showDashboard();
        updateDashboardData(JSON.parse(userData));
    }
});

let currentStep = 1;
const totalSteps = 3;

// Update progress bar
function updateProgress() {
    const progress = (currentStep - 1) / (totalSteps - 1) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

// Show specific step
function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    document.getElementById(`step${step}`).style.display = 'block';
    currentStep = step;
    updateProgress();
}

// Next step
function nextStep(step) {
    if (validateStep(step)) {
        showStep(step + 1);
    }
}

// Previous step
function prevStep(step) {
    showStep(step - 1);
}

// Validate form fields
function validateStep(step) {
    const form = document.getElementById(getFormId(step));
    const inputs = form.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value) {
            isValid = false;
            input.style.borderColor = '#EF4444';
        } else {
            input.style.borderColor = '#E5E7EB';
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields');
    }

    return isValid;
}

// Get form ID based on step
function getFormId(step) {
    const forms = ['personalForm', 'businessForm', 'preferencesForm'];
    return forms[step - 1];
}

// Submit onboarding
function submitOnboarding() {
    if (validateStep(3)) {
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            industry: document.getElementById('industry').value,
            size: document.getElementById('size').value,
            theme: document.getElementById('theme').value,
            layout: document.getElementById('layout').value
        };

        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Show dashboard
        showDashboard();
        updateDashboardData(userData);
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Update dashboard with user data
function updateDashboardData(userData) {
    document.getElementById('userName').textContent = userData.name;
    
    // Apply theme if dark
    if (userData.theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Logout
function logout() {
    localStorage.removeItem('userData');
    location.reload();
}

// Initialize
showStep(1);