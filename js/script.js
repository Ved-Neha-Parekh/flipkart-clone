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
