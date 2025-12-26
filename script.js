// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Initialize slider dots
function initSliderDots() {
    const dotsContainer = document.querySelector('.slider-dots');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Show slide
function showSlide(n) {
    const dots = document.querySelectorAll('.dot');
    
    if (n >= totalSlides) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = n;
    }

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current slide
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

// Change slide
function changeSlide(n) {
    showSlide(currentSlide + n);
}

// Go to specific slide
function goToSlide(n) {
    showSlide(n);
}

// Auto slide
function autoSlide() {
    changeSlide(1);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    initSliderDots();
    
    // Auto slide every 5 seconds
    setInterval(autoSlide, 5000);

    // Mobile menu toggle
    setupMobileMenu();

    // Smooth scrolling for navigation links
    setupSmoothScrolling();

    // Add scroll animation
    setupScrollAnimation();

    // Initialize Tet effects
    initTetEffects();
});

// Tet Effects
function initTetEffects() {
    // Create toggle button
    createTetToggleButton();
    
    // Check if effects are enabled
    const effectsEnabled = localStorage.getItem('tetEffects') !== 'false';
    
    if (effectsEnabled) {
        startTetEffects();
    }
}

function createTetToggleButton() {
    const button = document.createElement('button');
    button.id = 'tet-toggle-btn';
    button.innerHTML = '🎆';
    button.title = 'Bật/Tắt hiệu ứng Tết';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.width = '60px';
    button.style.height = '60px';
    button.style.borderRadius = '50%';
    button.style.border = '3px solid gold';
    button.style.background = 'linear-gradient(135deg, #ff0000, #ffcc00)';
    button.style.fontSize = '28px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '10001';
    button.style.boxShadow = '0 4px 15px rgba(255, 0, 0, 0.5)';
    button.style.transition = 'all 0.3s';
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', function() {
        const effectsEnabled = localStorage.getItem('tetEffects') !== 'false';
        
        if (effectsEnabled) {
            // Disable effects
            stopTetEffects();
            localStorage.setItem('tetEffects', 'false');
            this.innerHTML = '🎇';
            this.style.opacity = '0.5';
        } else {
            // Enable effects
            startTetEffects();
            localStorage.setItem('tetEffects', 'true');
            this.innerHTML = '🎆';
            this.style.opacity = '1';
        }
    });
    
    // Set initial state
    const effectsEnabled = localStorage.getItem('tetEffects') !== 'false';
    if (!effectsEnabled) {
        button.innerHTML = '🎇';
        button.style.opacity = '0.5';
    }
    
    document.body.appendChild(button);
}

let fireworksAnimationId = null;
let flowersInterval = null;

function startTetEffects() {
    createFireworks();
    createFallingFlowers();
    createTetGreeting();
}

function stopTetEffects() {
    // Stop fireworks animation
    if (fireworksAnimationId) {
        cancelAnimationFrame(fireworksAnimationId);
        fireworksAnimationId = null;
    }
    
    // Remove fireworks canvas
    const canvas = document.getElementById('fireworks-canvas');
    if (canvas) {
        canvas.remove();
    }
    
    // Stop flowers
    if (flowersInterval) {
        clearInterval(flowersInterval);
        flowersInterval = null;
    }
    
    // Remove flowers container
    const flowersContainer = document.getElementById('falling-flowers');
    if (flowersContainer) {
        flowersContainer.remove();
    }
    
    // Remove greeting
    const greeting = document.getElementById('tet-greeting');
    if (greeting) {
        greeting.remove();
    }
}

// Fireworks Effect
function createFireworks() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworks-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.5;
            this.speed = Math.random() * 3 + 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }

        update() {
            this.y -= this.speed;
            return this.y > this.targetY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        explode() {
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
            return this.alpha > 0;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) {
            fireworks.push(new Firework());
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw();
            if (!fireworks[i].update()) {
                fireworks[i].explode();
                fireworks.splice(i, 1);
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].draw();
            if (!particles[i].update()) {
                particles.splice(i, 1);
            }
        }

        fireworksAnimationId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Falling Flowers Effect (Mai flowers)
function createFallingFlowers() {
    const container = document.createElement('div');
    container.id = 'falling-flowers';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9998';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'falling-flower';
        flower.innerHTML = '🌸'; // Mai flower emoji
        flower.style.position = 'absolute';
        flower.style.fontSize = Math.random() * 20 + 15 + 'px';
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = '-50px';
        flower.style.opacity = Math.random() * 0.5 + 0.3;
        flower.style.animation = `fall ${Math.random() * 5 + 5}s linear infinite`;
        flower.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 10000);
    }

    // Create flowers periodically
    flowersInterval = setInterval(createFlower, 300);

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
        .falling-flower {
            will-change: transform;
        }
    `;
    document.head.appendChild(style);
}

// Tet Greeting
function createTetGreeting() {
    const greeting = document.createElement('div');
    greeting.id = 'tet-greeting';
    greeting.style.position = 'fixed';
    greeting.style.top = '50%';
    greeting.style.left = '50%';
    greeting.style.transform = 'translate(-50%, -50%)';
    greeting.style.zIndex = '10000';
    greeting.style.textAlign = 'center';
    greeting.style.pointerEvents = 'none';
    greeting.style.opacity = '0';
    greeting.style.transition = 'opacity 2s';
    
    greeting.innerHTML = `
        <div style="background: linear-gradient(135deg, #ff0000, #ffcc00); 
                    padding: 30px 60px; 
                    border-radius: 20px; 
                    box-shadow: 0 10px 40px rgba(255, 0, 0, 0.5);
                    border: 3px solid gold;">
            <h1 style="color: white; 
                       font-size: 48px; 
                       margin: 0; 
                       text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
                       font-weight: bold;
                       font-family: Arial, sans-serif;">
                CHÚC MỪNG NĂM MỚI 2026
            </h1>
            <p style="color: #ffe699; 
                      font-size: 24px; 
                      margin: 10px 0 0 0;
                      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                      font-weight: bold;">
                Vạn Sự Như Ý - Phát Tài Phát Lộc
            </p>
        </div>
    `;
    
    document.body.appendChild(greeting);

    // Show greeting after 1 second
    setTimeout(() => {
        greeting.style.opacity = '1';
    }, 1000);

    // Hide greeting after 5 seconds
    setTimeout(() => {
        greeting.style.opacity = '0';
        setTimeout(() => {
            greeting.remove();
        }, 2000);
    }, 5000);
}

// Mobile menu setup
function setupMobileMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        if (window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const menu = dropdown.querySelector('.dropdown-menu');
                
                // Toggle display
                if (menu.style.display === 'block') {
                    menu.style.display = 'none';
                } else {
                    // Hide all other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(m => {
                        m.style.display = 'none';
                    });
                    menu.style.display = 'block';
                }
            });
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animation for elements
function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add animation to sections
    const sections = document.querySelectorAll('.about-content, .video-container');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Language switcher
const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all buttons
        langButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Here you can add logic to switch language
        const lang = this.textContent.toLowerCase();
        console.log('Language switched to:', lang);
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    setupMobileMenu();
});

// Keyboard navigation for slider
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const sliderContainer = document.querySelector('.slider-container');

sliderContainer.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        changeSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        changeSlide(-1);
    }
}
