/* ATHLETIX — redesign scripts */

// Footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mainNav.classList.toggle('open');
});

// Close mobile nav on link click
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mainNav.classList.remove('open');
  });
});

// Side panel
const sideToggle   = document.getElementById('sideToggle');
const sideClose    = document.getElementById('sideClose');
const sidePanel    = document.getElementById('sidePanel');
const sideBackdrop = document.getElementById('sideBackdrop');

function openSide() {
  sidePanel.classList.add('open');
  sideBackdrop.classList.add('open');
  sidePanel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeSide() {
  sidePanel.classList.remove('open');
  sideBackdrop.classList.remove('open');
  sidePanel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

sideToggle.addEventListener('click', openSide);
sideClose.addEventListener('click', closeSide);
sideBackdrop.addEventListener('click', closeSide);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSide();
});

// Header shadow on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 6px 20px rgba(0,0,0,.6)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Duplicate partner row for seamless infinite marquee
const partnerRow = document.querySelector('.partner-row');
if (partnerRow) {
  partnerRow.innerHTML += partnerRow.innerHTML;
}

// Hero word rotator
(function rotator() {
  const words = document.querySelectorAll('.rotator-inline .r-word');
  if (!words.length) return;
  let i = 0;
  setInterval(() => {
    const current = words[i];
    const next = words[(i + 1) % words.length];
    current.classList.remove('active');
    current.classList.add('leaving');
    next.classList.add('active');
    setTimeout(() => current.classList.remove('leaving'), 700);
    i = (i + 1) % words.length;
  }, 2400);
})();

// Hero image 3D tilt on mouse move
(function heroTilt() {
  const media = document.getElementById('heroMedia');
  if (!media) return;
  const maxTilt = 8;
  let raf;

  media.addEventListener('mousemove', (e) => {
    const rect = media.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      media.classList.add('tilt');
      media.style.transform = `perspective(1200px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(1.02)`;
    });
  });

  media.addEventListener('mouseleave', () => {
    media.classList.remove('tilt');
    media.style.transform = '';
  });
})();

// Animated counters
(function counters() {
  const counters = document.querySelectorAll('.hero-meta [data-count]');
  if (!counters.length) return;
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();

// Testimonials Slider
(function initSlider() {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.getElementById('testimonialDots');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = track.children;
    const totalCards = cards.length;
    let autoSlideInterval = null;
    let isVideoPlaying = false;

    function getCardsToShow() {
      if (window.innerWidth <= 720) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, totalCards - getCardsToShow());
    }

    function renderDots() {
      if (!dotsContainer) return;

      const dotCount = getMaxIndex() + 1;
      if (dotsContainer.children.length === dotCount) return;

      dotsContainer.innerHTML = '';
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Go to testimonial set ${i + 1}`);
        dot.dataset.index = String(i);
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateSlider();
          startAutoSlide();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateActiveDot() {
      if (!dotsContainer) return;
      Array.from(dotsContainer.children).forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function updateSlider() {
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }

      const cardWidth = cards[0].offsetWidth;
      // Gap is 30px in CSS
      const moveAmount = currentIndex * (cardWidth + 30); 
      
      track.style.transform = `translateX(-${moveAmount}px)`;
      renderDots();
      updateActiveDot();
    }

    function startAutoSlide() {
      stopAutoSlide();
      if (isVideoPlaying) return; // Don't auto-slide if watching video
      autoSlideInterval = setInterval(() => {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateSlider();
      }, 4000);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = getMaxIndex(); // loop to end
      }
      updateSlider();
      startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < getMaxIndex()) {
        currentIndex++;
      } else {
        currentIndex = 0; // loop to start
      }
      updateSlider();
      startAutoSlide();
    });

    window.addEventListener('resize', () => {
      requestAnimationFrame(updateSlider);
    });

    // Handle Custom Video Playing
    Array.from(cards).forEach(card => {
      const vid = card.querySelector('video');
      if(vid) {
        // Pausing other videos when one plays
        vid.addEventListener('play', () => {
          isVideoPlaying = true;
          stopAutoSlide(); // Stop sliding while playing
          Array.from(cards).forEach(c => {
            const otherVid = c.querySelector('video');
            if(otherVid && otherVid !== vid) {
              otherVid.pause();
              c.classList.remove('is-playing');
              otherVid.removeAttribute('controls');
            }
          });
          card.classList.add('is-playing');
          vid.setAttribute('controls', 'true');
        });

        vid.addEventListener('pause', () => {
          // Check if all videos are paused to resume sliding
          const anyPlaying = Array.from(cards).some(c => {
            const v = c.querySelector('video');
            return v && !v.paused && !v.ended;
          });
          if (!anyPlaying) {
            isVideoPlaying = false;
            startAutoSlide();
          }
        });

        // Click on the card overlay plays the video
        card.addEventListener('click', (e) => {
          if (!card.classList.contains('is-playing')) {
            vid.play();
          }
        });
      }
    });

    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', () => {
      if (!isVideoPlaying) startAutoSlide();
    });

    // Run Once on load
    updateSlider();
    startAutoSlide();
    // Sometimes fonts load later pushing width, update again shortly
    setTimeout(updateSlider, 200); 
  }
})();

// Reveal on scroll
const revealTargets = document.querySelectorAll(
  '.section-head, .class-card, .program, .plan-card, .elite-coach-card, .manifesto-copy, .manifesto-image, .tt-item, .contact-copy, .contact-form, .trial-inner'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));
