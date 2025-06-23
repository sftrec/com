document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const ytFrame = document.getElementById('ytFrame');
  const lightbox = document.getElementById('lightbox');
  const loader = document.getElementById('videoLoader');

  // ==== Apply saved theme ====
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  }
  updateThemeIcon();

  // ==== Dark Mode Toggle ====
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  });

  // ==== Update Toggle Icon (Sun/Moon) ====
  function updateThemeIcon() {
    if (document.body.classList.contains('dark')) {
      themeIcon.classList.remove('ti-sun');
      themeIcon.classList.add('ti-moon');
    } else {
      themeIcon.classList.remove('ti-moon');
      themeIcon.classList.add('ti-sun');
    }

    // Animate the icon
    themeIcon.style.transform = 'translate(-50%, -50%) scale(1.4)';
    themeIcon.style.opacity = '0.7';
    setTimeout(() => {
      themeIcon.style.transform = 'translate(-50%, -50%) scale(1)';
      themeIcon.style.opacity = '1';
    }, 200);
  }

  // ==== Scroll-to-hide toggle ====
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const toggleWrapper = document.querySelector('.toggle-wrapper');
    if (window.scrollY > lastScroll) {
      toggleWrapper.classList.add('hide-toggle');
    } else {
      toggleWrapper.classList.remove('hide-toggle');
    }
    lastScroll = window.scrollY;
  });

  // ==== Setup Video Cards with YouTube Thumbnails ====
  document.querySelectorAll('.video-card').forEach(card => {
    const videoId = card.dataset.videoId;
    const thumbnail = card.querySelector('img');
    thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // Open lightbox on click
    card.addEventListener('click', () => openLightbox(videoId));
    thumbnail.addEventListener('click', () => openLightbox(videoId));
  });

  // ==== Open Lightbox ====
  function openLightbox(videoId) {
    loader.style.display = 'block';
    ytFrame.style.display = 'none';

    ytFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&fs=1&modestbranding=1&rel=0`;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    ytFrame.onload = () => {
      loader.style.display = 'none';
      ytFrame.style.display = 'block';
    };
  }

  // ==== Close Lightbox (global for onclick="closeLightbox()") ====
  window.closeLightbox = function () {
    ytFrame.src = '';
    lightbox.style.display = 'none';
    loader.style.display = 'none';
    ytFrame.style.display = 'none';
    document.body.style.overflow = '';
  };
});
