////HEADER

const header = document.querySelector('header');
        const menuIcon = document.querySelector('.menu-icon');
        const menuIconI = document.querySelector('.menu-icon i');

        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            header.classList.toggle('expanded');
            
            // Toggle between menu and close icon
            if (menuIconI.classList.contains('ti-menu')) {
                menuIconI.classList.remove('ti-menu');
                menuIconI.classList.add('ti-close');
            } else {
                menuIconI.classList.remove('ti-close');
                menuIconI.classList.add('ti-menu');
            }
        });


////////////ACTIVE LINK

document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname.split("/").pop(); // Get the current page name
    const navLinks = document.querySelectorAll(".nav-menu ul li a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop(); // Get the link's target page name
        if (linkPath === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});



///////SCROLL TO THE TOP

const scrollTop = document.querySelector('.scroll-top');
        const progressCircle = document.querySelector('.scroll-progress circle');
        const circumference = progressCircle.getTotalLength();

        // Show/hide scroll button and update progress
        window.addEventListener('scroll', () => {
            const scrollPercent = (document.documentElement.scrollTop || document.body.scrollTop) / 
                ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight);
            
            const scrolled = Math.min(Math.max(scrollPercent, 0), 1);
            const offset = circumference - (scrolled * circumference);
            
            progressCircle.style.strokeDashoffset = offset;

            if (scrolled > 0.1) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        // Smooth scroll to top when clicked
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });



///////FOR HEROSECTION

  
 // Wait for the page to load, then start a 1-second delay before playing the video
 window.addEventListener("load", () => {
    const heroVideo = document.getElementById("heroVideo");
    const thumbnailOverlay = document.getElementById("thumbnailOverlay");
  
    // Start a 1-second timeout to play the video
    setTimeout(() => {
        thumbnailOverlay.style.display = "none"; // Hide the thumbnail
        heroVideo.play(); // Start the video
    }, 1000); // 1 second
  
    // Add a timeupdate event listener to the video
    heroVideo.addEventListener("timeupdate", () => {
        // Check if the current time has reached or exceeded 1 minute, 5 seconds
        if (heroVideo.currentTime >= 25) {
            heroVideo.currentTime = 0; // Reset the video to the beginning
            heroVideo.play(); // Replay the video
        }
    });
  });



  /// CONTENT CONTINUATION


  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.cont-image img');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    let currentIndex = 0;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Function to show specific image
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

    // Function to go to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    // Function to go to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextImage, 6000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners for arrows
    leftArrow.addEventListener('click', () => {
        prevImage();
        resetAutoSlide();
    });

    rightArrow.addEventListener('click', () => {
        nextImage();
        resetAutoSlide();
    });

    // Touch events for swipe functionality
    const imageContainer = document.querySelector('.cont-image');

    imageContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    imageContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevImage();
            } else {
                nextImage();
            }
            resetAutoSlide();
        }
    }

    // Start auto slide on page load
    startAutoSlide();

    // Check for media query
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    function handleMediaQueryChange(e) {
        if (e.matches) {
            // If screen is wider than 1024px, stop the slideshow
            clearInterval(autoSlideInterval);
            images.forEach(img => img.classList.remove('active'));
        } else {
            // If screen is narrower than 1024px, restart the slideshow
            images.forEach(img => img.classList.remove('active'));
            images[currentIndex].classList.add('active');
            startAutoSlide();
        }
    }

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
});


$(document).ready(function () {
    var owl = $(".owl-carousel").owlCarousel({
        items: 1, 
        loop: true,
        dots: false, 
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        margin: 10, 
        responsive: {
            728: {
                items: 2, 
                margin: 18 
            },
            1024: {
                items: 3, 
                margin: 10 
            }
        }
    });

    // Custom dots click event to trigger the carousel change
    $('.custom-dot').click(function () {
        var index = $(this).data('index'); // Get me the index of the clicked dot
        owl.trigger('to.owl.carousel', [index, 300]); // I want you to move to the corresponding dots
    });

    // Sync custom dots with the carousel's current state
    owl.on('changed.owl.carousel', function (event) {
        var currentIndex = event.item.index - event.relatedTarget._clones.length / 2; 
        currentIndex = currentIndex % event.item.count; 
        $('.custom-dot').removeClass('active'); 
        $('.custom-dot').eq(currentIndex).addClass('active');
    });
});




/////TESTIMONIAL


document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    let interval;

    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active', 'hidden');
            if (i === index) {
                testimonial.classList.add('active');
            } else if (i < index) {
                testimonial.classList.add('hidden');
            }
        });
    };

    const startRotation = () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 8000);
    };

    const stopRotation = () => clearInterval(interval);

    const swipeHandler = (e) => {
        if (e.deltaX > 0) {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;  // Swipe Right
        } else if (e.deltaX < 0) {
            currentIndex = (currentIndex + 1) % testimonials.length;  // Swipe Left
        }
        showTestimonial(currentIndex);
    };

    document.querySelector('.testimonial-container').addEventListener('mouseenter', stopRotation);
    document.querySelector('.testimonial-container').addEventListener('mouseleave', startRotation);

    showTestimonial(currentIndex);
    startRotation();

    // Enable swipe functionality
    let touchstartX = 0;
    let touchendX = 0;

    const handleTouchStart = (e) => {
        touchstartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        touchendX = e.changedTouches[0].screenX;
        if (touchstartX > touchendX) {
            swipeHandler({ deltaX: -1 }); // swipe left
        } else if (touchstartX < touchendX) {
            swipeHandler({ deltaX: 1 }); // swipe right
        }
    };

    document.querySelector('.testimonial-container').addEventListener('touchstart', handleTouchStart);
    document.querySelector('.testimonial-container').addEventListener('touchend', handleTouchEnd);
});

