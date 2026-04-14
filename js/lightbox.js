document.addEventListener('DOMContentLoaded', () => {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';

  const container = document.createElement('div');
  container.className = 'lightbox-container';

  const img = document.createElement('img');
  img.id = 'lightbox-img';

  const metadata = document.createElement('div');
  metadata.id = 'lightbox-metadata';

  container.appendChild(img);
  container.appendChild(metadata);
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
      metadata.innerHTML = '';
      overlay.classList.add('active');

      if (typeof EXIF !== 'undefined') {
        EXIF.getData(image, function() {
          const model = EXIF.getTag(this, "Model");
          const exposure = EXIF.getTag(this, "ExposureTime");
          const fNum = EXIF.getTag(this, "FNumber");
          const focal = EXIF.getTag(this, "FocalLength");

          if (model || exposure || fNum || focal) {
            let text = [];
            if (model) text.push(model);
            if (focal) text.push(focal + "mm");
            if (fNum) text.push("f/" + fNum);
            if (exposure) {
              if (exposure < 1) {
                text.push("1/" + Math.round(1/exposure) + "s");
              } else {
                text.push(exposure + "s");
              }
            }
            metadata.innerHTML = text.join(" &bull; ");
          }
        });
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
});
