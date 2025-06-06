// assets/js/main.js

/**
 * Initializes the tab functionality for learning modules.
 * This function makes sure only one tab content is visible at a time
 * and updates the active state of the tab buttons.
 */
function initializeTabs() {
    // Select all tab buttons and tab content areas in the document
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Add a click event listener to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all tab buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');

            // Determine which content tab to activate based on the button's ID
            // The button ID is e.g., 'practiceTabBtn', the content ID is 'practiceTabContent'
            const targetContentId = button.id.replace('Btn', 'Content');
            const targetContent = document.getElementById(targetContentId);

            // If the target content exists, add the 'active' class to display it
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Automatically activate the first tab on page load if any tabs exist
    if (tabButtons.length > 0) {
        tabButtons[0].click(); // Simulate a click on the first tab button
    }
}

// Run the initialization function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    console.log("Main script loaded. Tabs initialized.");
});
