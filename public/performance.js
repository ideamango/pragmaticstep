/**
 * Performance optimization utilities
 * - Lazy load background images using Intersection Observer
 * - Optimizes page load by deferring below-the-fold images
 */

document.addEventListener('DOMContentLoaded', function() {
  // Lazy load background images
  const lazyBackgrounds = document.querySelectorAll('[data-bg-src]');
  
  if ('IntersectionObserver' in window) {
    const bgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const bgSrc = element.getAttribute('data-bg-src');
          
          // Preload the image
          const img = new Image();
          img.onload = () => {
            element.style.backgroundImage = `url('${bgSrc}')`;
            element.classList.add('bg-loaded');
          };
          img.src = bgSrc;
          
          observer.unobserve(element);
        }
      });
    }, {
      rootMargin: '50px' // Start loading 50px before element comes into view
    });
    
    lazyBackgrounds.forEach(element => {
      bgObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver (load images immediately)
    lazyBackgrounds.forEach(element => {
      const bgSrc = element.getAttribute('data-bg-src');
      element.style.backgroundImage = `url('${bgSrc}')`;
    });
  }
  
  // Detect image loading for debugging (remove in production)
  window.debugImageLoading = function() {
    document.querySelectorAll('[data-bg-src]').forEach(el => {
      console.log('Background Image:', el.className, el.getAttribute('data-bg-src'));
    });
  };
});
