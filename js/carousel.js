 document.addEventListener('DOMContentLoaded', function() {
        // Add typewriter styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .typewriter-text {
                display: inline-block;
                position: relative;
            }
            .typewriter-cursor {
                display: inline-block;
                margin-left: 2px;
                animation: blink 1s infinite;
                color: #EB9D69;
            }
            @keyframes blink {
                0%, 100% { opacity: 1 }
                50% { opacity: 0 }
            }
        `;
        document.head.appendChild(style);

        // Initialize Swiper with autoplay
        const swiper = new Swiper('.swiper', {
            autoplay: {
                delay: 5000, // 3 seconds per slide
                disableOnInteraction: false,
                waitForTransition: true
            },
            loop: true,
            speed: 1000,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
                init: function() {
                    prepareTypewriterElements();
                    startTypewriter(this.slides[this.activeIndex]);
                },
                slideChangeTransitionStart: function() {
                    resetAllTypewriters();
                },
                slideChangeTransitionEnd: function() {
                    startTypewriter(this.slides[this.activeIndex]);
                }
            }
        });

        // Typewriter functionality
        let typingIntervals = [];

        function prepareTypewriterElements() {
            const slides = document.querySelectorAll('.swiper-slide');
            slides.forEach(slide => {
                const headings = slide.querySelectorAll('h1, h2');
                headings.forEach(heading => {
                    const originalText = heading.textContent;
                    heading.innerHTML = '';
                    
                    const textSpan = document.createElement('span');
                    textSpan.className = 'typewriter-text';
                    textSpan.setAttribute('data-original', originalText);
                    
                    const cursorSpan = document.createElement('span');
                    cursorSpan.className = 'typewriter-cursor';
                    cursorSpan.textContent = '|';
                    
                    heading.appendChild(textSpan);
                    heading.appendChild(cursorSpan);
                });
            });
        }

        function resetAllTypewriters() {
            typingIntervals.forEach(interval => clearInterval(interval));
            typingIntervals = [];
            
            const allTypewriters = document.querySelectorAll('.typewriter-text');
            allTypewriters.forEach(tw => {
                tw.textContent = '';
            });
        }

        function startTypewriter(slide) {
            const typewriterElements = slide.querySelectorAll('.typewriter-text');
            
            typewriterElements.forEach((element, index) => {
                const originalText = element.getAttribute('data-original');
                let i = 0;
                
                const delay = index * 300;
                
                setTimeout(() => {
                    const interval = setInterval(() => {
                        if (i < originalText.length) {
                            element.textContent += originalText.charAt(i);
                            i++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 100);
                    
                    typingIntervals.push(interval);
                }, delay);
            });
        }
    });