// Select the toggle and body element
const toggleSwitch = document.getElementById('theme-toggle');
const body = document.getElementById('body');

// Check if dark mode was previously selected (using localStorage)
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    toggleSwitch.checked = true; // Ensure the toggle reflects the correct state
}

// Add event listener for the toggle switch
toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark'); // Store the user's theme preference
    } else {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});
