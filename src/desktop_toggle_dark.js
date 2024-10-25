// Select the theme toggle switch and the main page body element
const themeToggleSwitch = document.getElementById('theme-toggle_desktop');
const mainBodyElement = document.getElementById('body');

// Check if dark mode was previously selected (using localStorage)
if (localStorage.getItem('selectedTheme') === 'dark') {
    mainBodyElement.classList.add('dark');
    themeToggleSwitch.checked = true; // Ensure the toggle reflects the correct state
}

// Add event listener for the theme toggle switch
themeToggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        mainBodyElement.classList.add('dark');
        localStorage.setItem('selectedTheme', 'dark'); // Store the user's theme preference
    } else {
        mainBodyElement.classList.remove('dark');
        localStorage.setItem('selectedTheme', 'light');
    }
});
