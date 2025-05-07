
import { useEffect } from 'react';

export function useAnimateOnScroll() {
  useEffect(() => {
    // Observer callback function
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        // Add the 'visible' class when the element is in view
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    };

    // Create the IntersectionObserver
    const observer = new IntersectionObserver(observerCallback, {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Find all elements with the 'animated' class and observe them
    const animatedElements = document.querySelectorAll('.animated');
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []);
}

export default useAnimateOnScroll;
