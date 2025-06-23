// === Default to Dark Mode on First Visit ===
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
}
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const ytFrame = document.getElementById('ytFrame');
  const loader = document.getElementById('videoLoader');
  const lightbox = document.getElementById('lightbox');

  // === Apply stored theme preference ===
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  } else {
    document.body.classList.remove('dark');
    toggle.checked = false;
  }

  updateThemeIcon();

  // === Dark Mode Toggle Event ===
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    updateThemeIcon();
  });

  // === Update Sun/Moon Icon with Animation ===
  function updateThemeIcon() {
    if (document.body.classList.contains('dark')) {
      themeIcon.classList.remove('ti-sun');
      themeIcon.classList.add('ti-moon');
    } else {
      themeIcon.classList.remove('ti-moon');
      themeIcon.classList.add('ti-sun');
    }
    // Animate
    themeIcon.style.transform = 'translate(-50%, -50%) scale(1.4)';
    themeIcon.style.opacity = '0.7';
    setTimeout(() => {
      themeIcon.style.transform = 'translate(-50%, -50%) scale(1)';
      themeIcon.style.opacity = '1';
    }, 150);
  }

  // === Hide Toggle Button on Scroll Down ===
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

  // === YouTube Thumbnails and Click Events ===
  document.querySelectorAll('.video-card').forEach(card => {
    const videoId = card.dataset.videoId;
    const thumbnail = card.querySelector('img');
    thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const open = () => openLightbox(videoId);
    card.addEventListener('click', open);
    thumbnail.addEventListener('click', open);
  });

  // === Open Video Lightbox ===
  function openLightbox(videoId) {
    loader.style.display = 'block';
    ytFrame.style.display = 'none';

    ytFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    ytFrame.onload = () => {
      loader.style.display = 'none';
      ytFrame.style.display = 'block';
    };
  }

  // === Close Lightbox (Global for HTML Button) ===
  window.closeLightbox = function () {
    ytFrame.src = '';
    lightbox.style.display = 'none';
    loader.style.display = 'none';
    ytFrame.style.display = 'none';
    document.body.style.overflow = '';
  };
});
