const btn = document.getElementById("btn");
const leftCurtain = document.getElementById("leftCurtain");
const rightCurtain = document.getElementById("rightCurtain");
const music = document.getElementById("music");

btn.addEventListener("click", () => {
  leftCurtain.style.transform = "translateX(-100%)";
  rightCurtain.style.transform = "translateX(100%)";
  btn.style.display = "none";
  music.play();
  const isMobile = window.innerWidth < 768;

  /* SKY */

  const sky = document.getElementById("sky");
  const ctx = sky.getContext("2d");
  const DPR = window.devicePixelRatio || 1;

  function resizeSky() {
    sky.width = window.innerWidth * DPR;
    sky.height = window.innerHeight * DPR;

    sky.style.width = window.innerWidth + "px";
    sky.style.height = window.innerHeight + "px";

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  resizeSky();
  window.addEventListener("resize", resizeSky);

  /* STARS */

  const stars = [];
  const STAR_COUNT = isMobile ? 150 : 400;

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.2,
      alpha: Math.random(),
    });
  }

  function drawSky() {
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, sky.width, sky.height);

    stars.forEach((s) => {
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  /* BUTTERFLY */

  const scene = document.getElementById("scene");
  const COUNT = isMobile ? 35 : 70;
  const butterflies = [];

  function createButterfly() {
    const b = document.createElement("div");
    b.className = "butterfly";

    b.innerHTML = `
<div class="wing left"></div>
<div class="wing right"></div>
<div class="body"></div>
`;

    scene.appendChild(b);

    return {
      el: b,
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 2000,
      tx: 0,
      ty: 0,
    };
  }

  for (let i = 0; i < COUNT; i++) butterflies.push(createButterfly());

  function heart(t) {
    return {
      x: 16 * Math.pow(Math.sin(t), 3),
      y: -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      ),
    };
  }

  function spawnHeart() {
    let h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "❤";

    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "-20px";
    h.style.animationDuration = 4 + Math.random() * 3 + "s";

    document.body.appendChild(h);

    setTimeout(() => h.remove(), 7000);
  }

  /* ANIMATION */

  let start = null;

  function animate(t) {
    drawSky();

    if (!start) start = t;

    let time = (t - start) / 1000;

    if (time < 4) {
      butterflies.forEach((b) => {
        b.z -= 15;

        let scale = 600 / (600 + b.z);

        let x = window.innerWidth / 2 + b.x * scale;
        let y = window.innerHeight / 2 + b.y * scale;

        b.el.style.transform = `translate(${x}px,${y}px) scale(${scale})`;
      });
    } else if (time < 7) {
      butterflies.forEach((b, i) => {
        let tt = (i / COUNT) * Math.PI * 2;
        let pos = heart(tt);

        let s = Math.min(window.innerWidth, window.innerHeight) / 35;

        b.tx = window.innerWidth / 2 + pos.x * s;
        b.ty = window.innerHeight / 2 + pos.y * s;

        b.x += (b.tx - b.x) * 0.05;
        b.y += (b.ty - b.y) * 0.05;

        b.el.style.transform = `translate(${b.x}px,${b.y}px)`;
      });
    } else if (time < 10) {
      document.getElementById("cake").classList.add("show");

      butterflies.forEach((b) => {
        b.el.style.opacity = 0;
      });
    } else if (time < 11) {
      document.getElementById("envelope").classList.add("show");
    } else if (time < 12) {
      document.getElementById("envelope").classList.add("open");
    } else {
      document.getElementById("card").classList.add("show");

      if (Math.random() < 0.3) spawnHeart();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // =====================

  const openGallery = document.getElementById("openGallery");
  const gallery3d = document.getElementById("gallery3d");
  const photos = document.querySelectorAll(".photo");

  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewerImg");

  openGallery.onclick = () => {
    gallery3d.style.display = "flex";
  };

  photos.forEach((p) => {
    p.onclick = () => {
      viewer.style.display = "flex";
      viewerImg.src = p.src;
    };
  });

  viewer.onclick = () => {
    viewer.style.display = "none";
  };
});
