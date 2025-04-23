// JavaScript for Qatar AI Education Roadmap Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modals = {
        'chemistry': document.getElementById('modal-chemistry'),
        'math': document.getElementById('modal-math'),
        'digital-twin': document.getElementById('modal-digital-twin'),
        'physics': document.getElementById('modal-physics')
    };
    
    // Get all modal trigger buttons
    const modalButtons = document.querySelectorAll('.btn-modal');
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close');
    
    // Open modal when button is clicked
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modelType = this.getAttribute('data-model');
            if (modals[modelType]) {
                modals[modelType].style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });
    
    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        for (const key in modals) {
            if (event.target === modals[key]) {
                modals[key].style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll smoothly to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Elements to observe for animation
    const animateElements = document.querySelectorAll('.feature, .phase, .theme-card, .model-card, .implementation-card, .pillar');
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation classes to elements
    document.querySelectorAll('.feature, .implementation-card, .pillar').forEach(el => {
        el.classList.add('fade-in');
    });
    
    document.querySelectorAll('.phase').forEach(el => {
        el.classList.add('slide-in');
    });
    
    document.querySelectorAll('.theme-card, .model-card').forEach(el => {
        el.classList.add('scale-in');
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .slide-in {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scale-in {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(1);
        }
    `;
    document.head.appendChild(style);
    
    // Interactive timeline navigation
    const timelinePhases = document.querySelectorAll('.phase');
    const phaseYears = document.querySelectorAll('.phase-year');
    
    phaseYears.forEach((yearElement, index) => {
        yearElement.addEventListener('click', function() {
            // Highlight the selected phase
            timelinePhases.forEach(phase => {
                phase.classList.remove('active-phase');
            });
            timelinePhases[index].classList.add('active-phase');
            
            // Scroll to the phase content
            timelinePhases[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });
    
    // Add CSS for active phase
    const timelineStyle = document.createElement('style');
    timelineStyle.textContent = `
        .active-phase .phase-content {
            box-shadow: 0 0 15px rgba(0, 164, 189, 0.5);
            transform: scale(1.03);
        }
        
        .phase-year {
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .phase-year:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(timelineStyle);
    
    // Responsive navigation menu for mobile
    const header = document.querySelector('header');
    const navContainer = document.querySelector('nav');
    
    // Create mobile menu toggle button
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    header.querySelector('.container').appendChild(mobileMenuToggle);
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        navContainer.classList.toggle('active');
        this.innerHTML = navContainer.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navContainer.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Add CSS for mobile menu
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--primary-color);
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
            }
            
            nav {
                display: none;
                width: 100%;
                padding-top: 1rem;
            }
            
            nav.active {
                display: block;
            }
            
            nav ul {
                flex-direction: column;
                align-items: center;
            }
            
            nav ul li {
                margin: 0.5rem 0;
            }
            
            header .container {
                position: relative;
                padding-bottom: 1rem;
            }
        }
    `;
    document.head.appendChild(mobileMenuStyle);
});
