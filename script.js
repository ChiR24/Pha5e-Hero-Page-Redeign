document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Elements
    const cursor = document.querySelector('.custom-cursor');
    const splashScreen = document.querySelector('.splash-screen');
    const mainContent = document.querySelector('.main-content');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    const splashLogo = document.querySelector('.splash-logo');
    const heroText = document.querySelector('.hero-text');
    const imageContainers = document.querySelectorAll('.image-container');
    const mainTitles = document.querySelectorAll('.main-title');
    const navLogo = document.querySelector('.nav-logo');

    // Initial setup
    splashScreen.classList.add('active');
    
    // Force initial visibility of main content and hero section
    mainContent.style.display = 'block';
    mainContent.style.opacity = '1';
    document.querySelector('.hero-section').style.display = 'grid';
    document.querySelector('.hero-section').style.opacity = '1';
    document.querySelector('.hero-content').style.display = 'grid';
    document.querySelector('.hero-content').style.opacity = '1';
    
    // Create glitch effect for splash logo
    const glitchTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 3
    });

    glitchTimeline
        .to(splashLogo, {
            skewX: 20,
            duration: 0.1,
            ease: 'power4.inOut'
        })
        .to(splashLogo, {
            skewX: 0,
            duration: 0.1,
            ease: 'power4.inOut'
        })
        .to(splashLogo, {
            opacity: 0.8,
            duration: 0.1,
            ease: 'power4.inOut'
        })
        .to(splashLogo, {
            opacity: 1,
            duration: 0.1,
            ease: 'power4.inOut'
        });

    // Magnetic effect
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Custom cursor with text
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    // Show cursor when mouse moves
    document.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });

    // Handle cursor interactions
    document.querySelectorAll('[data-cursor]').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursor.classList.add('text-visible');
            
            if (element.dataset.cursor === 'view') {
                cursor.setAttribute('data-text', 'View');
            } else if (element.dataset.cursor === 'hover') {
                cursor.setAttribute('data-text', '');
            }

            // Scale effect on hover
            gsap.to(element, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursor.classList.remove('text-visible');
            cursor.setAttribute('data-text', '');

            // Reset scale
            gsap.to(element, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Enhanced loading animation
    const loadingTimeline = gsap.timeline();

    // Simpler loading animation
    loadingTimeline
        .to(loadingProgress, {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                const progress = Math.round(loadingProgress.offsetWidth / loadingProgress.parentElement.offsetWidth * 100);
                document.querySelector('.loading-percentage').textContent = `${progress}%`;
            }
        })
        .to(loadingText, {
            opacity: 1,
            duration: 0.3
        }, '-=1')
        .call(() => {
            // Ensure main content is visible
            mainContent.style.display = 'block';
            mainContent.style.opacity = '1';
            mainContent.classList.add('loaded');
            
            // Remove splash screen immediately
            splashScreen.remove();
            
            // Initialize animations after splash screen is removed
            initMainAnimations();
        });

    // Main animations initialization
    function initMainAnimations() {
        // Force visibility and white color for all text elements
        gsap.set(['.main-title', '.main-title span', '.word-wrapper', '.glitch-wrapper'], {
            color: '#fff',
            opacity: 1,
            visibility: 'visible',
            textFillColor: '#fff',
            webkitTextFillColor: '#fff',
            backgroundImage: 'none',
            background: 'none'
        });

        // Ensure text is visible and white
        const mainTitles = document.querySelectorAll('.main-title, .main-title span, .word-wrapper, .glitch-wrapper');
        mainTitles.forEach(element => {
            element.style.color = '#fff';
            element.style.webkitTextFillColor = '#fff';
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.background = 'none';
            element.style.backgroundImage = 'none';
            element.style.animation = 'none';
        });

        // Force white color for hero text
        gsap.set('.hero-text', {
            color: '#fff',
            opacity: 1,
            visibility: 'visible'
        });

        // Force visibility of all main elements
        gsap.set([mainContent, '.hero-section', '.hero-content', '.hero-text', '.hero-images', '.main-title', '.main-title span'], {
            opacity: 1,
            visibility: 'visible',
            color: 'var(--secondary-color)',
            clearProps: 'transform'
        });

        // Set specific display properties for grid elements
        gsap.set(['.hero-section', '.hero-content'], {
            display: 'grid'
        });

        // Ensure text is visible and properly styled
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
            mainTitle.style.opacity = '1';
            mainTitle.style.visibility = 'visible';
            mainTitle.style.color = 'var(--secondary-color)';
        }

        // Remove any transforms or animations that might interfere
        gsap.set('.hero-text', {
            clearProps: 'all',
            opacity: 1,
            visibility: 'visible'
        });

        // Specifically set image containers and images to be visible
        gsap.set('.image-container', {
            opacity: 1,
            visibility: 'visible',
            clearProps: 'transform'
        });

        gsap.set('.hero-image', {
            opacity: 1,
            visibility: 'visible',
            scale: 1,
            clearProps: 'transform'
        });

        // Initialize image containers
        imageContainers.forEach((container, index) => {
            // Reset any existing transforms
            gsap.set(container, {
                clearProps: 'all'
            });

            // Add hover effect
            container.addEventListener('mouseenter', () => {
                // Scale up and remove vector effect from hovered image
                gsap.to(container, {
                    scale: 1.05,
                    filter: 'grayscale(0) brightness(1) contrast(1)',
                    opacity: 1,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    duration: 0.4,
                    ease: 'power2.out'
                });

                // Apply vector effect to other images
                imageContainers.forEach(otherContainer => {
                    if (otherContainer !== container) {
                        gsap.to(otherContainer, {
                            filter: 'grayscale(1) brightness(1.2) contrast(0.8)',
                            opacity: 0.5,
                            scale: 0.95,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    }
                });
            });

            container.addEventListener('mouseleave', () => {
                // Reset all images
                imageContainers.forEach(cont => {
                    gsap.to(cont, {
                        scale: 1,
                        filter: 'grayscale(0) brightness(1) contrast(1)',
                        opacity: 1,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                });
            });

            // Enhanced mouse move effect
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(container, {
                    rotationY: x * 15,
                    rotationX: -y * 15,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                const image = container.querySelector('.hero-image');
                if (image) {
                    gsap.to(image, {
                        x: x * 20,
                        y: y * 20,
                        scale: 1.1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });

            container.addEventListener('mouseleave', () => {
                gsap.to(container, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                const image = container.querySelector('.hero-image');
                if (image) {
                    gsap.to(image, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Initial reveal animation for images
        gsap.from(imageContainers, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            clearProps: 'all'
        });

        // Remove scroll progress bar
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.remove();
        }

        // Remove scroll-based parallax and reveal
        const scrollTimeline = gsap.timeline();

        // Enhanced initial animation with adjusted timing
        const enterTimeline = gsap.timeline({
            defaults: { ease: 'power3.out' }
        });

        enterTimeline
            .from('.hero-text', {
                y: 30,
                opacity: 0,
                duration: 1,
                clearProps: 'all'
            })
            .from('.word-wrapper', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power4.out',
                clearProps: 'all'
            }, '-=0.5');

        // Remove scroll indicator animation
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.remove();
        }

        // Remove scroll event listener
        window.removeEventListener('scroll', () => {});

        // Add magnetic effect to images
        imageContainers.forEach(container => {
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                
                gsap.to(container, {
                    x: x * 0.1,
                    y: y * 0.1,
                    rotation: x * 0.01,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });

            container.addEventListener('mouseleave', () => {
                gsap.to(container, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
        });

        // Menu button animation
        const menuButton = document.querySelector('.menu-button');
        menuButton.addEventListener('mouseenter', () => {
            gsap.to(menuButton.querySelectorAll('span'), {
                scaleX: 1.2,
                duration: 0.3,
                ease: 'power2.out',
                stagger: 0.1
            });
        });

        menuButton.addEventListener('mouseleave', () => {
            gsap.to(menuButton.querySelectorAll('span'), {
                scaleX: 1,
                duration: 0.3,
                ease: 'power2.out',
                stagger: 0.1
            });
        });

        // Enhanced text hover animations
        document.querySelectorAll('.main-title').forEach(title => {
            const words = title.textContent.split(' ');
            title.innerHTML = words.map((word, index) => 
                `<span class="glitch-wrapper" data-text="${word}" style="--word-index: ${index};">${word}</span>`
            ).join(' ');

            // Add hover trigger for glitch effect
            title.addEventListener('mouseenter', () => {
                title.querySelectorAll('.glitch-wrapper').forEach((wrapper, i) => {
                    wrapper.style.animationDelay = `${i * 0.1}s`;
                    wrapper.classList.add('glitch-active');
                });
            });

            title.addEventListener('mouseleave', () => {
                title.querySelectorAll('.glitch-wrapper').forEach(wrapper => {
                    wrapper.style.animationDelay = '0s';
                    wrapper.classList.remove('glitch-active');
                });
            });
        });

        // Enhanced image hover interactions
        imageContainers.forEach((container, index) => {
            // Existing hover effects...

            // Add parallax effect on mouse move
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / container.offsetWidth;
                const y = (e.clientY - rect.top) / container.offsetHeight;

                const img = container.querySelector('.hero-image');
                const caption = container.querySelector('.image-caption');

                gsap.to(img, {
                    x: (x - 0.5) * 30,
                    y: (y - 0.5) * 30,
                    rotationY: (x - 0.5) * 20,
                    rotationX: (y - 0.5) * 20,
                    duration: 0.5
                });

                gsap.to(caption, {
                    x: (x - 0.5) * -15,
                    y: (y - 0.5) * -15,
                    duration: 0.5
                });
            });

            container.addEventListener('mouseleave', () => {
                const img = container.querySelector('.hero-image');
                const caption = container.querySelector('.image-caption');

                gsap.to([img, caption], {
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.5
                });
            });

            // Add floating animation
            gsap.to(container, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: index * 0.2
            });
        });

        // Add random glitch effect to text
        const glitchText = () => {
            const titles = document.querySelectorAll('.main-title');
            titles.forEach(title => {
                if (Math.random() > 0.97) { // 3% chance to trigger
                    title.querySelectorAll('.glitch-wrapper').forEach((wrapper, i) => {
                        wrapper.style.animationDelay = `${i * 0.1}s`;
                        wrapper.classList.add('glitch-active');
                        
                        setTimeout(() => {
                            wrapper.classList.remove('glitch-active');
                        }, 500);
                    });
                }
            });
        };

        // Run glitch effect periodically
        setInterval(glitchText, 100);

        // Initialize text animations for each line
        const heroTexts = document.querySelectorAll('.hero-text .main-title');
        
        // First line - Wave effect
        if (heroTexts[0]) {
            const text = heroTexts[0].textContent;
            heroTexts[0].innerHTML = text.split('').map(char => 
                `<span class="wave-letter">${char}</span>`
            ).join('');

            const waveLetters = heroTexts[0].querySelectorAll('.wave-letter');
            waveLetters.forEach((letter, index) => {
                gsap.to(letter, {
                    y: -20,
                    duration: 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 0.05
                });
            });
        }

        // Second line - Typewriter glitch effect
        if (heroTexts[1]) {
            const text = heroTexts[1].textContent;
            heroTexts[1].innerHTML = text.split('').map(char => 
                `<span class="type-letter" style="opacity: 0">${char}</span>`
            ).join('');

            const typeLetters = heroTexts[1].querySelectorAll('.type-letter');
            typeLetters.forEach((letter, index) => {
                gsap.to(letter, {
                    opacity: 1,
                    duration: 0.1,
                    delay: index * 0.1,
                    onComplete: () => {
                        if (Math.random() > 0.7) {
                            gsap.to(letter, {
                                skewX: gsap.utils.random(-20, 20),
                                duration: 0.1,
                                yoyo: true,
                                repeat: 1
                            });
                        }
                    }
                });
            });
        }

        // Third line - 3D rotation with scramble
        if (heroTexts[2]) {
            const text = heroTexts[2].textContent;
            heroTexts[2].innerHTML = text.split('').map(char => 
                `<span class="rotate-letter" style="display: inline-block">${char}</span>`
            ).join('');

            const rotateLetters = heroTexts[2].querySelectorAll('.rotate-letter');
            rotateLetters.forEach((letter, index) => {
                gsap.to(letter, {
                    rotationY: 360,
                    duration: 2,
                    repeat: -1,
                    ease: "power1.inOut",
                    delay: index * 0.1
                });

                // Random scramble effect
                setInterval(() => {
                    if (Math.random() > 0.95) {
                        const originalChar = letter.textContent;
                        letter.textContent = String.fromCharCode(gsap.utils.random(65, 90));
                        gsap.to(letter, {
                            scale: 1.2,
                            duration: 0.1,
                            yoyo: true,
                            repeat: 1,
                            onComplete: () => {
                                letter.textContent = originalChar;
                            }
                        });
                    }
                }, 2000);
            });
        }

        // Add hover effects for each line
        heroTexts.forEach((title, titleIndex) => {
            title.addEventListener('mouseenter', () => {
                const letters = title.querySelectorAll('span');
                letters.forEach((letter, index) => {
                    gsap.to(letter, {
                        scale: 1.2,
                        duration: 0.3,
                        delay: index * 0.02,
                        ease: "back.out(1.7)"
                    });
                });
            });

            title.addEventListener('mouseleave', () => {
                const letters = title.querySelectorAll('span');
                letters.forEach((letter, index) => {
                    gsap.to(letter, {
                        scale: 1,
                        duration: 0.3,
                        delay: index * 0.02,
                        ease: "back.out(1.7)"
                    });
                });
            });
        });
    }

    // Add random glitch effect
    const randomGlitch = () => {
        if (Math.random() > 0.7) { // 30% chance to trigger
            gsap.to(splashLogo, {
                skewX: gsap.utils.random(-10, 10),
                opacity: gsap.utils.random(0.8, 1),
                duration: 0.1,
                ease: 'power4.inOut',
                onComplete: () => {
                    gsap.to(splashLogo, {
                        skewX: 0,
                        opacity: 1,
                        duration: 0.1,
                        ease: 'power4.inOut'
                    });
                }
            });
        }
    };

    // Add random glitch every 2 seconds
    const glitchInterval = setInterval(randomGlitch, 2000);

    // Clear interval when loading is complete
    loadingTimeline.eventCallback('onComplete', () => {
        clearInterval(glitchInterval);
    });

    // Parallax effect for hero section
    const heroImages = document.querySelector('.hero-images');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.35;
        
        if (heroText && window.innerWidth > 1024) {
            heroText.style.transform = `translateY(${rate}px)`;
        }
        if (heroImages && window.innerWidth > 1024) {
            heroImages.style.transform = `translateY(${rate * 0.5}px)`;
        }
    });

    // Dynamic word wrapping for main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const words = mainTitle.textContent.split(' ');
        mainTitle.innerHTML = words.map((word, index) => 
            `<span class="word-wrapper" style="--word-index: ${index};">${word}</span>`
        ).join(' ');
    }

    // Enhanced image container interactions
    document.querySelectorAll('.image-container').forEach((container, index) => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * 10;
            const rotateY = (x - 0.5) * 10;
            
            container.style.transform = `
                perspective(1000px)
                rotateX(${-rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(30px)
            `;
            
            const image = container.querySelector('.hero-image');
            if (image) {
                image.style.transform = `scale(1.1) translateZ(30px)`;
            }
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'none';
            const image = container.querySelector('.hero-image');
            if (image) {
                image.style.transform = 'none';
            }
        });
    });

    // Scroll progress indicator
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        if (progressBar) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrolled = window.pageYOffset;
            const progress = (scrolled / (documentHeight - windowHeight)) * 100;
            progressBar.style.transform = `scaleX(${progress / 100})`;
        }
    });

    // Add glitch effect to nav logo
    const navLogoGlitch = () => {
        const navLogo = document.querySelector('.nav-logo');
        if (!navLogo) return;

        // Split text into individual letters if not already done
        if (!navLogo.querySelector('.letter')) {
            const text = navLogo.textContent;
            navLogo.innerHTML = text.split('').map(char => 
                `<span class="letter">${char}</span>`
            ).join('');
        }

        const letters = navLogo.querySelectorAll('.letter');
        
        // Animate each letter with a delay
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add('animate');
                
                // Remove animation class after it's complete
                setTimeout(() => {
                    letter.classList.remove('animate');
                }, 2000); // Match this with the animation duration
            }, index * 100); // Stagger the start of each letter's animation
        });
    };

    // Run nav logo animation periodically
    setInterval(navLogoGlitch, 5000); // Run every 5 seconds

    // Add hover effect for nav logo
    if (navLogo) {
        navLogo.addEventListener('mouseenter', () => {
            const letters = navLogo.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('animate');
                    
                    setTimeout(() => {
                        letter.classList.remove('animate');
                    }, 2000);
                }, index * 100);
            });
        });
    }
}); 