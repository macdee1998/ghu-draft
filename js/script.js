const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  menuToggle.classList.toggle("open");
});

const faders = document.querySelectorAll(".fade-up");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

const counters = document.querySelectorAll('.stat-number');
const speed = 200; 

const runCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

let statsSection = document.querySelector('#stats');
let statsPlayed = false;

window.addEventListener('scroll', () => {
  const sectionPos = statsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (sectionPos < screenPos && !statsPlayed) {
    runCounters();
    statsPlayed = true;
  }
});
