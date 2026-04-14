document.addEventListener('DOMContentLoaded', () => {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';

  const container = document.createElement('div');
  container.className = 'lightbox-container';

  const img = document.createElement('img');
  img.id = 'lightbox-img';

  container.appendChild(img);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  const closeLightbox = () => {
    overlay.classList.remove('active');
  };

  // Close when clicking overlay
  overlay.addEventListener('click', (e) => {
    if (e.target !== img) {
      closeLightbox();
    }
  });

  // Attach click to all images inside posts
  const images = document.querySelectorAll('#post img');
  images.forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', () => {
      img.src = image.src;
      overlay.classList.add('active');
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
});
