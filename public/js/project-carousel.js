/**
 * Project Carousel Navigation
 * Handles navigation for project carousel: [◀] [1] [2] [3] [▶]
 */
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById("proj-track");
  const indicatorsContainer = document.getElementById("proj-indicators");

  if (track && indicatorsContainer) {
    let currentProjectIndex = 0;
    const cards = track.querySelectorAll(".project-card");
    const totalCards = cards.length;

    // Calculate how many cards to show at once based on screen size
    function getCardsToShow() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    // Generate navigation: [◀] [1] [2] [3] [▶]
    function generateIndicators() {
      if (totalCards > 0) {
        const cardsToShow = getCardsToShow();
        let totalIndicators;
        if (totalCards <= cardsToShow) {
          // If all cards fit in view, only need 1 indicator
          totalIndicators = 1;
        } else {
          // Number of positions = totalCards - cardsToShow + 1
          totalIndicators = totalCards - cardsToShow + 1;
        }
        
        indicatorsContainer.innerHTML = '';
        
        // Add previous arrow
        const prevArrow = document.createElement('button');
        prevArrow.className = 'proj-arrow prev';
        prevArrow.id = 'proj-prev';
        prevArrow.setAttribute('aria-label', 'Previous project');
        prevArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        
        prevArrow.addEventListener('click', () => {
          currentProjectIndex = Math.max(0, currentProjectIndex - 1);
          updateCarousel();
        });
        
        indicatorsContainer.appendChild(prevArrow);
        
        // Add indicator buttons
        for (let i = 0; i < totalIndicators; i++) {
          const indicator = document.createElement('button');
          indicator.className = 'proj-indicator';
          indicator.setAttribute('data-index', i);
          indicator.setAttribute('aria-label', `Go to project position ${i + 1}`);
          indicator.textContent = i + 1; // Show actual numbers
          
          if (i === currentProjectIndex) {
            indicator.classList.add('active');
          }
          
          indicator.addEventListener('click', () => {
            currentProjectIndex = i;
            updateCarousel();
          });
          
          indicatorsContainer.appendChild(indicator);
        }
        
        // Add next arrow
        const nextArrow = document.createElement('button');
        nextArrow.className = 'proj-arrow next';
        nextArrow.id = 'proj-next';
        nextArrow.setAttribute('aria-label', 'Next project');
        nextArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

        nextArrow.addEventListener('click', () => {
          const cardsToShow = getCardsToShow();
          let maxIndex;
          if (totalCards <= cardsToShow) {
            maxIndex = 0;
          } else {
            maxIndex = totalCards - cardsToShow;
          }
          currentProjectIndex = Math.min(maxIndex, currentProjectIndex + 1);
          updateCarousel();
        });

        indicatorsContainer.appendChild(nextArrow);
      } else {
        // If no cards, clear indicators
        indicatorsContainer.innerHTML = '';
      }
    }

    function updateCarousel() {
      const cardsToShow = getCardsToShow();
      let maxIndex;
      if (totalCards <= cardsToShow) {
        // If all cards fit in view, only one position (index 0)
        maxIndex = 0;
      } else {
        // Otherwise, max index is totalCards - cardsToShow
        maxIndex = totalCards - cardsToShow;
      }

      // Clamp index
      currentProjectIndex = Math.min(
        Math.max(0, currentProjectIndex),
        maxIndex,
      );

      // Calculate offset
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 24; // matches CSS gap
      const offset = currentProjectIndex * (cardWidth + gap);

      track.style.transform = `translateX(-${offset}px)`;

      // Update button states by finding them in the DOM
      const prevBtn = document.getElementById("proj-prev");
      const nextBtn = document.getElementById("proj-next");
      if (prevBtn) prevBtn.disabled = currentProjectIndex === 0;
      if (nextBtn) nextBtn.disabled = currentProjectIndex >= maxIndex;
      
      // Update indicators
      updateIndicators();
    }

    function updateIndicators() {
      const indicators = indicatorsContainer?.querySelectorAll('.proj-indicator:not(.next)');
      if (indicators) {
        indicators.forEach((indicator, index) => {
          if (index === currentProjectIndex) {
            indicator.classList.add('active');
          } else {
            indicator.classList.remove('active');
          }
        });
      }
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        currentProjectIndex = Math.max(0, currentProjectIndex - 1);
        updateCarousel();
      } else if (e.key === 'ArrowRight') {
        const cardsToShow = getCardsToShow();
        let maxIndex;
        if (totalCards <= cardsToShow) {
          maxIndex = 0;
        } else {
          maxIndex = totalCards - cardsToShow;
        }
        currentProjectIndex = Math.min(maxIndex, currentProjectIndex + 1);
        updateCarousel();
      }
    });

    // Update on resize
    window.addEventListener("resize", () => {
      updateCarousel();
      generateIndicators(); // Regenerate indicators on resize
    });

    // Initial update
    generateIndicators();
    updateCarousel();
  }
});