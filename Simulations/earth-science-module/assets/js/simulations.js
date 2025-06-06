// assets/js/simulations.js

/**
 * Initializes the plate tectonics simulation.
 * This function dynamically updates the content of the simulation area
 * based on the selected plate boundary type.
 */
function initializePlateTectonicsSimulation() {
    const simulationContainer = document.getElementById('plateTectonicsSimulation');
    const divergentBtn = document.getElementById('divergentBtn');
    const convergentBtn = document.getElementById('convergentBtn');
    const transformBtn = document.getElementById('transformBtn');

    // Function to update the simulation display
    const updateSimulationDisplay = (boundaryType) => {
        let content = '';
        switch (boundaryType) {
            case 'divergent':
                content = `
                    <div class="text-center">
                        <h4 class="text-xl font-bold text-green-700 mb-2">Divergent Boundary</h4>
                        <p class="text-gray-700 mb-4">Plates move <span class="font-semibold text-green-800">away</span> from each other.</p>
                        <p class="text-gray-600">Creates new crust, mid-ocean ridges, rift valleys. Example: Mid-Atlantic Ridge.</p>
                        <img src="https://placehold.co/300x150/dcfce7/14532d?text=Divergent+Simulation" alt="Divergent Boundary" class="mt-4 mx-auto rounded-lg shadow-sm">
                    </div>
                `;
                break;
            case 'convergent':
                content = `
                    <div class="text-center">
                        <h4 class="text-xl font-bold text-red-700 mb-2">Convergent Boundary</h4>
                        <p class="text-gray-700 mb-4">Plates move <span class="font-semibold text-red-800">towards</span> each other.</p>
                        <p class="text-gray-600">Creates trenches, volcanic arcs, mountain ranges. Example: Himalayas, Andes.</p>
                        <img src="https://placehold.co/300x150/fee2e2/991b1b?text=Convergent+Simulation" alt="Convergent Boundary" class="mt-4 mx-auto rounded-lg shadow-sm">
                    </div>
                `;
                break;
            case 'transform':
                content = `
                    <div class="text-center">
                        <h4 class="text-xl font-bold text-yellow-700 mb-2">Transform Boundary</h4>
                        <p class="text-gray-700 mb-4">Plates <span class="font-semibold text-yellow-800">slide past</span> each other.</p>
                        <p class="text-gray-600">Causes frequent earthquakes. Example: San Andreas Fault.</p>
                        <img src="https://placehold.co/300x150/fffbeb/9a3412?text=Transform+Simulation" alt="Transform Boundary" class="mt-4 mx-auto rounded-lg shadow-sm">
                    </div>
                `;
                break;
            default:
                content = '<p class="text-gray-500">Select a boundary type to start the simulation.</p>';
        }
        simulationContainer.innerHTML = content;
    };

    // Add event listeners to simulation buttons
    if (divergentBtn) {
        divergentBtn.addEventListener('click', () => updateSimulationDisplay('divergent'));
    }
    if (convergentBtn) {
        convergentBtn.addEventListener('click', () => updateSimulationDisplay('convergent'));
    }
    if (transformBtn) {
        transformBtn.addEventListener('click', () => updateSimulationDisplay('transform'));
    }

    // Initialize with a default view
    updateSimulationDisplay('divergent'); // Or a general intro view
}

// Only run simulation initialization if the elements exist on the page
document.addEventListener('DOMContentLoaded', () => {
    // Check if simulation container exists to avoid errors on other pages
    if (document.getElementById('plateTectonicsSimulation')) {
        initializePlateTectonicsSimulation();
        console.log("Plate Tectonics Simulation initialized.");
    }
    // Add calls for other simulations here as they are added to modules
});
