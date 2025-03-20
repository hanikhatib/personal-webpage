// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js for background effect
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#3b82f6'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.15,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3b82f6',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Scroll Indicator Visibility  -- NEW CODE GOES HERE --
    function toggleScrollIndicator() {
        const heroSection = document.querySelector('.hero');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (heroSection && scrollIndicator) {
            // Check if the hero section is taking up the full viewport height *or more*
            if (heroSection.scrollHeight <= window.innerHeight) {
                scrollIndicator.style.display = 'none'; // Hide if no scrolling needed
            } else {
                scrollIndicator.style.display = 'flex'; // Show if scrolling is possible
            }
        }
    }

    // Initial check and on resize
    toggleScrollIndicator();
    window.addEventListener('resize', toggleScrollIndicator);

        // Add scroll event listener to change navbar style on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        //removed !important from inline styles.
        if (window.scrollY > 50) {
            navbar.style.padding = '0.75rem 0';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
        }
    });


    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Animate stat values
    function animateStats() {
        document.querySelectorAll('.stat-value').forEach(stat => {
            if (stat.textContent === '0' || stat.getAttribute('data-animated')) return;

            const targetValue = parseInt(stat.textContent) || 0;
            const duration = 1500; // Animation duration in milliseconds
            const frameDuration = 1000 / 60; // Assume 60fps
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;

            stat.setAttribute('data-animated', 'true');
            const originalValue = stat.textContent;
            stat.textContent = '0';

            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const currentValue = Math.round(progress * targetValue);

                stat.textContent = currentValue;

                if (frame === totalFrames) {
                    clearInterval(counter);
                    stat.textContent = originalValue;
                }
            }, frameDuration);
        });
    }
});