document.addEventListener("DOMContentLoaded", () => {
  const SLIDES = [
    { src: "./imgs/banner-1.webp", alt: "Big saving Festivals" },
    { src: "./imgs/banner-2.webp", alt: "Mobiles sale" },
    { src: "./imgs/banner-3.webp", alt: "Electronics bonanza" },
    { src: "./imgs/banner-4.webp", alt: "Appliances sale" },
    { src: "./imgs/banner-5.webp", alt: "Home & kitchen deals" },
    { src: "./imgs/banner-6.webp", alt: "Top offers" },
    { src: "./imgs/banner-7.webp", alt: "Grocery deals" },
  ];

  const heroSlider = document.getElementById("heroSlider");
  if (!heroSlider || !SLIDES.length) return;

  heroSlider.innerHTML = `
    <div class="slides">
      ${SLIDES.map(
        (s, i) => `
        <img class="slide ${i === 0 ? "active" : ""}" src="${s.src}" alt="${
          s.alt
        }" ${i > 0 ? 'loading="lazy"' : ""}>  
      `
      ).join("")}
    </div>
    <button class="ctrl prev" type="button" aria-label="Previous"><i class="bi bi-chevron-left"></i></button>
    <button class="ctrl next" type="button" aria-label="Next"><i class="bi bi-chevron-right"></i></button>
    <div class="dots">
      ${SLIDES.map(
        (_, i) =>
          `<button class="dot ${
            i === 0 ? "active" : ""
          }" type="button" aria-label="Slide ${i + 1}"></button>`
      ).join("")}
    </div>
  `;

  const slides = Array.from(heroSlider.querySelectorAll(".slide"));
  const dots = Array.from(heroSlider.querySelectorAll(".dot"));
  const prev = heroSlider.querySelector(".prev");
  const next = heroSlider.querySelector(".next");

  let i = 0,
    t = null;
  const INTERVAL = 3200;
  const AUTOPLAY = true;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((img, idx) => {
      img.classList.toggle("active", idx === i);
    });
    dots.forEach((d, idx) => {
      d.classList.toggle("active", idx === i);
    });
  }

  function play() {
    if (!AUTOPLAY) return;
    stop();
    t = setInterval(() => show(i + 1), INTERVAL);
  }

  function stop() {
    if (t) {
      clearInterval(t);
      t = null;
    }
  }

  prev?.addEventListener("click", () => {
    show(i - 1);
    play();
  });

  next?.addEventListener("click", () => {
    show(i + 1);
    play();
  });

  dots.forEach((d, idx) => {
    d.addEventListener("click", () => {
      show(idx);
      play();
    });
  });

  heroSlider.addEventListener("mouseenter", stop);
  heroSlider.addEventListener("mouseleave", play);

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : play();
  });

  play();
});

// Paginated rail: one function you can reuse for other sections too
function setupPaginatedRail(viewportEl) {
  const viewport =
    typeof viewportEl === "string"
      ? document.querySelector(viewportEl)
      : viewportEl;
  if (!viewport) return;
  const track = viewport.querySelector(".rail-track");
  const prev = viewport.querySelector(".rail-btn.prev");
  const next = viewport.querySelector(".rail-btn.next");
  const fadeL = viewport.querySelector(".rail-fade.left");
  const fadeR = viewport.querySelector(".rail-fade.right");
  if (!track) return;

  let page = 0,
    maxPage = 0;

  function measure() {
    // How many “pages” fit based on content width
    const cw = track.clientWidth;
    const sw = track.scrollWidth;
    maxPage = Math.max(0, Math.ceil(sw / cw) - 1);
    if (page > maxPage) page = maxPage;
    updateUI();
  }

  function goTo(p) {
    page = Math.max(0, Math.min(maxPage, p));
    const x = Math.min(
      track.scrollWidth - track.clientWidth,
      Math.round(page * track.clientWidth)
    );
    track.scrollTo({ left: x, behavior: "smooth" });
    updateUI();
  }

  function updateUI() {
    const atStart = page === 0;
    const atEnd =
      page === maxPage ||
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;

    prev.classList.toggle("d-none", atStart);
    next.classList.toggle("d-none", atEnd);

    fadeL && fadeL.classList.toggle("d-none", atStart);
    fadeR && fadeR.classList.toggle("d-none", atEnd);
  }

  prev && prev.addEventListener("click", () => goTo(page - 1));
  next && next.addEventListener("click", () => goTo(page + 1));

  // Keep buttons in sync if user scrolls via track (e.g., touchpad)
  track.addEventListener("scroll", () => {
    // Snap current page approx
    const p = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    if (p !== page) page = p;
    requestAnimationFrame(updateUI);
  });

  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  measure();
}

// Init for Best of Electronics
document.addEventListener("DOMContentLoaded", () => {
  setupPaginatedRail("#boeViewport");
});
