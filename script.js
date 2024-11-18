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