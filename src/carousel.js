document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
  
    // DOM elements for buttons
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    // Function to show the current slide based on index
    function showSlide(index) {
      const carouselInner = document.getElementById('carousel-slides');
      // Set the transform property to slide to the corresponding image
      carouselInner.style.transform = `translateX(-${index * 100}%)`;
    }
  
    // Show next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;  // Loop back to the first slide
      showSlide(currentIndex);
    }
  
    // Show previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;  // Loop back to the last slide
      showSlide(currentIndex);
    }
  
    // Auto-slide function
    function autoSlide() {
      setInterval(() => {
        nextSlide();
      }, 5000); // Slide every 3 seconds
    }
  
    // Event listeners for buttons
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
  
    // Initialize auto-slide
    autoSlide();
  });
  