// Conservation of Momentum Animations
// Main JavaScript file

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.animation-section');
    
    // Show the first section by default
    sections[0].classList.remove('hidden');
    
    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show the target section
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // Initialize all animations
    initBasicCollision();
    initElasticCollision();
    initInelasticCollision();
    initExplosion();
    initRealWorld();
});

// =============================================
// Animation 1: Basic Collision Demonstration
// =============================================
function initBasicCollision() {
    const canvas = document.getElementById('basicCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Ball properties
    let ball1 = {
        x: width * 0.25,
        y: height / 2,
        radius: 20,
        mass: 5,
        velocity: 5,
        color: '#3498db',
        momentum: 0
    };
    
    let ball2 = {
        x: width * 0.75,
        y: height / 2,
        radius: 20,
        mass: 5,
        velocity: -5,
        color: '#e74c3c',
        momentum: 0
    };
    
    // Animation state
    let animationId = null;
    let isPlaying = false;
    let hasCollided = false;
    let initialTotalMomentum = 0;
    
    // Controls
    const mass1Slider = document.getElementById('mass1');
    const mass1Value = document.getElementById('mass1Value');
    const velocity1Slider = document.getElementById('velocity1');
    const velocity1Value = document.getElementById('velocity1Value');
    const mass2Slider = document.getElementById('mass2');
    const mass2Value = document.getElementById('mass2Value');
    const velocity2Slider = document.getElementById('velocity2');
    const velocity2Value = document.getElementById('velocity2Value');
    const playBtn = document.getElementById('basicPlay');
    const pauseBtn = document.getElementById('basicPause');
    const resetBtn = document.getElementById('basicReset');
    
    // Update values from sliders
    function updateValues() {
        ball1.mass = parseInt(mass1Slider.value);
        ball1.velocity = parseInt(velocity1Slider.value);
        ball2.mass = parseInt(mass2Slider.value);
        ball2.velocity = parseInt(velocity2Slider.value);
        
        // Update display values
        mass1Value.textContent = ball1.mass + ' kg';
        velocity1Value.textContent = ball1.velocity + ' m/s';
        mass2Value.textContent = ball2.mass + ' kg';
        velocity2Value.textContent = ball2.velocity + ' m/s';
        
        // Update momenta
        ball1.momentum = ball1.mass * ball1.velocity;
        ball2.momentum = ball2.mass * ball2.velocity;
        initialTotalMomentum = ball1.momentum + ball2.momentum;
        
        // Reset positions
        resetPositions();
        
        // Redraw
        if (!isPlaying) {
            draw();
        }
    }
    
    // Event listeners for sliders
    mass1Slider.addEventListener('input', updateValues);
    velocity1Slider.addEventListener('input', updateValues);
    mass2Slider.addEventListener('input', updateValues);
    velocity2Slider.addEventListener('input', updateValues);
    
    // Play, pause, reset buttons
    playBtn.addEventListener('click', function() {
        if (!isPlaying) {
            isPlaying = true;
            hasCollided = false;
            animate();
        }
    });
    
    pauseBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
    
    resetBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        hasCollided = false;
        resetPositions();
        draw();
    });
    
    // Reset ball positions
    function resetPositions() {
        ball1.x = width * 0.25;
        ball2.x = width * 0.75;
        hasCollided = false;
    }
    
    // Check for collision
    function checkCollision() {
        const distance = Math.abs(ball1.x - ball2.x);
        return distance <= (ball1.radius + ball2.radius);
    }
    
    // Handle collision physics
    function handleCollision() {
        // Calculate new velocities using conservation of momentum and kinetic energy
        const m1 = ball1.mass;
        const m2 = ball2.mass;
        const v1 = ball1.velocity;
        const v2 = ball2.velocity;
        
        // New velocities after collision
        const newV1 = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
        const newV2 = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
        
        ball1.velocity = newV1;
        ball2.velocity = newV2;
        
        // Update momenta
        ball1.momentum = ball1.mass * ball1.velocity;
        ball2.momentum = ball2.mass * ball2.velocity;
        
        // Move balls apart to prevent sticking
        const overlap = (ball1.radius + ball2.radius) - Math.abs(ball1.x - ball2.x);
        const direction = ball1.x < ball2.x ? -1 : 1;
        
        ball1.x += direction * overlap / 2;
        ball2.x -= direction * overlap / 2;
    }
    
    // Animation loop
    function animate() {
        if (!isPlaying) return;
        
        ctx.clearRect(0, 0, width, height);
        
        // Move balls
        ball1.x += ball1.velocity;
        ball2.x += ball2.velocity;
        
        // Check for collision
        if (!hasCollided && checkCollision()) {
            handleCollision();
            hasCollided = true;
        }
        
        // Check for wall collisions
        if (ball1.x - ball1.radius <= 0) {
            ball1.velocity = Math.abs(ball1.velocity);
            ball1.x = ball1.radius;
        } else if (ball1.x + ball1.radius >= width) {
            ball1.velocity = -Math.abs(ball1.velocity);
            ball1.x = width - ball1.radius;
        }
        
        if (ball2.x - ball2.radius <= 0) {
            ball2.velocity = Math.abs(ball2.velocity);
            ball2.x = ball2.radius;
        } else if (ball2.x + ball2.radius >= width) {
            ball2.velocity = -Math.abs(ball2.velocity);
            ball2.x = width - ball2.radius;
        }
        
        // Update momenta
        ball1.momentum = ball1.mass * ball1.velocity;
        ball2.momentum = ball2.mass * ball2.velocity;
        
        // Draw
        draw();
        
        // Continue animation
        animationId = requestAnimationFrame(animate);
    }
    
    // Draw function
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw track
        ctx.beginPath();
        ctx.moveTo(0, height / 2 + 30);
        ctx.lineTo(width, height / 2 + 30);
        ctx.strokeStyle = '#95a5a6';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw grid
        ctx.beginPath();
        for (let x = 0; x < width; x += 50) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw balls
        // Ball 1
        ctx.beginPath();
        ctx.arc(ball1.x, ball1.y, ball1.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball1.color;
        ctx.fill();
        
        // Ball 2
        ctx.beginPath();
        ctx.arc(ball2.x, ball2.y, ball2.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball2.color;
        ctx.fill();
        
        // Draw velocity vectors
        drawVector(ball1.x, ball1.y - 40, ball1.velocity * 5, 'blue', 'v₁');
        drawVector(ball2.x, ball2.y - 40, ball2.velocity * 5, 'red', 'v₂');
        
        // Draw momentum values
        ctx.font = '14px Arial';
        ctx.fillStyle = '#2c3e50';
        
        // Ball 1 momentum
        ctx.fillText(`p₁ = ${ball1.mass} × ${ball1.velocity.toFixed(1)} = ${ball1.momentum.toFixed(1)} kg·m/s`, 20, 30);
        
        // Ball 2 momentum
        ctx.fillText(`p₂ = ${ball2.mass} × ${ball2.velocity.toFixed(1)} = ${ball2.momentum.toFixed(1)} kg·m/s`, 20, 50);
        
        // Total momentum
        const totalMomentum = ball1.momentum + ball2.momentum;
        ctx.fillText(`Total momentum = ${totalMomentum.toFixed(1)} kg·m/s`, 20, 80);
        
        // Initial total momentum
        ctx.fillText(`Initial total momentum = ${initialTotalMomentum.toFixed(1)} kg·m/s`, 20, 100);
        
        // Conservation indicator
        if (Math.abs(totalMomentum - initialTotalMomentum) < 0.1) {
            ctx.fillStyle = 'green';
            ctx.fillText('✓ Momentum is conserved!', width - 200, 30);
        }
    }
    
    // Helper function to draw vectors
    function drawVector(x, y, length, color, label) {
        const arrowSize = 7;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + length, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Arrow head
        if (length !== 0) {
            const direction = length > 0 ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(x + length, y);
            ctx.lineTo(x + length - direction * arrowSize, y - arrowSize);
            ctx.lineTo(x + length - direction * arrowSize, y + arrowSize);
            ctx.fillStyle = color;
            ctx.fill();
        }
        
        // Label
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText(label, x + length / 2 - 5, y - 10);
    }
    
    // Initialize
    updateValues();
    draw();
}

// =============================================
// Animation 2: Elastic Collisions
// =============================================
function initElasticCollision() {
    const canvas = document.getElementById('elasticCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Ball properties
    let ball1 = {
        x: width * 0.25,
        y: height / 2,
        radius: 20,
        mass: 5,
        velocity: 5,
        color: '#3498db',
        momentum: 0,
        kineticEnergy: 0
    };
    
    let ball2 = {
        x: width * 0.75,
        y: height / 2,
        radius: 20,
        mass: 5,
        velocity: 0,
        color: '#e74c3c',
        momentum: 0,
        kineticEnergy: 0
    };
    
    // Animation state
    let animationId = null;
    let isPlaying = false;
    let hasCollided = false;
    let initialTotalMomentum = 0;
    let initialTotalEnergy = 0;
    
    // Controls
    const mass1Slider = document.getElementById('elasticMass1');
    const mass1Value = document.getElementById('elasticMass1Value');
    const velocity1Slider = document.getElementById('elasticVelocity1');
    const velocity1Value = document.getElementById('elasticVelocity1Value');
    const mass2Slider = document.getElementById('elasticMass2');
    const mass2Value = document.getElementById('elasticMass2Value');
    const velocity2Slider = document.getElementById('elasticVelocity2');
    const velocity2Value = document.getElementById('elasticVelocity2Value');
    const playBtn = document.getElementById('elasticPlay');
    const pauseBtn = document.getElementById('elasticPause');
    const resetBtn = document.getElementById('elasticReset');
    
    // Update values from sliders
    function updateValues() {
        ball1.mass = parseInt(mass1Slider.value);
        ball1.velocity = parseInt(velocity1Slider.value);
        ball2.mass = parseInt(mass2Slider.value);
        ball2.velocity = parseInt(velocity2Slider.value);
        
        // Update display values
        mass1Value.textContent = ball1.mass + ' kg';
        velocity1Value.textContent = ball1.velocity + ' m/s';
        mass2Value.textContent = ball2.mass + ' kg';
        velocity2Value.textContent = ball2.velocity + ' m/s';
        
        // Update momenta and energy
        ball1.momentum = ball1.mass * ball1.velocity;
        ball2.momentum = ball2.mass * ball2.velocity;
        ball1.kineticEnergy = 0.5 * ball1.mass * ball1.velocity * ball1.velocity;
        ball2.kineticEnergy = 0.5 * ball2.mass * ball2.velocity * ball2.velocity;
        
        initialTotalMomentum = ball1.momentum + ball2.momentum;
        initialTotalEnergy = ball1.kineticEnergy + ball2.kineticEnergy;
        
        // Reset positions
        resetPositions();
        
        // Redraw
        if (!isPlaying) {
            draw();
        }
    }
    
    // Event listeners for sliders
    mass1Slider.addEventListener('input', updateValues);
    velocity1Slider.addEventListener('input', updateValues);
    mass2Slider.addEventListener('input', updateValues);
    velocity2Slider.addEventListener('input', updateValues);
    
    // Play, pause, reset buttons
    playBtn.addEventListener('click', function() {
        if (!isPlaying) {
            isPlaying = true;
            hasCollided = false;
            animate();
        }
    });
    
    pauseBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
    
    resetBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        hasCollided = false;
        resetPositions();
        draw();
    });
    
    // Reset ball positions
    function resetPositions() {
        ball1.x = width * 0.25;
        ball2.x = width * 0.75;
        hasCollided = false;
    }
    
    // Check for collision
    function checkCollision() {
        const distance = Math.abs(ball1.x - ball2.x);
        return distance <= (ball1.radius + ball2.radius);
    }
    
    // Handle collision physics for perfectly elastic collision
    function handleCollision() {
        // Calculate new velocities using conservation of momentum and kinetic energy
        const m1 = ball1.mass;
        const m2 = ball2.mass;
        const v1 = ball1.velocity;
        const v2 = ball2.velocity;
        
        // New velocities after elastic collision
        const newV1 = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
        const newV2 = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
        
        ball1.velocity = newV1;
        ball2.velocity = newV2;
        
        // Update momenta and energy
        ball1.momentum = ball1.mass * ball1.velocity;
        ball2.momentum = ball2.mass * ball2.velocity;
        ball1.kineticEnergy = 0.5 * ball1.mass * ball1.velocity * ball1.velocity;
        ball2.kineticEnergy = 0.5 * ball2.mass * ball2.velocity * ball2.velocity;
        
        // Move balls apart to prevent sticking
        const overlap = (ball1.radius + ball2.radius) - Math.abs(ball1.x - ball2.x);
        const direction = ball1.x < ball2.x ? -1 : 1;
        
        ball1.x += direction * overlap / 2;
        ball2.x -= direction * overlap / 2;
    }
    
    // Animation loop
    function animate() {
        if (!isPlaying) return;
        
        ctx.clearRect(0, 0, width, height);
        
        // Move balls
        ball1.x += ball1.velocity;
        ball2.x += ball2.velocity;
        
        // Check for collision
        if (!hasCollided && checkCollision()) {
            handleCollision();
            hasCollided = true;
        }
        
        // Check for wall collisions
        if (ball1.x - ball1.radius <= 0) {
            ball1.velocity = Math.abs(ball1.velocity);
            ball1.x = ball1.radius;
        } else if (ball1.x + ball1.radius >= width) {
            ball1.velocity = -Math.abs(ball1.velocity);
            ball1.x = width - ball1.radius;
        }
        
        if (ball2.x - ball2.radius <= 0) {
            ball2.velocity = Math.abs(ball2.velocity);
            ball2.x = ball2.radius;
        } else if (ball2.x + ball2.radius >= width) {
            ball2.velocity = -Math.abs(ball2.velocity);
            ball2.x = width - ball2.radius;
        }
        
        // Update momenta and energy
        ball1.momentum = ball1.mass * ball1.velocity;
        ball2.momentum = ball2.mass * ball2.velocity;
        ball1.kineticEnergy = 0.5 * ball1.mass * ball1.velocity * ball1.velocity;
        ball2.kineticEnergy = 0.5 * ball2.mass * ball2.velocity * ball2.velocity;
        
        // Draw
        draw();
        
        // Continue animation
        animationId = requestAnimationFrame(animate);
    }
    
    // Draw function
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw track
        ctx.beginPath();
        ctx.moveTo(0, height / 2 + 30);
        ctx.lineTo(width, height / 2 + 30);
        ctx.strokeStyle = '#95a5a6';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw grid
        ctx.beginPath();
        for (let x = 0; x < width; x += 50) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw balls
        // Ball 1
        ctx.beginPath();
        ctx.arc(ball1.x, ball1.y, ball1.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball1.color;
        ctx.fill();
        
        // Ball 2
        ctx.beginPath();
        ctx.arc(ball2.x, ball2.y, ball2.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball2.color;
        ctx.fill();
        
        // Draw velocity vectors
        drawVector(ball1.x, ball1.y - 40, ball1.velocity * 5, 'blue', 'v₁');
        drawVector(ball2.x, ball2.y - 40, ball2.velocity * 5, 'red', 'v₂');
        
        // Draw momentum and energy values
        ctx.font = '14px Arial';
        ctx.fillStyle = '#2c3e50';
        
        // Ball 1 momentum and energy
        ctx.fillText(`p₁ = ${ball1.momentum.toFixed(1)} kg·m/s`, 20, 30);
        ctx.fillText(`KE₁ = ${ball1.kineticEnergy.toFixed(1)} J`, 20, 50);
        
        // Ball 2 momentum and energy
        ctx.fillText(`p₂ = ${ball2.momentum.toFixed(1)} kg·m/s`, width - 200, 30);
        ctx.fillText(`KE₂ = ${ball2.kineticEnergy.toFixed(1)} J`, width - 200, 50);
        
        // Total momentum and energy
        const totalMomentum = ball1.momentum + ball2.momentum;
        const totalEnergy = ball1.kineticEnergy + ball2.kineticEnergy;
        
        ctx.fillText(`Total momentum = ${totalMomentum.toFixed(1)} kg·m/s`, 20, 80);
        ctx.fillText(`Total energy = ${totalEnergy.toFixed(1)} J`, 20, 100);
        
        // Initial values
        ctx.fillText(`Initial momentum = ${initialTotalMomentum.toFixed(1)} kg·m/s`, 20, 130);
        ctx.fillText(`Initial energy = ${initialTotalEnergy.toFixed(1)} J`, 20, 150);
        
        // Conservation indicators
        if (Math.abs(totalMomentum - initialTotalMomentum) < 0.1) {
            ctx.fillStyle = 'green';
            ctx.fillText('✓ Momentum is conserved!', width - 200, 80);
        }
        
        if (Math.abs(totalEnergy - initialTotalEnergy) < 0.1) {
            ctx.fillStyle = 'green';
            ctx.fillText('✓ Energy is conserved!', width - 200, 100);
        }
    }
    
    // Helper function to draw vectors
    function drawVector(x, y, length, color, label) {
        const arrowSize = 7;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + length, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Arrow head
        if (length !== 0) {
            const direction = length > 0 ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(x + length, y);
            ctx.lineTo(x + length - direction * arrowSize, y - arrowSize);
            ctx.lineTo(x + length - direction * arrowSize, y + arrowSize);
            ctx.fillStyle = color;
            ctx.fill();
        }
        
        // Label
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText(label, x + length / 2 - 5, y - 10);
    }
    
    // Initialize
    updateValues();
    draw();
}

// =============================================
// Animation 3: Inelastic Collisions
// =============================================
function initInelasticCollision() {
    const canvas = document.getElementById('inelasticCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Object properties
    let object1 = {
        x: width * 0.25,
        y: height / 2,
        width: 40,
        height: 40,
        mass: 5,
        velocity: 5,
        color: '#3498db',
        momentum: 0,
        kineticEnergy: 0
    };
    
    let object2 = {
        x: width * 0.75,
        y: height / 2,
        width: 40,
        height: 40,
        mass: 5,
        velocity: 0,
        color: '#e74c3c',
        momentum: 0,
        kineticEnergy: 0
    };
    
    // Combined object (after collision)
    let combinedObject = {
        x: 0,
        y: height / 2,
        width: 80,
        height: 40,
        mass: 0,
        velocity: 0,
        color: '#9b59b6',
        momentum: 0,
        kineticEnergy: 0
    };
    
    // Animation state
    let animationId = null;
    let isPlaying = false;
    let hasCollided = false;
    let initialTotalMomentum = 0;
    let initialTotalEnergy = 0;
    
    // Controls
    const mass1Slider = document.getElementById('inelasticMass1');
    const mass1Value = document.getElementById('inelasticMass1Value');
    const velocity1Slider = document.getElementById('inelasticVelocity1');
    const velocity1Value = document.getElementById('inelasticVelocity1Value');
    const mass2Slider = document.getElementById('inelasticMass2');
    const mass2Value = document.getElementById('inelasticMass2Value');
    const velocity2Slider = document.getElementById('inelasticVelocity2');
    const velocity2Value = document.getElementById('inelasticVelocity2Value');
    const playBtn = document.getElementById('inelasticPlay');
    const pauseBtn = document.getElementById('inelasticPause');
    const resetBtn = document.getElementById('inelasticReset');
    
    // Update values from sliders
    function updateValues() {
        object1.mass = parseInt(mass1Slider.value);
        object1.velocity = parseInt(velocity1Slider.value);
        object2.mass = parseInt(mass2Slider.value);
        object2.velocity = parseInt(velocity2Slider.value);
        
        // Update display values
        mass1Value.textContent = object1.mass + ' kg';
        velocity1Value.textContent = object1.velocity + ' m/s';
        mass2Value.textContent = object2.mass + ' kg';
        velocity2Value.textContent = object2.velocity + ' m/s';
        
        // Update momenta and energy
        object1.momentum = object1.mass * object1.velocity;
        object2.momentum = object2.mass * object2.velocity;
        object1.kineticEnergy = 0.5 * object1.mass * object1.velocity * object1.velocity;
        object2.kineticEnergy = 0.5 * object2.mass * object2.velocity * object2.velocity;
        
        initialTotalMomentum = object1.momentum + object2.momentum;
        initialTotalEnergy = object1.kineticEnergy + object2.kineticEnergy;
        
        // Reset positions
        resetPositions();
        
        // Redraw
        if (!isPlaying) {
            draw();
        }
    }
    
    // Event listeners for sliders
    mass1Slider.addEventListener('input', updateValues);
    velocity1Slider.addEventListener('input', updateValues);
    mass2Slider.addEventListener('input', updateValues);
    velocity2Slider.addEventListener('input', updateValues);
    
    // Play, pause, reset buttons
    playBtn.addEventListener('click', function() {
        if (!isPlaying) {
            isPlaying = true;
            hasCollided = false;
            animate();
        }
    });
    
    pauseBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
    
    resetBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        hasCollided = false;
        resetPositions();
        draw();
    });
    
    // Reset object positions
    function resetPositions() {
        object1.x = width * 0.25;
        object2.x = width * 0.75;
        hasCollided = false;
    }
    
    // Check for collision
    function checkCollision() {
        return (object1.x + object1.width >= object2.x);
    }
    
    // Handle collision physics for completely inelastic collision
    function handleCollision() {
        // Calculate new velocity using conservation of momentum
        const m1 = object1.mass;
        const m2 = object2.mass;
        const v1 = object1.velocity;
        const v2 = object2.velocity;
        
        // New velocity after completely inelastic collision
        const newV = (m1 * v1 + m2 * v2) / (m1 + m2);
        
        // Set up combined object
        combinedObject.mass = m1 + m2;
        combinedObject.velocity = newV;
        combinedObject.x = (object1.x * m1 + object2.x * m2) / (m1 + m2);
        combinedObject.momentum = combinedObject.mass * combinedObject.velocity;
        combinedObject.kineticEnergy = 0.5 * combinedObject.mass * combinedObject.velocity * combinedObject.velocity;
    }
    
    // Animation loop
    function animate() {
        if (!isPlaying) return;
        
        ctx.clearRect(0, 0, width, height);
        
        if (!hasCollided) {
            // Move objects
            object1.x += object1.velocity;
            object2.x += object2.velocity;
            
            // Check for collision
            if (checkCollision()) {
                handleCollision();
                hasCollided = true;
            }
        } else {
            // Move combined object
            combinedObject.x += combinedObject.velocity;
            
            // Check for wall collisions
            if (combinedObject.x <= 0) {
                combinedObject.velocity = Math.abs(combinedObject.velocity);
                combinedObject.x = 0;
            } else if (combinedObject.x + combinedObject.width >= width) {
                combinedObject.velocity = -Math.abs(combinedObject.velocity);
                combinedObject.x = width - combinedObject.width;
            }
            
            // Update momentum and energy
            combinedObject.momentum = combinedObject.mass * combinedObject.velocity;
            combinedObject.kineticEnergy = 0.5 * combinedObject.mass * combinedObject.velocity * combinedObject.velocity;
        }
        
        // Draw
        draw();
        
        // Continue animation
        animationId = requestAnimationFrame(animate);
    }
    
    // Draw function
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw track
        ctx.beginPath();
        ctx.moveTo(0, height / 2 + 30);
        ctx.lineTo(width, height / 2 + 30);
        ctx.strokeStyle = '#95a5a6';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw grid
        ctx.beginPath();
        for (let x = 0; x < width; x += 50) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        if (!hasCollided) {
            // Draw objects
            // Object 1
            ctx.fillStyle = object1.color;
            ctx.fillRect(object1.x, object1.y, object1.width, object1.height);
            
            // Object 2
            ctx.fillStyle = object2.color;
            ctx.fillRect(object2.x, object2.y, object2.width, object2.height);
            
            // Draw velocity vectors
            drawVector(object1.x + object1.width / 2, object1.y - 20, object1.velocity * 5, 'blue', 'v₁');
            drawVector(object2.x + object2.width / 2, object2.y - 20, object2.velocity * 5, 'red', 'v₂');
            
            // Draw momentum and energy values
            ctx.font = '14px Arial';
            ctx.fillStyle = '#2c3e50';
            
            // Object 1 momentum and energy
            ctx.fillText(`p₁ = ${object1.momentum.toFixed(1)} kg·m/s`, 20, 30);
            ctx.fillText(`KE₁ = ${object1.kineticEnergy.toFixed(1)} J`, 20, 50);
            
            // Object 2 momentum and energy
            ctx.fillText(`p₂ = ${object2.momentum.toFixed(1)} kg·m/s`, width - 200, 30);
            ctx.fillText(`KE₂ = ${object2.kineticEnergy.toFixed(1)} J`, width - 200, 50);
            
            // Total momentum and energy
            const totalMomentum = object1.momentum + object2.momentum;
            const totalEnergy = object1.kineticEnergy + object2.kineticEnergy;
            
            ctx.fillText(`Total momentum = ${totalMomentum.toFixed(1)} kg·m/s`, 20, 80);
            ctx.fillText(`Total energy = ${totalEnergy.toFixed(1)} J`, 20, 100);
        } else {
            // Draw combined object
            ctx.fillStyle = combinedObject.color;
            ctx.fillRect(combinedObject.x, combinedObject.y, combinedObject.width, combinedObject.height);
            
            // Draw velocity vector
            drawVector(combinedObject.x + combinedObject.width / 2, combinedObject.y - 20, combinedObject.velocity * 5, 'purple', 'v');
            
            // Draw momentum and energy values
            ctx.font = '14px Arial';
            ctx.fillStyle = '#2c3e50';
            
            // Combined object momentum and energy
            ctx.fillText(`p = ${combinedObject.momentum.toFixed(1)} kg·m/s`, 20, 30);
            ctx.fillText(`KE = ${combinedObject.kineticEnergy.toFixed(1)} J`, 20, 50);
            
            // Initial values
            ctx.fillText(`Initial momentum = ${initialTotalMomentum.toFixed(1)} kg·m/s`, 20, 80);
            ctx.fillText(`Initial energy = ${initialTotalEnergy.toFixed(1)} J`, 20, 100);
            
            // Energy lost
            const energyLost = initialTotalEnergy - combinedObject.kineticEnergy;
            ctx.fillText(`Energy lost = ${energyLost.toFixed(1)} J`, 20, 130);
            
            // Conservation indicators
            if (Math.abs(combinedObject.momentum - initialTotalMomentum) < 0.1) {
                ctx.fillStyle = 'green';
                ctx.fillText('✓ Momentum is conserved!', width - 200, 30);
            }
            
            if (energyLost > 0) {
                ctx.fillStyle = 'red';
                ctx.fillText('✗ Energy is NOT conserved!', width - 200, 50);
                ctx.fillStyle = '#2c3e50';
                ctx.fillText('(converted to heat, sound, etc.)', width - 200, 70);
            }
        }
    }
    
    // Helper function to draw vectors
    function drawVector(x, y, length, color, label) {
        const arrowSize = 7;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + length, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Arrow head
        if (length !== 0) {
            const direction = length > 0 ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(x + length, y);
            ctx.lineTo(x + length - direction * arrowSize, y - arrowSize);
            ctx.lineTo(x + length - direction * arrowSize, y + arrowSize);
            ctx.fillStyle = color;
            ctx.fill();
        }
        
        // Label
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText(label, x + length / 2 - 5, y - 10);
    }
    
    // Initialize
    updateValues();
    draw();
}

// =============================================
// Animation 4: Explosions
// =============================================
function initExplosion() {
    const canvas = document.getElementById('explosionCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Initial object
    let initialObject = {
        x: width / 2 - 30,
        y: height / 2 - 30,
        width: 60,
        height: 60,
        color: '#9b59b6'
    };
    
    // Fragments
    let fragments = [];
    
    // Animation state
    let animationId = null;
    let isPlaying = false;
    let hasExploded = false;
    let explosionTime = 0;
    
    // Controls
    const explosionForceSlider = document.getElementById('explosionForce');
    const explosionForceValue = document.getElementById('explosionForceValue');
    const fragmentCountSlider = document.getElementById('fragmentCount');
    const fragmentCountValue = document.getElementById('fragmentCountValue');
    const playBtn = document.getElementById('explosionPlay');
    const pauseBtn = document.getElementById('explosionPause');
    const resetBtn = document.getElementById('explosionReset');
    
    // Update values from sliders
    function updateValues() {
        const explosionForce = parseInt(explosionForceSlider.value);
        const fragmentCount = parseInt(fragmentCountSlider.value);
        
        // Update display values
        explosionForceValue.textContent = explosionForce;
        fragmentCountValue.textContent = fragmentCount;
        
        // Reset
        resetExplosion();
        
        // Redraw
        if (!isPlaying) {
            draw();
        }
    }
    
    // Event listeners for sliders
    explosionForceSlider.addEventListener('input', updateValues);
    fragmentCountSlider.addEventListener('input', updateValues);
    
    // Play, pause, reset buttons
    playBtn.addEventListener('click', function() {
        if (!isPlaying) {
            isPlaying = true;
            animate();
        }
    });
    
    pauseBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
    
    resetBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        resetExplosion();
        draw();
    });
    
    // Reset explosion
    function resetExplosion() {
        hasExploded = false;
        explosionTime = 0;
        fragments = [];
    }
    
    // Create fragments
    function createFragments() {
        const fragmentCount = parseInt(fragmentCountSlider.value);
        const explosionForce = parseInt(explosionForceSlider.value);
        
        fragments = [];
        
        // Create fragments with random properties
        for (let i = 0; i < fragmentCount; i++) {
            // Calculate angle for this fragment (evenly distributed)
            const angle = (i / fragmentCount) * Math.PI * 2;
            
            // Calculate velocity components
            const vx = Math.cos(angle) * explosionForce;
            const vy = Math.sin(angle) * explosionForce;
            
            // Random mass between 1 and 5
            const mass = 1 + Math.random() * 4;
            
            // Size proportional to mass
            const size = 10 + mass * 5;
            
            // Random color
            const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#9b59b6'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            fragments.push({
                x: width / 2 - size / 2,
                y: height / 2 - size / 2,
                width: size,
                height: size,
                vx: vx,
                vy: vy,
                mass: mass,
                color: color,
                momentum: {
                    x: mass * vx,
                    y: mass * vy
                }
            });
        }
    }
    
    // Animation loop
    function animate() {
        if (!isPlaying) return;
        
        ctx.clearRect(0, 0, width, height);
        
        if (!hasExploded) {
            // Wait a bit before explosion
            explosionTime++;
            
            if (explosionTime > 30) {
                createFragments();
                hasExploded = true;
            }
        } else {
            // Move fragments
            fragments.forEach(fragment => {
                fragment.x += fragment.vx;
                fragment.y += fragment.vy;
                
                // Check for wall collisions
                if (fragment.x <= 0) {
                    fragment.vx = Math.abs(fragment.vx);
                    fragment.x = 0;
                } else if (fragment.x + fragment.width >= width) {
                    fragment.vx = -Math.abs(fragment.vx);
                    fragment.x = width - fragment.width;
                }
                
                if (fragment.y <= 0) {
                    fragment.vy = Math.abs(fragment.vy);
                    fragment.y = 0;
                } else if (fragment.y + fragment.height >= height) {
                    fragment.vy = -Math.abs(fragment.vy);
                    fragment.y = height - fragment.height;
                }
                
                // Update momentum
                fragment.momentum.x = fragment.mass * fragment.vx;
                fragment.momentum.y = fragment.mass * fragment.vy;
            });
        }
        
        // Draw
        draw();
        
        // Continue animation
        animationId = requestAnimationFrame(animate);
    }
    
    // Draw function
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        ctx.beginPath();
        for (let x = 0; x < width; x += 50) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = 0; y < height; y += 50) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        if (!hasExploded) {
            // Draw initial object
            ctx.fillStyle = initialObject.color;
            ctx.fillRect(initialObject.x, initialObject.y, initialObject.width, initialObject.height);
            
            // Draw text
            ctx.font = '14px Arial';
            ctx.fillStyle = '#2c3e50';
            ctx.fillText('Initial momentum = 0', 20, 30);
            
            // Draw pulsing effect before explosion
            if (explosionTime > 0) {
                const pulseSize = 5 * Math.sin(explosionTime * 0.2) + 5;
                ctx.strokeStyle = 'rgba(231, 76, 60, 0.5)';
                ctx.lineWidth = pulseSize;
                ctx.strokeRect(
                    initialObject.x - pulseSize,
                    initialObject.y - pulseSize,
                    initialObject.width + pulseSize * 2,
                    initialObject.height + pulseSize * 2
                );
            }
        } else {
            // Draw fragments
            fragments.forEach(fragment => {
                ctx.fillStyle = fragment.color;
                ctx.fillRect(fragment.x, fragment.y, fragment.width, fragment.height);
                
                // Draw momentum vectors
                drawVector(
                    fragment.x + fragment.width / 2,
                    fragment.y + fragment.height / 2,
                    fragment.vx * 3,
                    fragment.vy * 3,
                    fragment.color
                );
            });
            
            // Calculate total momentum
            let totalMomentumX = 0;
            let totalMomentumY = 0;
            
            fragments.forEach(fragment => {
                totalMomentumX += fragment.momentum.x;
                totalMomentumY += fragment.momentum.y;
            });
            
            // Draw momentum values
            ctx.font = '14px Arial';
            ctx.fillStyle = '#2c3e50';
            
            ctx.fillText(`Total momentum X = ${totalMomentumX.toFixed(1)} kg·m/s`, 20, 30);
            ctx.fillText(`Total momentum Y = ${totalMomentumY.toFixed(1)} kg·m/s`, 20, 50);
            ctx.fillText(`Total momentum magnitude = ${Math.sqrt(totalMomentumX * totalMomentumX + totalMomentumY * totalMomentumY).toFixed(1)} kg·m/s`, 20, 70);
            
            // Conservation indicator
            if (Math.abs(totalMomentumX) < 0.1 && Math.abs(totalMomentumY) < 0.1) {
                ctx.fillStyle = 'green';
                ctx.fillText('✓ Total momentum is still zero!', width - 250, 30);
                ctx.fillText('✓ Momentum is conserved!', width - 250, 50);
            }
        }
    }
    
    // Helper function to draw vectors
    function drawVector(x, y, dx, dy, color) {
        const arrowSize = 7;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        if (length < 0.1) return;
        
        const angle = Math.atan2(dy, dx);
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(x + dx, y + dy);
        ctx.lineTo(
            x + dx - arrowSize * Math.cos(angle - Math.PI / 6),
            y + dy - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            x + dx - arrowSize * Math.cos(angle + Math.PI / 6),
            y + dy - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    // Initialize
    updateValues();
    draw();
}

// =============================================
// Animation 5: Real-World Applications
// =============================================
function initRealWorld() {
    const canvas = document.getElementById('realworldCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Current scenario
    let currentScenario = 'billiards';
    
    // Animation state
    let animationId = null;
    let isPlaying = false;
    let animationTime = 0;
    let animationSpeed = 5;
    
    // Scenario-specific objects
    let scenarioObjects = {
        billiards: {
            cueBall: {
                x: width * 0.2,
                y: height / 2,
                radius: 15,
                mass: 1,
                velocity: { x: 10, y: 0 },
                color: '#f1f1f1'
            },
            targetBall: {
                x: width * 0.6,
                y: height / 2,
                radius: 15,
                mass: 1,
                velocity: { x: 0, y: 0 },
                color: '#e74c3c'
            },
            hasCollided: false
        },
        rocket: {
            rocket: {
                x: width / 2 - 25,
                y: height - 100,
                width: 50,
                height: 80,
                mass: 10,
                velocity: { x: 0, y: 0 },
                color: '#3498db'
            },
            particles: [],
            thrustForce: 0.5
        },
        skaters: {
            skater1: {
                x: width / 2 - 60,
                y: height / 2,
                width: 30,
                height: 60,
                mass: 70,
                velocity: { x: 0, y: 0 },
                color: '#3498db'
            },
            skater2: {
                x: width / 2 + 30,
                y: height / 2,
                width: 30,
                height: 60,
                mass: 50,
                velocity: { x: 0, y: 0 },
                color: '#e74c3c'
            },
            pushForce: 0.2,
            hasPushed: false
        },
        carCrash: {
            car1: {
                x: width * 0.2,
                y: height / 2 - 20,
                width: 80,
                height: 40,
                mass: 1500,
                velocity: { x: 5, y: 0 },
                color: '#3498db'
            },
            car2: {
                x: width * 0.7,
                y: height / 2 - 20,
                width: 80,
                height: 40,
                mass: 1000,
                velocity: { x: -2, y: 0 },
                color: '#e74c3c'
            },
            hasCollided: false
        }
    };
    
    // Controls
    const billiardBtn = document.getElementById('billiards');
    const rocketBtn = document.getElementById('rocket');
    const skatersBtn = document.getElementById('skaters');
    const carCrashBtn = document.getElementById('carCrash');
    const speedSlider = document.getElementById('scenarioSpeed');
    const speedValue = document.getElementById('scenarioSpeedValue');
    const playBtn = document.getElementById('realworldPlay');
    const pauseBtn = document.getElementById('realworldPause');
    const resetBtn = document.getElementById('realworldReset');
    
    // Update values from sliders
    function updateValues() {
        animationSpeed = parseInt(speedSlider.value);
        speedValue.textContent = animationSpeed;
        
        // Reset
        resetScenario();
        
        // Redraw
        if (!isPlaying) {
            draw();
        }
    }
    
    // Event listeners for sliders and buttons
    speedSlider.addEventListener('input', updateValues);
    
    billiardBtn.addEventListener('click', function() {
        currentScenario = 'billiards';
        resetScenario();
        draw();
    });
    
    rocketBtn.addEventListener('click', function() {
        currentScenario = 'rocket';
        resetScenario();
        draw();
    });
    
    skatersBtn.addEventListener('click', function() {
        currentScenario = 'skaters';
        resetScenario();
        draw();
    });
    
    carCrashBtn.addEventListener('click', function() {
        currentScenario = 'carCrash';
        resetScenario();
        draw();
    });
    
    // Play, pause, reset buttons
    playBtn.addEventListener('click', function() {
        if (!isPlaying) {
            isPlaying = true;
            animate();
        }
    });
    
    pauseBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
    
    resetBtn.addEventListener('click', function() {
        isPlaying = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        resetScenario();
        draw();
    });
    
    // Reset current scenario
    function resetScenario() {
        animationTime = 0;
        
        switch (currentScenario) {
            case 'billiards':
                scenarioObjects.billiards.cueBall.x = width * 0.2;
                scenarioObjects.billiards.cueBall.y = height / 2;
                scenarioObjects.billiards.cueBall.velocity = { x: 10, y: 0 };
                scenarioObjects.billiards.targetBall.x = width * 0.6;
                scenarioObjects.billiards.targetBall.y = height / 2;
                scenarioObjects.billiards.targetBall.velocity = { x: 0, y: 0 };
                scenarioObjects.billiards.hasCollided = false;
                break;
                
            case 'rocket':
                scenarioObjects.rocket.rocket.x = width / 2 - 25;
                scenarioObjects.rocket.rocket.y = height - 100;
                scenarioObjects.rocket.rocket.velocity = { x: 0, y: 0 };
                scenarioObjects.rocket.particles = [];
                break;
                
            case 'skaters':
                scenarioObjects.skaters.skater1.x = width / 2 - 60;
                scenarioObjects.skaters.skater1.velocity = { x: 0, y: 0 };
                scenarioObjects.skaters.skater2.x = width / 2 + 30;
                scenarioObjects.skaters.skater2.velocity = { x: 0, y: 0 };
                scenarioObjects.skaters.hasPushed = false;
                break;
                
            case 'carCrash':
                scenarioObjects.carCrash.car1.x = width * 0.2;
                scenarioObjects.carCrash.car1.velocity = { x: 5, y: 0 };
                scenarioObjects.carCrash.car2.x = width * 0.7;
                scenarioObjects.carCrash.car2.velocity = { x: -2, y: 0 };
                scenarioObjects.carCrash.hasCollided = false;
                break;
        }
    }
    
    // Animation loop
    function animate() {
        if (!isPlaying) return;
        
        ctx.clearRect(0, 0, width, height);
        
        // Update animation time
        animationTime += 0.1 * animationSpeed;
        
        // Update scenario-specific animation
        switch (currentScenario) {
            case 'billiards':
                animateBilliards();
                break;
                
            case 'rocket':
                animateRocket();
                break;
                
            case 'skaters':
                animateSkaters();
                break;
                
            case 'carCrash':
                animateCarCrash();
                break;
        }
        
        // Draw
        draw();
        
        // Continue animation
        animationId = requestAnimationFrame(animate);
    }
    
    // Billiards animation
    function animateBilliards() {
        const cueBall = scenarioObjects.billiards.cueBall;
        const targetBall = scenarioObjects.billiards.targetBall;
        
        // Move balls
        cueBall.x += cueBall.velocity.x * 0.1 * animationSpeed;
        cueBall.y += cueBall.velocity.y * 0.1 * animationSpeed;
        targetBall.x += targetBall.velocity.x * 0.1 * animationSpeed;
        targetBall.y += targetBall.velocity.y * 0.1 * animationSpeed;
        
        // Check for collision
        if (!scenarioObjects.billiards.hasCollided) {
            const dx = cueBall.x - targetBall.x;
            const dy = cueBall.y - targetBall.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= cueBall.radius + targetBall.radius) {
                // Handle collision
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);
                
                // Rotate velocities
                const vx1 = cueBall.velocity.x * cos + cueBall.velocity.y * sin;
                const vy1 = cueBall.velocity.y * cos - cueBall.velocity.x * sin;
                const vx2 = targetBall.velocity.x * cos + targetBall.velocity.y * sin;
                const vy2 = targetBall.velocity.y * cos - targetBall.velocity.x * sin;
                
                // Calculate new velocities (elastic collision)
                const newVx1 = ((cueBall.mass - targetBall.mass) * vx1 + 2 * targetBall.mass * vx2) / (cueBall.mass + targetBall.mass);
                const newVx2 = ((targetBall.mass - cueBall.mass) * vx2 + 2 * cueBall.mass * vx1) / (cueBall.mass + targetBall.mass);
                
                // Rotate back
                cueBall.velocity.x = newVx1 * cos - vy1 * sin;
                cueBall.velocity.y = vy1 * cos + newVx1 * sin;
                targetBall.velocity.x = newVx2 * cos - vy2 * sin;
                targetBall.velocity.y = vy2 * cos + newVx2 * sin;
                
                // Move balls apart to prevent sticking
                const overlap = cueBall.radius + targetBall.radius - distance;
                cueBall.x += overlap * cos / 2;
                cueBall.y += overlap * sin / 2;
                targetBall.x -= overlap * cos / 2;
                targetBall.y -= overlap * sin / 2;
                
                scenarioObjects.billiards.hasCollided = true;
            }
        }
        
        // Check for wall collisions
        if (cueBall.x - cueBall.radius <= 0) {
            cueBall.velocity.x = Math.abs(cueBall.velocity.x);
            cueBall.x = cueBall.radius;
        } else if (cueBall.x + cueBall.radius >= width) {
            cueBall.velocity.x = -Math.abs(cueBall.velocity.x);
            cueBall.x = width - cueBall.radius;
        }
        
        if (cueBall.y - cueBall.radius <= 0) {
            cueBall.velocity.y = Math.abs(cueBall.velocity.y);
            cueBall.y = cueBall.radius;
        } else if (cueBall.y + cueBall.radius >= height) {
            cueBall.velocity.y = -Math.abs(cueBall.velocity.y);
            cueBall.y = height - cueBall.radius;
        }
        
        if (targetBall.x - targetBall.radius <= 0) {
            targetBall.velocity.x = Math.abs(targetBall.velocity.x);
            targetBall.x = targetBall.radius;
        } else if (targetBall.x + targetBall.radius >= width) {
            targetBall.velocity.x = -Math.abs(targetBall.velocity.x);
            targetBall.x = width - targetBall.radius;
        }
        
        if (targetBall.y - targetBall.radius <= 0) {
            targetBall.velocity.y = Math.abs(targetBall.velocity.y);
            targetBall.y = targetBall.radius;
        } else if (targetBall.y + targetBall.radius >= height) {
            targetBall.velocity.y = -Math.abs(targetBall.velocity.y);
            targetBall.y = height - targetBall.radius;
        }
    }
    
    // Rocket animation
    function animateRocket() {
        const rocket = scenarioObjects.rocket.rocket;
        
        // Add thrust particles
        if (animationTime > 1 && rocket.y > 0) {
            // Create new particle
            const particleSize = 5 + Math.random() * 5;
            const particleVelocity = {
                x: (Math.random() - 0.5) * 2,
                y: 2 + Math.random() * 3
            };
            
            scenarioObjects.rocket.particles.push({
                x: rocket.x + rocket.width / 2 - particleSize / 2,
                y: rocket.y + rocket.height,
                width: particleSize,
                height: particleSize,
                velocity: particleVelocity,
                color: Math.random() > 0.5 ? '#e74c3c' : '#f39c12',
                life: 30
            });
            
            // Apply thrust to rocket
            rocket.velocity.y -= scenarioObjects.rocket.thrustForce * 0.1 * animationSpeed;
        }
        
        // Move rocket
        rocket.y += rocket.velocity.y * 0.1 * animationSpeed;
        
        // Update particles
        scenarioObjects.rocket.particles.forEach((particle, index) => {
            particle.x += particle.velocity.x * 0.1 * animationSpeed;
            particle.y += particle.velocity.y * 0.1 * animationSpeed;
            particle.life -= 0.1 * animationSpeed;
            
            // Remove dead particles
            if (particle.life <= 0) {
                scenarioObjects.rocket.particles.splice(index, 1);
            }
        });
    }
    
    // Skaters animation
    function animateSkaters() {
        const skater1 = scenarioObjects.skaters.skater1;
        const skater2 = scenarioObjects.skaters.skater2;
        
        // Apply push force after a delay
        if (animationTime > 2 && !scenarioObjects.skaters.hasPushed) {
            // Calculate push force based on mass ratio
            const totalMass = skater1.mass + skater2.mass;
            const pushForce = scenarioObjects.skaters.pushForce;
            
            // Apply forces in opposite directions, proportional to the other skater's mass
            skater1.velocity.x = -pushForce * skater2.mass / skater1.mass;
            skater2.velocity.x = pushForce * skater1.mass / skater2.mass;
            
            scenarioObjects.skaters.hasPushed = true;
        }
        
        // Move skaters
        skater1.x += skater1.velocity.x * animationSpeed;
        skater2.x += skater2.velocity.x * animationSpeed;
        
        // Check for wall collisions
        if (skater1.x <= 0) {
            skater1.velocity.x = Math.abs(skater1.velocity.x);
            skater1.x = 0;
        } else if (skater1.x + skater1.width >= width) {
            skater1.velocity.x = -Math.abs(skater1.velocity.x);
            skater1.x = width - skater1.width;
        }
        
        if (skater2.x <= 0) {
            skater2.velocity.x = Math.abs(skater2.velocity.x);
            skater2.x = 0;
        } else if (skater2.x + skater2.width >= width) {
            skater2.velocity.x = -Math.abs(skater2.velocity.x);
            skater2.x = width - skater2.width;
        }
    }
    
    // Car crash animation
    function animateCarCrash() {
        const car1 = scenarioObjects.carCrash.car1;
        const car2 = scenarioObjects.carCrash.car2;
        
        // Move cars
        car1.x += car1.velocity.x * 0.1 * animationSpeed;
        car2.x += car2.velocity.x * 0.1 * animationSpeed;
        
        // Check for collision
        if (!scenarioObjects.carCrash.hasCollided && car1.x + car1.width >= car2.x) {
            // Handle collision (inelastic)
            const totalMass = car1.mass + car2.mass;
            const totalMomentum = car1.mass * car1.velocity.x + car2.mass * car2.velocity.x;
            
            // New velocity (partially inelastic)
            const elasticity = 0.2; // 0 = completely inelastic, 1 = completely elastic
            
            // Calculate velocities for partially inelastic collision
            const v1 = (car1.mass * car1.velocity.x + car2.mass * (2 * car2.velocity.x - elasticity * car1.velocity.x)) / totalMass;
            const v2 = (car2.mass * car2.velocity.x + car1.mass * (2 * car1.velocity.x - elasticity * car2.velocity.x)) / totalMass;
            
            car1.velocity.x = v1;
            car2.velocity.x = v2;
            
            // Move cars apart to prevent sticking
            const overlap = (car1.x + car1.width) - car2.x;
            car1.x -= overlap / 2;
            car2.x += overlap / 2;
            
            scenarioObjects.carCrash.hasCollided = true;
        }
        
        // Check for wall collisions
        if (car1.x <= 0) {
            car1.velocity.x = Math.abs(car1.velocity.x);
            car1.x = 0;
        } else if (car1.x + car1.width >= width) {
            car1.velocity.x = -Math.abs(car1.velocity.x);
            car1.x = width - car1.width;
        }
        
        if (car2.x <= 0) {
            car2.velocity.x = Math.abs(car2.velocity.x);
            car2.x = 0;
        } else if (car2.x + car2.width >= width) {
            car2.velocity.x = -Math.abs(car2.velocity.x);
            car2.x = width - car2.width;
        }
    }
    
    // Draw function
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        ctx.beginPath();
        for (let x = 0; x < width; x += 50) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = 0; y < height; y += 50) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw scenario-specific elements
        switch (currentScenario) {
            case 'billiards':
                drawBilliards();
                break;
                
            case 'rocket':
                drawRocket();
                break;
                
            case 'skaters':
                drawSkaters();
                break;
                
            case 'carCrash':
                drawCarCrash();
                break;
        }
    }
    
    // Draw billiards scenario
    function drawBilliards() {
        const cueBall = scenarioObjects.billiards.cueBall;
        const targetBall = scenarioObjects.billiards.targetBall;
        
        // Draw pool table
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(0, 0, width, height);
        
        // Draw pockets
        const pocketRadius = 20;
        const pocketPositions = [
            { x: 0, y: 0 },
            { x: width / 2, y: 0 },
            { x: width, y: 0 },
            { x: 0, y: height },
            { x: width / 2, y: height },
            { x: width, y: height }
        ];
        
        pocketPositions.forEach(pos => {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, pocketRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#2c3e50';
            ctx.fill();
        });
        
        // Draw balls
        ctx.beginPath();
        ctx.arc(cueBall.x, cueBall.y, cueBall.radius, 0, Math.PI * 2);
        ctx.fillStyle = cueBall.color;
        ctx.fill();
        ctx.strokeStyle = '#95a5a6';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(targetBall.x, targetBall.y, targetBall.radius, 0, Math.PI * 2);
        ctx.fillStyle = targetBall.color;
        ctx.fill();
        
        // Draw velocity vectors
        drawVector(cueBall.x, cueBall.y, cueBall.velocity.x * 5, cueBall.velocity.y * 5, '#3498db');
        drawVector(targetBall.x, targetBall.y, targetBall.velocity.x * 5, targetBall.velocity.y * 5, '#e74c3c');
        
        // Draw momentum values
        ctx.font = '14px Arial';
        ctx.fillStyle = '#fff';
        
        const p1 = {
            x: cueBall.mass * cueBall.velocity.x,
            y: cueBall.mass * cueBall.velocity.y
        };
        
        const p2 = {
            x: targetBall.mass * targetBall.velocity.x,
            y: targetBall.mass * targetBall.velocity.y
        };
        
        const totalP = {
            x: p1.x + p2.x,
            y: p1.y + p2.y
        };
        
        ctx.fillText(`p₁ = (${p1.x.toFixed(1)}, ${p1.y.toFixed(1)}) kg·m/s`, 20, 30);
        ctx.fillText(`p₂ = (${p2.x.toFixed(1)}, ${p2.y.toFixed(1)}) kg·m/s`, 20, 50);
        ctx.fillText(`Total p = (${totalP.x.toFixed(1)}, ${totalP.y.toFixed(1)}) kg·m/s`, 20, 80);
        
        // Conservation indicator
        if (scenarioObjects.billiards.hasCollided) {
            ctx.fillStyle = 'white';
            ctx.fillText('Momentum is conserved in all directions!', width - 300, 30);
        }
    }
    
    // Draw rocket scenario
    function drawRocket() {
        // Draw sky background
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(0, 0, width, height);
        
        // Draw stars
        for (let i = 0; i < 100; i++) {
            const x = (i * 17) % width;
            const y = (i * 23) % height;
            const size = (i % 3) + 1;
            
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y, size, size);
        }
        
        // Draw ground
        ctx.fillStyle = '#95a5a6';
        ctx.fillRect(0, height - 20, width, 20);
        
        // Draw particles
        scenarioObjects.rocket.particles.forEach(particle => {
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.life / 30;
            ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
        });
        
        ctx.globalAlpha = 1;
        
        // Draw rocket
        const rocket = scenarioObjects.rocket.rocket;
        
        // Rocket body
        ctx.fillStyle = rocket.color;
        ctx.fillRect(rocket.x, rocket.y, rocket.width, rocket.height);
        
        // Rocket nose
        ctx.beginPath();
        ctx.moveTo(rocket.x, rocket.y);
        ctx.lineTo(rocket.x + rocket.width / 2, rocket.y - 20);
        ctx.lineTo(rocket.x + rocket.width, rocket.y);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        
        // Rocket fins
        ctx.beginPath();
        ctx.moveTo(rocket.x, rocket.y + rocket.height);
        ctx.lineTo(rocket.x - 15, rocket.y + rocket.height + 15);
        ctx.lineTo(rocket.x, rocket.y + rocket.height - 15);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(rocket.x + rocket.width, rocket.y + rocket.height);
        ctx.lineTo(rocket.x + rocket.width + 15, rocket.y + rocket.height + 15);
        ctx.lineTo(rocket.x + rocket.width, rocket.y + rocket.height - 15);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        
        // Draw momentum values
        ctx.font = '14px Arial';
        ctx.fillStyle = 'white';
        
        // Calculate total momentum of particles
        let particlesTotalMomentum = 0;
        scenarioObjects.rocket.particles.forEach(particle => {
            particlesTotalMomentum += particle.velocity.y;
        });
        
        const rocketMomentum = rocket.mass * rocket.velocity.y;
        
        ctx.fillText(`Rocket momentum = ${rocketMomentum.toFixed(1)} kg·m/s (upward)`, 20, 30);
        ctx.fillText(`Exhaust momentum = ${-particlesTotalMomentum.toFixed(1)} kg·m/s (downward)`, 20, 50);
        
        // Conservation explanation
        ctx.fillText('As the rocket expels mass downward, it gains upward momentum.', 20, 80);
        ctx.fillText('The total momentum of the system remains constant!', 20, 100);
    }
    
    // Draw skaters scenario
    function drawSkaters() {
        const skater1 = scenarioObjects.skaters.skater1;
        const skater2 = scenarioObjects.skaters.skater2;
        
        // Draw ice rink
        ctx.fillStyle = '#e8f4fc';
        ctx.fillRect(0, 0, width, height);
        
        // Draw ice lines
        ctx.strokeStyle = '#d6eaf8';
        ctx.lineWidth = 2;
        
        for (let x = 50; x < width; x += 100) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        
        // Draw skaters
        // Skater 1
        ctx.fillStyle = skater1.color;
        ctx.fillRect(skater1.x, skater1.y, skater1.width, skater1.height);
        
        // Skater 1 head
        ctx.beginPath();
        ctx.arc(skater1.x + skater1.width / 2, skater1.y - 10, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Skater 2
        ctx.fillStyle = skater2.color;
        ctx.fillRect(skater2.x, skater2.y, skater2.width, skater2.height);
        
        // Skater 2 head
        ctx.beginPath();
        ctx.arc(skater2.x + skater2.width / 2, skater2.y - 10, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw velocity vectors
        if (scenarioObjects.skaters.hasPushed) {
            drawVector(skater1.x + skater1.width / 2, skater1.y + skater1.height / 2, 
                      skater1.velocity.x * 50, 0, '#3498db');
            drawVector(skater2.x + skater2.width / 2, skater2.y + skater2.height / 2, 
                      skater2.velocity.x * 50, 0, '#e74c3c');
        }
        
        // Draw momentum values
        ctx.font = '14px Arial';
        ctx.fillStyle = '#2c3e50';
        
        const p1 = skater1.mass * skater1.velocity.x;
        const p2 = skater2.mass * skater2.velocity.x;
        const totalP = p1 + p2;
        
        ctx.fillText(`Skater 1 (${skater1.mass} kg): p = ${p1.toFixed(1)} kg·m/s`, 20, 30);
        ctx.fillText(`Skater 2 (${skater2.mass} kg): p = ${p2.toFixed(1)} kg·m/s`, 20, 50);
        ctx.fillText(`Total momentum = ${totalP.toFixed(1)} kg·m/s`, 20, 80);
        
        // Conservation explanation
        if (scenarioObjects.skaters.hasPushed) {
            ctx.fillText('When the skaters push off each other, they move in opposite directions.', 20, 110);
            ctx.fillText('The lighter skater moves faster, but the total momentum remains zero!', 20, 130);
        } else if (animationTime > 0.5) {
            ctx.fillText('Skaters are about to push off from each other...', width / 2 - 150, height / 2 - 50);
        }
    }
    
    // Draw car crash scenario
    function drawCarCrash() {
        const car1 = scenarioObjects.carCrash.car1;
        const car2 = scenarioObjects.carCrash.car2;
        
        // Draw road
        ctx.fillStyle = '#7f8c8d';
        ctx.fillRect(0, height / 2 + 30, width, 60);
        
        // Draw road markings
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.setLineDash([20, 10]);
        
        ctx.beginPath();
        ctx.moveTo(0, height / 2 + 60);
        ctx.lineTo(width, height / 2 + 60);
        ctx.stroke();
        
        ctx.setLineDash([]);
        
        // Draw cars
        // Car 1
        ctx.fillStyle = car1.color;
        ctx.fillRect(car1.x, car1.y, car1.width, car1.height);
        
        // Car 1 windows
        ctx.fillStyle = '#d6eaf8';
        ctx.fillRect(car1.x + car1.width * 0.6, car1.y + 5, car1.width * 0.3, car1.height * 0.6);
        
        // Car 1 wheels
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(car1.x + car1.width * 0.1, car1.y + car1.height, car1.width * 0.2, car1.height * 0.3);
        ctx.fillRect(car1.x + car1.width * 0.7, car1.y + car1.height, car1.width * 0.2, car1.height * 0.3);
        
        // Car 2
        ctx.fillStyle = car2.color;
        ctx.fillRect(car2.x, car2.y, car2.width, car2.height);
        
        // Car 2 windows
        ctx.fillStyle = '#d6eaf8';
        ctx.fillRect(car2.x + car2.width * 0.1, car2.y + 5, car2.width * 0.3, car2.height * 0.6);
        
        // Car 2 wheels
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(car2.x + car2.width * 0.1, car2.y + car2.height, car2.width * 0.2, car2.height * 0.3);
        ctx.fillRect(car2.x + car2.width * 0.7, car2.y + car2.height, car2.width * 0.2, car2.height * 0.3);
        
        // Draw velocity vectors
        drawVector(car1.x + car1.width / 2, car1.y - 20, car1.velocity.x * 5, 0, '#3498db');
        drawVector(car2.x + car2.width / 2, car2.y - 20, car2.velocity.x * 5, 0, '#e74c3c');
        
        // Draw momentum values
        ctx.font = '14px Arial';
        ctx.fillStyle = '#2c3e50';
        
        const p1 = car1.mass * car1.velocity.x;
        const p2 = car2.mass * car2.velocity.x;
        const totalP = p1 + p2;
        
        ctx.fillText(`Car 1 (${car1.mass} kg): p = ${p1.toFixed(1)} kg·m/s`, 20, 30);
        ctx.fillText(`Car 2 (${car2.mass} kg): p = ${p2.toFixed(1)} kg·m/s`, 20, 50);
        ctx.fillText(`Total momentum = ${totalP.toFixed(1)} kg·m/s`, 20, 80);
        
        // Conservation explanation
        if (scenarioObjects.carCrash.hasCollided) {
            ctx.fillText('After collision, the total momentum remains the same!', 20, 110);
            ctx.fillText('The heavier car changes velocity less than the lighter car.', 20, 130);
        }
    }
    
    // Helper function to draw vectors
    function drawVector(x, y, dx, dy, color) {
        const arrowSize = 7;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        if (length < 0.1) return;
        
        const angle = Math.atan2(dy, dx);
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(x + dx, y + dy);
        ctx.lineTo(
            x + dx - arrowSize * Math.cos(angle - Math.PI / 6),
            y + dy - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            x + dx - arrowSize * Math.cos(angle + Math.PI / 6),
            y + dy - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    // Initialize
    updateValues();
    draw();
}
